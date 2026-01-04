from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from config import get_settings
from routes import menu, orders, payments, admin, notifications, catering
from routes import settings as settings_router

app_settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting Tacos Los Huevones API...")
    yield
    # Shutdown
    print("Shutting down...")


app = FastAPI(
    title="Tacos Los Huevones API",
    description="Food truck ordering system",
    version="1.0.0",
    lifespan=lifespan
)

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
    return {"status": "healthy"}
