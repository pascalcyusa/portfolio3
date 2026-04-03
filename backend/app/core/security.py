from fastapi import Security, HTTPException
from fastapi.security import APIKeyHeader
from starlette.status import HTTP_403_FORBIDDEN
import secrets
from app.core.config import settings

API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

def get_api_key(api_key_header: str = Security(api_key_header)):
    expected_api_key = settings.ADMIN_API_KEY
    if not expected_api_key:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail="Admin API key is not configured"
        )
    if api_key_header and secrets.compare_digest(api_key_header, expected_api_key):
        return api_key_header
    raise HTTPException(
        status_code=HTTP_403_FORBIDDEN, detail="Could not validate credentials"
    )
