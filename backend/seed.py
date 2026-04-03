import json
import os
import requests
import sys

API_URL = "https://portfolio-backend-942746783217.us-east4.run.app/api"

def seed_projects():
    try:
        with open("seed_data/projects_seed.json", "r") as f:
            projects = json.load(f)

        headers = {"X-API-Key": os.environ.get("ADMIN_API_KEY", "dev_api_key")}
        for p in projects:
            res = requests.post(f"{API_URL}/projects", json=p, headers=headers)
            if res.status_code == 200:
                print(f"Added project: {p.get('title')}")
            elif res.status_code in [400, 500] and "already registered" in res.text or res.status_code == 500:
                # If it exists, or internal server error might be due to existing record without nice error handling, let's delete and recreate
                print(f"Project exists, updating: {p.get('title')}")
                # We need to use a DELETE request to delete the old one first
                del_res = requests.delete(f"{API_URL}/projects/{p.get('id')}", headers=headers)
                if del_res.status_code == 200:
                    res2 = requests.post(f"{API_URL}/projects", json=p, headers=headers)
                    if res2.status_code == 200:
                        print(f"Updated project: {p.get('title')}")
                    else:
                        print(f"Failed to update project {p.get('title')}: {res2.text}")
                else:
                    print(f"Failed to delete existing project {p.get('title')}: {del_res.text}")
            else:
                print(f"Failed to add project {p.get('title')}: {res.text}")
    except Exception as e:
        print(f"Error seeding projects: {e}")

def seed_research():
    try:
        with open("seed_data/research_seed.json", "r") as f:
            research = json.load(f)

        headers = {"X-API-Key": os.environ.get("ADMIN_API_KEY", "dev_api_key")}
        for r in research:
            res = requests.post(f"{API_URL}/research", json=r, headers=headers)
            if res.status_code == 200:
                print(f"Added research: {r.get('title')}")
            elif res.status_code in [400, 500]:
                print(f"Research exists, updating: {r.get('title')}")
                del_res = requests.delete(f"{API_URL}/research/{r.get('id')}", headers=headers)
                if del_res.status_code == 200:
                    res2 = requests.post(f"{API_URL}/research", json=r, headers=headers)
                    if res2.status_code == 200:
                        print(f"Updated research: {r.get('title')}")
                    else:
                        print(f"Failed to update research {r.get('title')}: {res2.text}")
                else:
                    print(f"Failed to delete existing research {r.get('title')}: {del_res.text}")
            else:
                print(f"Failed to add research {r.get('title')}: {res.text}")
    except Exception as e:
        print(f"Error seeding research: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--help":
        print("Usage: python seed.py")
        print("Make sure the FastAPI server is running locally on port 8080.")
    else:
        seed_projects()
        seed_research()
