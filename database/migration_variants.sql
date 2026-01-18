-- Migration: Add variants support to menu items
-- Run this migration on Neon database

-- Add variants column for items with selectable options (e.g., meat type)
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS variants JSONB;

-- Update category constraint to include new categories (specials, kids)
ALTER TABLE menu_items DROP CONSTRAINT IF EXISTS menu_items_category_check;
ALTER TABLE menu_items ADD CONSTRAINT menu_items_category_check
  CHECK (category IN ('tacos', 'burritos', 'quesadillas', 'breakfast', 'sides', 'drinks', 'specials', 'kids'));

-- Example variants structure for reference:
-- {
--   "label": "Choose your meat",
--   "required": true,
--   "options": [
--     {"id": "pastor", "name": "Pastor", "name_en": "Al Pastor", "price_modifier": 0},
--     {"id": "camaron", "name": "Camarón", "name_en": "Shrimp", "price_modifier": 0.50}
--   ]
-- }
