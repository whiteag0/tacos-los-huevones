# Tacos Los Huevones - Claude Code Instructions

Run with: `claude --dangerously-skip-permissions`

## Project Overview

Full-stack food truck ordering website for **Tacos Los Huevones** in Parker, Colorado.

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS (deploy to Vercel)
- **Backend**: FastAPI + Python 3.11 (deploy to Render)
- **Database**: Supabase (PostgreSQL)
- **Payments**: Square API with $1 platform fee
- **Notifications**: Twilio (SMS) + Resend (email)

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
│   ├── services/            # supabase, menu, order, square, notification
│   ├── models/              # Pydantic models (menu, order, settings)
│   ├── config.py            # Environment settings
│   ├── main.py              # FastAPI app entry
│   ├── requirements.txt     # Python dependencies
│   └── .python-version      # Pin to 3.11.4 for Render
└── database/
    ├── schema.sql           # Supabase tables (menu_items, orders, settings)
    └── seed_menu.sql        # 34 menu items pre-seeded
```

## Key Features Built

1. **Menu Display**: Categories (tacos, burritos, quesadillas, breakfast, sides, drinks), spicy levels, vegetarian badges
2. **Cart System**: Add/remove items, quantity controls, special instructions, localStorage persistence
3. **Checkout Flow**: Customer info form → Square payment link → order confirmation
4. **Order Tracking**: Real-time status polling (pending → paid → preparing → ready → completed)
5. **Admin Dashboard** (`/admin`):
   - Stats (today's orders, revenue)
   - Order management (update status, triggers SMS/email)
   - Menu CRUD (add/edit/delete items, toggle availability)
   - Business settings (hours, tax rate, accepting orders toggle)

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
- Env var: `NEXT_PUBLIC_API_URL=https://tacos-los-huevones.onrender.com`

### Supabase
- Run `database/schema.sql` then `database/seed_menu.sql`

## Environment Variables (Backend)

```
SUPABASE_URL=
SUPABASE_KEY=
SQUARE_ACCESS_TOKEN=
SQUARE_LOCATION_ID=
SQUARE_APPLICATION_ID=
SQUARE_ENVIRONMENT=production
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
RESEND_API_KEY=
BUSINESS_PHONE=
BUSINESS_EMAIL=
FRONTEND_URL=
ADMIN_API_KEY=
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

## API Endpoints

### Public
- `GET /api/menu/` - Available menu items
- `POST /api/orders/` - Create order
- `GET /api/orders/{id}` - Get order
- `POST /api/payments/create-link/{order_id}` - Square payment link

### Admin (requires `X-Admin-Key` header)
- `GET /api/admin/stats` - Dashboard stats
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
