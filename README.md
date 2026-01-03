# Tacos Los Huevones - Food Truck Website

A full-featured online ordering system for Tacos Los Huevones food truck in Parker, Colorado.

## Features

- **Menu Display**: Beautiful menu with categories, pricing, and customization options
- **Cart & Checkout**: Add items to cart, customize orders, and checkout
- **Square Payments**: Secure payment processing with $1 platform fee
- **Order Notifications**: SMS/Email notifications for customers and the business
- **Admin Dashboard**: Manage menu, view orders, update business hours
- **Real-time Order Tracking**: Customers can track their order status

## Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript**
- **Tailwind CSS**
- Hosted on **Vercel**

### Backend
- **FastAPI** (Python)
- **Supabase** (PostgreSQL database)
- **Square API** (payments)
- **Twilio** (SMS notifications)
- **Resend** (email notifications)
- Hosted on **Render**

## Project Structure

```
tacos-los-huevones/
├── frontend/                # Next.js application
│   ├── src/
│   │   ├── app/            # Pages (menu, checkout, orders, admin)
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context (cart)
│   │   ├── lib/            # API utilities
│   │   └── types/          # TypeScript types
│   └── ...
├── backend/                 # FastAPI application
│   ├── routes/             # API endpoints
│   ├── services/           # Business logic
│   ├── models/             # Pydantic models
│   └── ...
└── database/               # SQL schema files
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Supabase account
- Square developer account
- Twilio account (for SMS)
- Resend account (for email)

### 1. Set up Supabase Database

1. Create a new Supabase project
2. Run the schema file: `database/schema.sql`
3. Run the seed file: `database/seed_menu.sql`

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt

# Copy environment file and fill in your values
cp .env.example .env

# Run development server
uvicorn main:app --reload
```

### 3. Frontend Setup

```bash
cd frontend
npm install

# Copy environment file
cp .env.example .env.local

# Run development server
npm run dev
```

### 4. Environment Variables

#### Backend (.env)
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SQUARE_ACCESS_TOKEN=your-square-access-token
SQUARE_LOCATION_ID=your-location-id
SQUARE_APPLICATION_ID=your-app-id
SQUARE_ENVIRONMENT=sandbox
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
RESEND_API_KEY=re_xxxxx
BUSINESS_PHONE=+1234567890
BUSINESS_EMAIL=orders@tacosloshuevones.com
FRONTEND_URL=http://localhost:3000
ADMIN_API_KEY=your-secret-admin-key
```

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deployment

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command: `pip install -r requirements.txt`
4. Set the start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add all environment variables
6. Deploy!

### Frontend (Vercel)

1. Import your repository on Vercel
2. Set the root directory to `frontend`
3. Add environment variable: `NEXT_PUBLIC_API_URL` with your Render backend URL
4. Deploy!

## Square Payment Setup

1. Create a Square developer account at https://developer.squareup.com
2. Create a new application
3. Enable OAuth and set the redirect URL
4. Copy your Access Token, Location ID, and Application ID
5. Set up a webhook for `payment.completed` events pointing to `/api/payments/webhook`

To collect the $1 platform fee, the Square account needs to be connected via OAuth with the `PAYMENTS_WRITE` scope and app fee collection enabled.

## Admin Dashboard

Access the admin dashboard at `/admin`. You'll need the `ADMIN_API_KEY` to log in.

Features:
- View today's orders and revenue
- Update order status (triggers customer notifications)
- Manage menu items (add, edit, delete, toggle availability)
- Update business hours and settings
- Toggle order acceptance on/off

## API Endpoints

### Public
- `GET /api/menu` - Get available menu items
- `POST /api/orders` - Create new order
- `GET /api/orders/{id}` - Get order details
- `GET /api/orders/{id}/status` - Get order status
- `POST /api/payments/create-link/{order_id}` - Create Square payment link

### Admin (requires X-Admin-Key header)
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/orders/active` - Active orders
- `PATCH /api/admin/orders/{id}/status` - Update order status
- `POST /api/admin/menu` - Create menu item
- `PUT /api/admin/menu/{id}` - Update menu item
- `DELETE /api/admin/menu/{id}` - Delete menu item
- `GET /api/admin/settings` - Get business settings
- `PUT /api/admin/settings` - Update settings

## License

Private - All rights reserved
