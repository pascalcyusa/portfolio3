from fastapi import APIRouter, File, UploadFile, HTTPException, Depends, Form
from google.cloud import storage
from app.core.config import settings
from app.core.security import get_api_key
import uuid
import os
import re

router = APIRouter()

# Instantiate a Google Cloud Storage client
# Uses Application Default Credentials (ADC) or the Cloud Run service account
storage_client = None
try:
    storage_client = storage.Client()
except Exception as e:
    print(f"Warning: Could not initialize Google Cloud Storage client: {e}")

@router.post("/upload", dependencies=[Depends(get_api_key)])
async def upload_file(
    file: UploadFile = File(...),
    folder_id: str = Form(None)
):
    if not storage_client:
        raise HTTPException(status_code=500, detail="Google Cloud Storage client not configured")

    if not settings.GCS_BUCKET_NAME:
        raise HTTPException(status_code=500, detail="GCS_BUCKET_NAME not set in environment")

    if file.content_type not in settings.allowed_upload_mime_types:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    bucket = storage_client.bucket(settings.GCS_BUCKET_NAME)

    # Create a unique filename
    ext = os.path.splitext(file.filename)[1]
    
    unique_filename = f"{uuid.uuid4()}{ext}"
    if folder_id:
        # Sanitize folder_id to alphanumeric and hyphens/underscores to prevent path traversal
        clean_folder = re.sub(r'[^a-zA-Z0-9_-]', '', folder_id)
        if clean_folder:
            unique_filename = f"{clean_folder}/{unique_filename}"

    # Read the file contents
    contents = await file.read()

    max_upload_bytes = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024
    if len(contents) > max_upload_bytes:
        raise HTTPException(status_code=400, detail=f"File too large (max {settings.MAX_UPLOAD_SIZE_MB}MB)")

    blob = bucket.blob(unique_filename)
    blob.cache_control = "public, max-age=31536000, immutable"

    # Upload the file
    blob.upload_from_string(contents, content_type=file.content_type)

    # Make the blob publicly viewable
    try:
        blob.make_public()
    except Exception as e:
        print(f"Warning: Could not make blob public, bucket might have uniform bucket-level access enabled: {e}")

    # Return the public URL
    return {"url": blob.public_url}
