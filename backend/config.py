from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # Database (Neon PostgreSQL)
    database_url: str = ""

    # Square
    square_access_token: str = ""
    square_location_id: str = ""
    square_application_id: str = ""
    square_environment: str = "sandbox"  # "sandbox" or "production"
    square_webhook_signature_key: str = ""  # For webhook verification

    # Your platform fee (in cents)
    platform_fee_cents: int = 100  # $1.00

    # Resend (for email) - Free tier: 100 emails/day
    resend_api_key: str = ""

    # Business notification email
    business_email: str = ""

    # Frontend URL
    frontend_url: str = "http://localhost:3000"

    # Admin
    admin_api_key: str = ""

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()
