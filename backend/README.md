# Portfolio Backend

This is the FastAPI backend for the portfolio, handling database interactions (Neon PostgreSQL) and Google Cloud Storage.

## Local Development

1. Create a `.env` file in the `backend` directory:
   ```env
   DATABASE_URL=postgresql://user:password@hostname/dbname
   GCS_BUCKET_NAME=your-bucket-name
   # Optional: For GCS local authentication without a key file, run:
   # gcloud auth application-default login
   ```

2. Set up virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   uvicorn app.main:app --reload --port 8080
   ```

4. Seed the database with initial data (make sure the server is running on port 8080):
   ```bash
   python seed.py
   ```

## API Documentation

Swagger UI is available at `http://localhost:8080/api/docs`. You can use it to upload files, add new projects, and manage your data.
