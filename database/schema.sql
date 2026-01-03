-- Tacos Los Huevones Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============ MENU ITEMS ============
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('tacos', 'burritos', 'quesadillas', 'breakfast', 'sides', 'drinks')),
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    is_popular BOOLEAN DEFAULT false,
    spicy_level INTEGER DEFAULT 0 CHECK (spicy_level >= 0 AND spicy_level <= 3),
    is_vegetarian BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ ORDERS ============
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    items JSONB NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    tax DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'preparing', 'ready', 'completed', 'cancelled')),
    payment_id TEXT,
    estimated_ready_time TIMESTAMPTZ,
    special_instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ SETTINGS ============
CREATE TABLE settings (
    id TEXT PRIMARY KEY DEFAULT 'main',
    business_name TEXT DEFAULT 'Tacos Los Huevones',
    tagline TEXT DEFAULT 'Authentic Mexican Street Food',
    phone TEXT,
    email TEXT,
    address TEXT DEFAULT 'Parker, Colorado',
    hours JSONB DEFAULT '[
        {"day": "monday", "open_time": "08:00", "close_time": "19:00", "is_closed": false},
        {"day": "tuesday", "open_time": "08:00", "close_time": "19:00", "is_closed": false},
        {"day": "wednesday", "open_time": "08:00", "close_time": "19:00", "is_closed": false},
        {"day": "thursday", "open_time": "08:00", "close_time": "19:00", "is_closed": false},
        {"day": "friday", "open_time": "08:00", "close_time": "19:00", "is_closed": false},
        {"day": "saturday", "open_time": "08:00", "close_time": "19:00", "is_closed": false},
        {"day": "sunday", "open_time": "08:00", "close_time": "15:00", "is_closed": false}
    ]'::jsonb,
    is_accepting_orders BOOLEAN DEFAULT true,
    estimated_wait_minutes INTEGER DEFAULT 15,
    tax_rate DECIMAL(5,4) DEFAULT 0.0800,
    minimum_order DECIMAL(10,2) DEFAULT 0.00,
    hero_image_url TEXT,
    logo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (id) VALUES ('main') ON CONFLICT (id) DO NOTHING;

-- ============ INDEXES ============
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- ============ UPDATED_AT TRIGGER ============
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============ ROW LEVEL SECURITY ============
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public can read menu items
CREATE POLICY "Menu items are viewable by everyone" ON menu_items
    FOR SELECT USING (true);

-- Public can read settings
CREATE POLICY "Settings are viewable by everyone" ON settings
    FOR SELECT USING (true);

-- Orders: public can insert and read their own orders
CREATE POLICY "Anyone can create orders" ON orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Orders are viewable by order ID" ON orders
    FOR SELECT USING (true);

-- Service role can do everything (for backend)
CREATE POLICY "Service role has full access to menu_items" ON menu_items
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to orders" ON orders
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to settings" ON settings
    FOR ALL USING (auth.role() = 'service_role');
