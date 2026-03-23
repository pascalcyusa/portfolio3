import json
import os
import sys

# A script to modify the local seed files so that all image paths pointing to "/images/..."
# are updated to point to a GCS bucket public URL format.
# We'll update the JSON directly before seeding.

def migrate_media_urls(bucket_name):
    # e.g., bucket_name = "my-portfolio-images"
    # GCS public URL format: https://storage.googleapis.com/{bucket_name}/images/...
    gcs_base_url = f"https://storage.googleapis.com/{bucket_name}"

    for filename in ["seed_data/projects_seed.json", "seed_data/research_seed.json"]:
        filepath = os.path.join(os.path.dirname(__file__), filename)
        if not os.path.exists(filepath):
            print(f"File not found: {filepath}")
            continue

        with open(filepath, "r") as f:
            data = json.load(f)

        def update_url(url):
            if url and url.startswith("/images/"):
                # Make sure the image path matches the structure uploaded to GCS.
                # If you uploaded the whole 'images' folder, it will be under bucket/images/
                return gcs_base_url + url
            return url

        for item in data:
            if "image" in item:
                item["image"] = update_url(item["image"])

            if "images" in item and isinstance(item["images"], list):
                for img_obj in item["images"]:
                    if "url" in img_obj:
                        img_obj["url"] = update_url(img_obj["url"])

            if "videos" in item and isinstance(item["videos"], list):
                for vid_obj in item["videos"]:
                    if "url" in vid_obj:
                        # Only update if it's a local video path (not youtube)
                        vid_obj["url"] = update_url(vid_obj["url"])

        with open(filepath, "w") as f:
            json.dump(data, f, indent=2)

        print(f"Updated media URLs in {filename}")

if __name__ == "__main__":
    bucket_name = os.environ.get("GCS_BUCKET_NAME", "my-portfolio-images")
    if len(sys.argv) > 1:
        bucket_name = sys.argv[1]
    print(f"Using GCS bucket: {bucket_name}")
    migrate_media_urls(bucket_name)
