from fastapi import Security, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.status import HTTP_403_FORBIDDEN, HTTP_401_UNAUTHORIZED
from app.core.config import settings
import jwt
import requests as http_requests
from functools import lru_cache

security = HTTPBearer()

# Cache the JWKS for performance (refreshed when the process restarts)
@lru_cache(maxsize=1)
def _get_jwks_client():
    """Build a PyJWKClient that fetches and caches Clerk's JWKS."""
    if not settings.CLERK_PUBLISHABLE_KEY:
        return None

    # Decode the Clerk frontend API domain from the publishable key
    import base64
    raw = settings.CLERK_PUBLISHABLE_KEY.split("_")[-1]
    # Add padding if needed
    raw += "=" * (-len(raw) % 4)
    clerk_domain = base64.b64decode(raw).decode().rstrip("$")

    jwks_url = f"https://{clerk_domain}/.well-known/jwks.json"
    return jwt.PyJWKClient(jwks_url)


def get_api_key(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    Validates a Clerk JWT token sent in the Authorization header as a Bearer token.
    Uses PyJWT with Clerk's JWKS endpoint for proper RS256 verification.
    """
    if not settings.CLERK_SECRET_KEY:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail="Clerk Secret Key is not configured"
        )

    token = credentials.credentials
    try:
        jwks_client = _get_jwks_client()
        if not jwks_client:
            raise HTTPException(
                status_code=HTTP_403_FORBIDDEN,
                detail="Clerk Publishable Key is not configured"
            )

        # Get the signing key from Clerk's JWKS
        signing_key = jwks_client.get_signing_key_from_jwt(token)

        # Decode and verify the JWT
        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            options={
                "require": ["exp", "sub"],
                "verify_exp": True,
            },
            leeway=10,  # 10 seconds of clock skew tolerance
        )

        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED, detail="Token has expired"
        )
    except jwt.InvalidTokenError as e:
        print(f"JWT validation error: {e}")
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED, detail="Could not validate credentials"
        )
    except Exception as e:
        print(f"Auth error: {e}")
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED, detail="Could not validate credentials"
        )
