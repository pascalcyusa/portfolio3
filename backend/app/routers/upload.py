from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from google.cloud import storage
from app.core.config import settings
from app.core.security import get_api_key
import uuid
import os

router = APIRouter()

# Instantiate a Google Cloud Storage client
# Uses Application Default Credentials (ADC) or the Cloud Run service account
storage_client = None
try:
    storage_client = storage.Client()
except Exception as e:
    print(f"Warning: Could not initialize Google Cloud Storage client: {e}")

@router.post("/upload", dependencies=[Depends(get_api_key)])
async def upload_file(file: UploadFile = File(...)):
    if not storage_client:
        raise HTTPException(status_code=500, detail="Google Cloud Storage client not configured")

    if not settings.GCS_BUCKET_NAME:
        raise HTTPException(status_code=500, detail="GCS_BUCKET_NAME not set in environment")

    bucket = storage_client.bucket(settings.GCS_BUCKET_NAME)

    # Create a unique filename
    ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{ext}"

    blob = bucket.blob(unique_filename)

    # Read the file contents
    contents = await file.read()

    # Upload the file
    blob.upload_from_string(contents, content_type=file.content_type)

    # Make the blob publicly viewable
    try:
        blob.make_public()
    except Exception as e:
        print(f"Warning: Could not make blob public, bucket might have uniform bucket-level access enabled: {e}")

    # Return the public URL
    return {"url": blob.public_url}
