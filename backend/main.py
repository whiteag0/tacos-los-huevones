from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from contextlib import asynccontextmanager

from config import get_settings
from routes import menu, orders, payments, admin, notifications, catering
from routes import settings as settings_router
from services.database_service import get_pool, close_pool, health_check

app_settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup - verify database connection
    print("Starting Tacos Los Huevones API...")
    try:
        await get_pool()
        is_healthy = await health_check()
        if is_healthy:
            print("Database connection verified")
        else:
            print("Warning: Database health check failed")
    except Exception as e:
        print(f"Warning: Database connection check failed: {e}")
    yield
    # Shutdown
    print("Shutting down...")
    await close_pool()


app = FastAPI(
    title="Tacos Los Huevones API",
    description="Food truck ordering system",
    version="1.0.0",
    lifespan=lifespan
)

# GZip compression middleware - compress responses over 500 bytes
# Saves 50-70% bandwidth on JSON responses
app.add_middleware(GZipMiddleware, minimum_size=500)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://tacosloshuevones.vercel.app",
        "https://tacosloshuevones.com",
        "https://www.tacosloshuevones.com",
        app_settings.frontend_url,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(menu.router, prefix="/api/menu", tags=["Menu"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(payments.router, prefix="/api/payments", tags=["Payments"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["Notifications"])
app.include_router(settings_router.router, prefix="/api/settings", tags=["Settings"])
app.include_router(catering.router, tags=["Catering"])


@app.get("/")
async def root():
    return {"message": "Tacos Los Huevones API", "status": "running"}


@app.get("/health")
async def health():
    """Health check endpoint - verifies database connectivity"""
    try:
        is_healthy = await health_check()
        if is_healthy:
            return {"status": "healthy", "database": "connected"}
        else:
            return Response(
                content='{"status": "unhealthy", "database": "disconnected"}',
                status_code=503,
                media_type="application/json"
            )
    except Exception as e:
        return Response(
            content='{"status": "unhealthy", "database": "disconnected"}',
            status_code=503,
            media_type="application/json"
        )
