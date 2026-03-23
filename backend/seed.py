import json
import os
import requests
import sys

API_URL = "http://localhost:8080/api"

def seed_projects():
    try:
        with open("projects_seed.json", "r") as f:
            projects = json.load(f)

        headers = {"X-API-Key": os.environ.get("ADMIN_API_KEY", "dev_api_key")}
        for p in projects:
            res = requests.post(f"{API_URL}/projects", json=p, headers=headers)
            if res.status_code == 200:
                print(f"Added project: {p.get('title')}")
            else:
                print(f"Failed to add project {p.get('title')}: {res.text}")
    except Exception as e:
        print(f"Error seeding projects: {e}")

def seed_research():
    try:
        with open("research_seed.json", "r") as f:
            research = json.load(f)

        headers = {"X-API-Key": os.environ.get("ADMIN_API_KEY", "dev_api_key")}
        for r in research:
            res = requests.post(f"{API_URL}/research", json=r, headers=headers)
            if res.status_code == 200:
                print(f"Added research: {r.get('title')}")
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
