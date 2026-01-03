from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # Supabase
    supabase_url: str = ""
    supabase_key: str = ""

    # Square
    square_access_token: str = ""
    square_location_id: str = ""
    square_application_id: str = ""
    square_environment: str = "sandbox"  # "sandbox" or "production"

    # Your platform fee (in cents)
    platform_fee_cents: int = 100  # $1.00

    # Twilio (for SMS)
    twilio_account_sid: str = ""
    twilio_auth_token: str = ""
    twilio_phone_number: str = ""

    # Resend (for email)
    resend_api_key: str = ""

    # Business notification
    business_phone: str = ""
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
