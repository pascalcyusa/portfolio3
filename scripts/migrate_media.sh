#!/bin/bash
# Helper script to quickly upload the public/images directory to your GCS bucket

if [ -z "$1" ]; then
    echo "Usage: ./scripts/migrate_media.sh YOUR_GCS_BUCKET_NAME"
    return 1
fi

BUCKET_NAME=$1

echo "Uploading images to gs://${BUCKET_NAME}..."
# Using gsutil to copy the 'images' folder to the root of the bucket
# So that the URL matches gs://${BUCKET_NAME}/images/...
gsutil -m cp -r public/images gs://${BUCKET_NAME}/

echo "Making bucket public..."
gsutil iam ch allUsers:objectViewer gs://${BUCKET_NAME}

echo "Updating local seed files with the new public GCS URLs..."
cd backend
python3 migrate_media.py ${BUCKET_NAME}
cd ..

echo "Done! You can now seed your database by running 'python backend/seed.py'."
