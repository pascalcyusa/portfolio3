from pydantic import model_validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Portfolio API"
    ENVIRONMENT: str = "development"
    DATABASE_URL: str
    GCS_BUCKET_NAME: str
    ADMIN_API_KEY: str | None = None
    CLERK_SECRET_KEY: str | None = None
    CLERK_PUBLISHABLE_KEY: str | None = None
    BACKEND_CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000"
    MAX_UPLOAD_SIZE_MB: int = 10
    ALLOWED_UPLOAD_MIME_TYPES: str = "image/webp,image/jpeg,image/png,image/gif,image/avif,image/svg+xml"

    @model_validator(mode="after")
    def validate_production_requirements(self):
        if self.ENVIRONMENT.lower() == "production" and not self.CLERK_SECRET_KEY:
            raise ValueError("CLERK_SECRET_KEY is required when ENVIRONMENT=production")
        return self

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.BACKEND_CORS_ORIGINS.split(",") if origin.strip()]

    @property
    def allowed_upload_mime_types(self) -> set[str]:
        return {mime.strip() for mime in self.ALLOWED_UPLOAD_MIME_TYPES.split(",") if mime.strip()}

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
