# Tacos Los Huevones - Claude Code Instructions

Run with: `claude --dangerously-skip-permissions`

## Project Overview

Full-stack food truck ordering website for **Tacos Los Huevones** in Parker, Colorado.

- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS (deploy to Vercel)
- **Backend**: FastAPI + Python 3.11 (deploy to Render)
- **Database**: Neon (PostgreSQL) - Project ID: `empty-shape-89765791`
- **Payments**: Square API with $1.50 platform fee (paid by customer)
- **Notifications**: Resend (email only - free tier: 100 emails/day)

## Project Structure

```
tacos-los-huevones/
├── frontend/                 # Next.js app
│   ├── src/app/             # Pages (menu, checkout, order/[id], admin/*)
│   ├── src/components/      # Navbar, Footer, Hero, MenuCard, CartSlider
│   ├── src/context/         # CartContext (cart state management)
│   ├── src/lib/api.ts       # API client functions
│   └── src/types/           # TypeScript interfaces
├── backend/                  # FastAPI app
│   ├── routes/              # menu, orders, payments, admin, notifications
│   ├── services/            # database, menu, order, square, notification
│   ├── models/              # Pydantic models (menu, order, settings)
│   ├── config.py            # Environment settings
│   ├── main.py              # FastAPI app entry
│   ├── requirements.txt     # Python dependencies
│   └── .python-version      # Pin to 3.11.4 for Render
└── database/
    ├── schema.sql           # Supabase tables (menu_items, orders, settings)
    ├── seed_menu.sql        # 34 menu items pre-seeded
    └── migration_add_indexes.sql  # Performance indexes
```

## Key Features Built

1. **Menu Display**: Categories (tacos, burritos, quesadillas, breakfast, sides, drinks), spicy levels, vegetarian badges
2. **Cart System**: Add/remove items, quantity controls, special instructions, localStorage persistence
3. **Checkout Flow**: Customer info form → Square payment link → order confirmation
4. **Order Tracking**: Real-time status polling (pending → paid → preparing → ready → completed)
5. **Admin Dashboard** (`/admin`):
   - Stats (today's orders, revenue)
   - Order management (update status, triggers email notifications)
   - Menu CRUD (add/edit/delete items, toggle availability)
   - Business settings (hours, tax rate, accepting orders toggle)
6. **Welcome Letter Modal**: Shows once to owner on first visit with Spanish letter explaining the site and benefits (stored in localStorage)

## Performance Optimizations

- **Menu caching**: 5-minute TTL in-memory cache
- **Settings caching**: 5-minute TTL in-memory cache
- **Batch queries**: Order creation uses single batch query instead of N+1
- **GZip compression**: All API responses compressed
- **Async notifications**: Webhook returns immediately, emails sent in background
- **Throttled scroll**: Frontend uses requestAnimationFrame for scroll events
- **Memoized context**: CartContext uses useMemo/useCallback
- **Lazy video loading**: Hero video uses Intersection Observer

## Deployment

### Render (Backend)
- Service: `srv-d5cam3dactks73c9ktfg`
- URL: https://tacos-los-huevones.onrender.com
- Root directory: `backend`
- Build: `pip install -r requirements.txt`
- Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **IMPORTANT**: `.python-version` pins Python to 3.11.4 (Python 3.13 fails due to pydantic-core Rust compilation)

### Vercel (Frontend)
- Root directory: `frontend`
- Env vars:
  - `NEXT_PUBLIC_API_URL=https://tacos-los-huevones.onrender.com`
  - `SITE_PASSWORD=` (leave empty to disable password protection)

### Neon (Database)
- Project ID: `empty-shape-89765791`
- Database: `neondb`
- Connection string available via Neon MCP or dashboard
- Schema, seed data, and indexes already applied

## Environment Variables (Backend - Render)

```bash
# Database (Neon)
DATABASE_URL=postgresql://neondb_owner:npg_72swnXzjNKuP@ep-curly-recipe-ah27o4px-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require

# Square Payments (get from developer.squareup.com)
SQUARE_ACCESS_TOKEN=           # Your Square access token
SQUARE_LOCATION_ID=            # Your Square location ID
SQUARE_APPLICATION_ID=         # Your Square application ID
SQUARE_ENVIRONMENT=sandbox     # "sandbox" for testing, "production" for live
SQUARE_WEBHOOK_SIGNATURE_KEY=  # Optional: for webhook verification

# Email Option 1: SMTP (Gmail recommended - free)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password  # Use Gmail App Password, not regular password
SMTP_FROM_EMAIL=Tacos Los Huevones <your-email@gmail.com>

# Email Option 2: Resend (alternative, 100 emails/day free)
RESEND_API_KEY=                # Only if using Resend instead of SMTP

# Business Settings
BUSINESS_EMAIL=owner-email@example.com  # Where to receive order notifications
FRONTEND_URL=https://tacos-los-huevones.vercel.app

# Admin Dashboard
ADMIN_API_KEY=your-secure-admin-key  # Secure key for admin access
```

### Gmail App Password Setup (for SMTP)
1. Go to Google Account → Security → 2-Step Verification (enable if not already)
2. Go to Google Account → Security → App passwords
3. Create new app password for "Mail"
4. Use that 16-character password as SMTP_PASSWORD

## Environment Variables (Frontend - Vercel)

```bash
NEXT_PUBLIC_API_URL=https://tacos-los-huevones.onrender.com
SITE_PASSWORD=Tacos2026  # Password protection for site access
```

## Common Issues & Fixes

### 1. Render deploy fails with pydantic-core Rust error
**Cause**: Python 3.13 doesn't have pre-built wheels, tries to compile Rust
**Fix**: Add `backend/.python-version` with `3.11.4`

### 2. httpx version conflict
**Cause**: `supabase` requires `httpx>=0.24,<0.26`
**Fix**: Use `httpx>=0.24,<0.26` in requirements.txt (not pinned to 0.26.0)

### 3. Check Render deploy logs
```bash
render services list -o json  # Get service ID
render deploys list <service-id> -o json  # Get deploy ID
render logs -r <service-id> -o text --limit 200  # View logs
```

## Setup Checklist

### 1. Database (Neon)
- [x] Project created: `tacos-los-huevones` (ID: `empty-shape-89765791`)
- [x] Schema applied (menu_items, orders, settings tables)
- [x] Seed data loaded (34 menu items)
- [x] Performance indexes applied
- [ ] Get connection string from Neon dashboard or MCP

### 2. Payments (Square)
- [ ] Create app at developer.squareup.com
- [ ] Get Access Token, Location ID, Application ID
- [ ] For testing: Use sandbox credentials
- [ ] For production: Create production credentials
- [ ] Optional: Set up webhook and get signature key

### 3. Email (Resend)
- [ ] Sign up at resend.com
- [ ] Get API key (free tier: 100 emails/day)
- [ ] Verify your domain (optional but recommended)

### 4. Backend Deployment (Render)
- [ ] Connect GitHub repo
- [ ] Set root directory: `backend`
- [ ] Set build command: `pip install -r requirements.txt`
- [ ] Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- [ ] Add DATABASE_URL from Neon connection string
- [ ] Add other environment variables (Square, Resend, etc.)
- [ ] Deploy and verify at /health endpoint

### 5. Frontend Deployment (Vercel)
- [ ] Connect GitHub repo
- [ ] Set root directory: `frontend`
- [ ] Add env var: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`
- [ ] Optional: Add `SITE_PASSWORD` for private beta
- [ ] Deploy and test ordering flow

### 6. Post-Deployment
- [ ] Update FRONTEND_URL in Render to your Vercel URL
- [ ] Test complete order flow (add to cart → checkout → pay → confirmation)
- [ ] Test admin dashboard at /admin
- [ ] Set SQUARE_ENVIRONMENT=production when ready

## API Endpoints

### Public
- `GET /api/menu/` - Available menu items (cached 5 min)
- `GET /api/settings/` - Business hours and settings (cached 5 min)
- `POST /api/orders/` - Create order
- `GET /api/orders/{id}` - Get order
- `GET /api/orders/{id}/status` - Get order status (optimized for polling)
- `POST /api/payments/create-link/{order_id}` - Square payment link

### Admin (requires `X-Admin-Key` header)
- `GET /api/admin/stats` - Dashboard stats (optimized with SQL aggregations)
- `GET /api/admin/orders/active` - Active orders
- `PATCH /api/admin/orders/{id}/status?status=preparing` - Update status
- `POST /api/admin/menu` - Create menu item
- `PUT /api/admin/menu/{id}` - Update menu item
- `DELETE /api/admin/menu/{id}` - Delete menu item
- `GET /api/admin/settings` - Business settings
- `PUT /api/admin/settings` - Update settings

## Git Repository

- Remote: https://github.com/whiteag0/tacos-los-huevones.git
- Branch: main
