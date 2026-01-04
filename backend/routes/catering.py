from fastapi import APIRouter, HTTPException
from models.catering import CateringInquiry, CateringInquiryResponse
from config import settings
import resend
from datetime import datetime

router = APIRouter(prefix="/api/catering", tags=["catering"])


@router.post("/inquiry", response_model=CateringInquiryResponse)
async def submit_catering_inquiry(inquiry: CateringInquiry):
    """Submit a catering inquiry - sends email notification to business"""
    try:
        # Format the event type for display
        event_type_display = inquiry.eventType.replace("_", " ").title()

        # Format guest count
        guest_display = inquiry.guestCount

        # Format budget if provided
        budget_display = "Not specified"
        if inquiry.budget:
            budget_map = {
                "under-500": "Under $500",
                "500-1000": "$500 - $1,000",
                "1000-2500": "$1,000 - $2,500",
                "2500-5000": "$2,500 - $5,000",
                "5000+": "$5,000+",
            }
            budget_display = budget_map.get(inquiry.budget, inquiry.budget)

        # Format message
        message_content = inquiry.message if inquiry.message else "No additional message"

        # Build email HTML
        email_html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #dc2626, #ea580c); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">New Catering Inquiry</h1>
            </div>

            <div style="padding: 30px; background: #f9fafb;">
                <h2 style="color: #1f2937; margin-top: 0;">Contact Information</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 140px;">Name:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">{inquiry.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                            <a href="mailto:{inquiry.email}" style="color: #dc2626;">{inquiry.email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                            <a href="tel:{inquiry.phone}" style="color: #dc2626;">{inquiry.phone}</a>
                        </td>
                    </tr>
                </table>

                <h2 style="color: #1f2937; margin-top: 30px;">Event Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 140px;">Event Type:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">{event_type_display}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Event Date:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">{inquiry.eventDate}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Guest Count:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">{guest_display} guests</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Budget:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">{budget_display}</td>
                    </tr>
                </table>

                <h2 style="color: #1f2937; margin-top: 30px;">Additional Details</h2>
                <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                    <p style="margin: 0; white-space: pre-wrap;">{message_content}</p>
                </div>
            </div>

            <div style="background: #1f2937; color: white; padding: 20px; text-align: center;">
                <p style="margin: 0; font-size: 14px;">
                    Tacos Los Huevones - Parker, Colorado
                </p>
            </div>
        </div>
        """

        # Send email via Resend
        if settings.RESEND_API_KEY:
            resend.api_key = settings.RESEND_API_KEY

            resend.Emails.send({
                "from": "Tacos Los Huevones <noreply@tacosloshuevones.com>",
                "to": [settings.BUSINESS_EMAIL] if settings.BUSINESS_EMAIL else ["admin@tacosloshuevones.com"],
                "subject": f"New Catering Inquiry - {event_type_display} ({guest_display} guests)",
                "html": email_html,
                "reply_to": inquiry.email,
            })

        return CateringInquiryResponse(
            success=True,
            message="Your inquiry has been submitted successfully. We will contact you within 24 hours.",
        )

    except Exception as e:
        print(f"Error processing catering inquiry: {e}")
        # Still return success to user even if email fails
        # The inquiry was received, just notification may have failed
        return CateringInquiryResponse(
            success=True,
            message="Your inquiry has been received. We will contact you soon.",
        )
