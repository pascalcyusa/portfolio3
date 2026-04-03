from fastapi import Security, HTTPException, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.status import HTTP_403_FORBIDDEN, HTTP_401_UNAUTHORIZED
from app.core.config import settings
from clerk_backend_api import Clerk

security = HTTPBearer()

def get_api_key(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    Validates a Clerk JWT token sent in the Authorization header as a Bearer token.
    """
    if not settings.CLERK_SECRET_KEY:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail="Clerk Secret Key is not configured"
        )

    token = credentials.credentials
    try:
        # Initialize Clerk SDK
        clerk = Clerk(bearer_auth=settings.CLERK_SECRET_KEY)

        # Verify the token using the Clerk SDK.
        # This checks the signature using the JWKS for your instance.
        client = clerk.clients.verify(request={"token": token})
        if not client:
            raise HTTPException(
                status_code=HTTP_401_UNAUTHORIZED, detail="Invalid token"
            )
        return token
    except Exception as e:
        print(f"Auth error: {e}")
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED, detail="Could not validate credentials"
        )
