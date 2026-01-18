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
    platform_fee_cents: int = 150  # $1.50

    # Email - Option 1: Resend (free tier: 100 emails/day)
    resend_api_key: str = ""

    # Email - Option 2: SMTP (Gmail or other provider)
    smtp_host: str = ""  # e.g., "smtp.gmail.com"
    smtp_port: int = 587
    smtp_user: str = ""  # e.g., your Gmail address
    smtp_password: str = ""  # App password (not regular password)
    smtp_from_email: str = ""  # Optional: "Tacos Los Huevones <orders@example.com>"

    # Business notification email
    business_email: str = ""

    # Frontend URL
    frontend_url: str = "http://localhost:3000"

    # Admin
    admin_api_key: str = ""

    class Config:
        env_file = ".env"
        extra = "ignore"  # Ignore extra environment variables


@lru_cache()
def get_settings():
    return Settings()
