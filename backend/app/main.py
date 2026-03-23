from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import api, upload
from app.database import engine, Base
from app.core.config import settings
import os

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url="/api/openapi.json",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS setup
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # Add Netlify URL later
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api.router, prefix="/api", tags=["api"])
app.include_router(upload.router, prefix="/api", tags=["upload"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Portfolio API"}
