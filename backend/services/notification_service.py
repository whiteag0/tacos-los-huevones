import resend
import asyncio
from config import get_settings
from models import Order
from typing import Optional

settings = get_settings()

# Initialize Resend for email
if settings.resend_api_key:
    resend.api_key = settings.resend_api_key


async def send_email(to: str, subject: str, html: str) -> bool:
    """Send an email using Resend (free tier: 100 emails/day)"""
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
    """Notify the business about a new paid order via email"""
    if not settings.business_email:
        return

    items_html = "".join([
        f"<li>{item.quantity}x {item.name} - ${item.price * item.quantity:.2f}</li>"
        for item in order.items
    ])

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">🌮 New Order Received!</h2>
        <p><strong>Order ID:</strong> {order.id[:8]}</p>
        <p><strong>Customer:</strong> {order.customer_name}</p>
        <p><strong>Phone:</strong> {order.customer_phone}</p>
        <p><strong>Email:</strong> {order.customer_email}</p>
        <h3>Items:</h3>
        <ul>{items_html}</ul>
        <hr>
        <p><strong>Subtotal:</strong> ${order.subtotal:.2f}</p>
        <p><strong>Tax:</strong> ${order.tax:.2f}</p>
        <p><strong>Total:</strong> ${order.total:.2f}</p>
        {f"<p><strong>Special Instructions:</strong> {order.special_instructions}</p>" if order.special_instructions else ""}
    </div>
    """
    await send_email(settings.business_email, f"🌮 New Order #{order.id[:8]} - ${order.total:.2f}", html)


async def send_order_confirmation(order: Order):
    """Send order confirmation to customer via email"""
    items_html = "".join([
        f"<li>{item.quantity}x {item.name} - ${item.price * item.quantity:.2f}</li>"
        for item in order.items
    ])

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #dc2626;">🌮 Order Confirmed!</h1>
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
        <p>We'll email you when it's ready for pickup!</p>

        <p style="color: #666; font-size: 14px;">
            Tacos Los Huevones<br>
            Parker, Colorado
        </p>
    </div>
    """
    await send_email(order.customer_email, f"Order Confirmed - #{order.id[:8]}", html)


async def send_order_ready(order: Order):
    """Notify customer that their order is ready via email"""
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #22c55e;">🌮 Your Order is Ready!</h1>
        <p>Hi {order.customer_name},</p>
        <p>Great news! Your order <strong>#{order.id[:8]}</strong> is ready for pickup.</p>
        <p style="font-size: 18px; margin: 20px 0; padding: 15px; background: #f0fdf4; border-radius: 8px; text-align: center;">
            Come and get it while it's hot!
        </p>
        <p>See you soon!</p>
        <p style="color: #666; font-size: 14px;">
            - Tacos Los Huevones Team
        </p>
    </div>
    """
    await send_email(order.customer_email, f"🌮 Your Order is Ready! - #{order.id[:8]}", html)


async def send_notifications_async(order: Order, notification_type: str = "new_order"):
    """
    Send notifications in background without blocking.
    This is called via asyncio.create_task() to not block the webhook response.
    """
    try:
        if notification_type == "new_order":
            await notify_new_order(order)
            await send_order_confirmation(order)
        elif notification_type == "order_ready":
            await send_order_ready(order)
    except Exception as e:
        # Log error but don't crash - notifications are best-effort
        print(f"Background notification error: {e}")
