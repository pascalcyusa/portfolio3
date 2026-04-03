# Portfolio Backend

This is the FastAPI backend for the portfolio, handling database interactions and API endpoints.

## Local Development

1. Create a `.env` file in the `backend` directory (or use the provided `.env.development`):
   ```env
   DATABASE_URL=sqlite:///./test.db
   GCS_BUCKET_NAME=portfolio3-images-bucket
   ADMIN_API_KEY=your-admin-key
   CLERK_SECRET_KEY=your-clerk-key
   ```

   For development, you can use the existing `.env.development`:
   ```bash
   ln -s .env.development .env
   ```

2. Set up virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   uvicorn main:app --reload --port 8080
   ```

4. Seed the database with initial data (make sure the server is running on port 8080):
   ```bash
   python seed.py
   ```

## API Documentation

Swagger UI is available at `http://localhost:8080/api/docs`. You can use it to upload files, add new projects, and manage your data.
