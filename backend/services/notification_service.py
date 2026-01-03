from twilio.rest import Client as TwilioClient
import resend
from config import get_settings
from models import Order
from typing import Optional

settings = get_settings()

# Initialize clients
twilio_client = None
if settings.twilio_account_sid and settings.twilio_auth_token:
    twilio_client = TwilioClient(settings.twilio_account_sid, settings.twilio_auth_token)

if settings.resend_api_key:
    resend.api_key = settings.resend_api_key


async def send_sms(to: str, message: str) -> bool:
    """Send an SMS message"""
    if not twilio_client:
        print("Twilio not configured, skipping SMS")
        return False

    try:
        twilio_client.messages.create(
            body=message,
            from_=settings.twilio_phone_number,
            to=to
        )
        return True
    except Exception as e:
        print(f"SMS error: {e}")
        return False


async def send_email(to: str, subject: str, html: str) -> bool:
    """Send an email"""
    if not settings.resend_api_key:
        print("Resend not configured, skipping email")
        return False

    try:
        resend.Emails.send({
            "from": "Tacos Los Huevones <orders@tacosloshuevones.com>",
            "to": to,
            "subject": subject,
            "html": html
        })
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False


async def notify_new_order(order: Order):
    """Notify the business about a new paid order"""
    items_text = "\n".join([f"- {item.quantity}x {item.name}" for item in order.items])

    # SMS to business
    sms_message = f"""🌮 NEW ORDER #{order.id[:8]}
{order.customer_name}
{items_text}
Total: ${order.total:.2f}
Phone: {order.customer_phone}"""

    if settings.business_phone:
        await send_sms(settings.business_phone, sms_message)

    # Email to business
    if settings.business_email:
        html = f"""
        <h2>🌮 New Order Received!</h2>
        <p><strong>Order ID:</strong> {order.id[:8]}</p>
        <p><strong>Customer:</strong> {order.customer_name}</p>
        <p><strong>Phone:</strong> {order.customer_phone}</p>
        <p><strong>Email:</strong> {order.customer_email}</p>
        <h3>Items:</h3>
        <ul>
            {"".join([f"<li>{item.quantity}x {item.name} - ${item.price * item.quantity:.2f}</li>" for item in order.items])}
        </ul>
        <p><strong>Subtotal:</strong> ${order.subtotal:.2f}</p>
        <p><strong>Tax:</strong> ${order.tax:.2f}</p>
        <p><strong>Total:</strong> ${order.total:.2f}</p>
        {f"<p><strong>Special Instructions:</strong> {order.special_instructions}</p>" if order.special_instructions else ""}
        """
        await send_email(settings.business_email, f"New Order #{order.id[:8]}", html)


async def send_order_confirmation(order: Order):
    """Send order confirmation to customer"""
    items_html = "".join([
        f"<li>{item.quantity}x {item.name} - ${item.price * item.quantity:.2f}</li>"
        for item in order.items
    ])

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #e53e3e;">🌮 Order Confirmed!</h1>
        <p>Thank you for your order, {order.customer_name}!</p>

        <div style="background: #f7f7f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Order #{order.id[:8]}</h3>
            <ul>{items_html}</ul>
            <hr>
            <p><strong>Subtotal:</strong> ${order.subtotal:.2f}</p>
            <p><strong>Tax:</strong> ${order.tax:.2f}</p>
            <p><strong>Total:</strong> ${order.total:.2f}</p>
        </div>

        <p>Your order will be ready in approximately <strong>15-20 minutes</strong>.</p>
        <p>We'll send you a text when it's ready for pickup!</p>

        <p style="color: #666; font-size: 14px;">
            Tacos Los Huevones<br>
            Parker, Colorado
        </p>
    </div>
    """

    await send_email(order.customer_email, f"Order Confirmed - #{order.id[:8]}", html)

    # SMS confirmation
    sms = f"Thanks for your order! Your Tacos Los Huevones order #{order.id[:8]} is confirmed. We'll text you when it's ready! Total: ${order.total:.2f}"
    await send_sms(order.customer_phone, sms)


async def send_order_ready(order: Order):
    """Notify customer that their order is ready"""
    await send_sms(
        order.customer_phone,
        f"🌮 Your Tacos Los Huevones order #{order.id[:8]} is READY for pickup! See you soon!"
    )

    await send_email(
        order.customer_email,
        f"Your Order is Ready! - #{order.id[:8]}",
        f"""
        <h1>🌮 Your Order is Ready!</h1>
        <p>Hi {order.customer_name},</p>
        <p>Great news! Your order #{order.id[:8]} is ready for pickup.</p>
        <p>See you soon!</p>
        <p>- Tacos Los Huevones Team</p>
        """
    )
