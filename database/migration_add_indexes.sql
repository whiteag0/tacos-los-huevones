-- Performance Optimization: Add missing indexes
-- Run this in Supabase SQL Editor

-- Index for payment reconciliation (lookup by payment_id)
CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON orders(payment_id);

-- Index for customer lookups
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);

-- Composite index for active orders query (status + created_at)
-- This optimizes the common query: WHERE status IN (...) ORDER BY created_at
CREATE INDEX IF NOT EXISTS idx_orders_status_created_at ON orders(status, created_at DESC);

-- Partial index for popular menu items (only index available items)
CREATE INDEX IF NOT EXISTS idx_menu_items_popular ON menu_items(is_popular)
WHERE is_available = true;

-- Unique constraint on payment_id to prevent duplicate payments
-- Using a partial unique index to allow NULLs (pending orders)
CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_payment_id_unique ON orders(payment_id)
WHERE payment_id IS NOT NULL;

-- GIN index on orders.items for future JSONB queries
CREATE INDEX IF NOT EXISTS idx_orders_items_gin ON orders USING GIN(items);

-- Verify indexes were created
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename IN ('orders', 'menu_items')
ORDER BY tablename, indexname;
