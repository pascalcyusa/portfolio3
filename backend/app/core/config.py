from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Portfolio API"
    DATABASE_URL: str
    GCS_BUCKET_NAME: str

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
