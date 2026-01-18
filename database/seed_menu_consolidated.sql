-- Consolidated Menu Seed Data for Tacos Los Huevones
-- Run this after schema.sql and migration_variants.sql
-- This replaces the original seed_menu.sql with consolidated items

-- Clear existing menu items
TRUNCATE TABLE menu_items CASCADE;

-- ============ TACOS (with meat variants) ============
INSERT INTO menu_items (name, description, price, category, is_popular, spicy_level, is_vegetarian, image_url, variants) VALUES
(
  'Taco',
  'Authentic street taco on a fresh corn tortilla with cilantro, onions, and salsa',
  3.00,
  'tacos',
  true,
  1,
  false,
  '/images/menu/taco.jpg',
  '{
    "label": "Choose your meat",
    "required": true,
    "options": [
      {"id": "pastor", "name": "Pastor", "name_en": "Al Pastor", "price_modifier": 0},
      {"id": "suadero", "name": "Suadero", "name_en": "Beef Brisket", "price_modifier": 0},
      {"id": "asada", "name": "Asada", "name_en": "Grilled Steak", "price_modifier": 0},
      {"id": "barbacoa", "name": "Barbacoa", "name_en": "Slow-Cooked Beef", "price_modifier": 0},
      {"id": "carnitas", "name": "Carnitas", "name_en": "Pulled Pork", "price_modifier": 0},
      {"id": "camaron", "name": "Camarón", "name_en": "Shrimp", "price_modifier": 0.50},
      {"id": "campechanos", "name": "Campechanos", "name_en": "Mixed Meats", "price_modifier": 0},
      {"id": "pollo", "name": "Pollo", "name_en": "Chicken", "price_modifier": 0}
    ]
  }'::jsonb
);

-- ============ QUESADILLAS (with meat variants) ============
INSERT INTO menu_items (name, description, price, category, is_popular, spicy_level, is_vegetarian, image_url, variants) VALUES
(
  'Quesadilla',
  'Large flour tortilla with melted Oaxacan cheese and your choice of meat, served with sour cream and guacamole',
  11.00,
  'quesadillas',
  true,
  0,
  false,
  '/images/menu/quesadilla.jpg',
  '{
    "label": "Choose your meat",
    "required": true,
    "options": [
      {"id": "pastor", "name": "Pastor", "name_en": "Al Pastor", "price_modifier": 0},
      {"id": "suadero", "name": "Suadero", "name_en": "Beef Brisket", "price_modifier": 0},
      {"id": "asada", "name": "Asada", "name_en": "Grilled Steak", "price_modifier": 0},
      {"id": "barbacoa", "name": "Barbacoa", "name_en": "Slow-Cooked Beef", "price_modifier": 0},
      {"id": "camaron", "name": "Camarón", "name_en": "Shrimp", "price_modifier": 2.00},
      {"id": "pollo", "name": "Pollo", "name_en": "Chicken", "price_modifier": 0}
    ]
  }'::jsonb
);

-- ============ BREAKFAST ============
INSERT INTO menu_items (name, description, price, category, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Breakfast Tacos', 'Two tacos with scrambled eggs, cheese, and your choice of bacon or chorizo, served with salsa', 8.00, 'breakfast', true, 1, false, '/images/menu/breakfast-tacos.jpg'),
('Breakfast Burrito', 'Large flour tortilla with scrambled eggs, potatoes, cheese, meat, and salsa', 10.00, 'breakfast', true, 1, false, '/images/menu/breakfast-burrito.jpg'),
('Breakfast Quesadilla', 'Flour tortilla with scrambled eggs, melted cheese, and your choice of bacon or chorizo', 10.00, 'breakfast', false, 0, false, '/images/menu/breakfast-quesadilla.jpg'),
('Huevos Rancheros', 'Two fried eggs over corn tortillas with ranchero sauce, beans, and cheese', 12.00, 'breakfast', false, 1, true, '/images/menu/huevos-rancheros.jpg');

-- ============ SPECIALS ============
INSERT INTO menu_items (name, description, price, category, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Torta Mamalona', 'The ultimate Mexican sandwich loaded with ham, chorizo, carne asada, cheese, avocado, lettuce, tomato, and jalapeños', 15.00, 'specials', true, 2, false, '/images/menu/torta-mamalona.jpg'),
('Torta de Carne Asada', 'Traditional Mexican sandwich with grilled steak, beans, avocado, lettuce, tomato, and mayo', 14.00, 'specials', false, 1, false, '/images/menu/torta-asada.jpg'),
('Tacos de Alambre', 'Three tacos with grilled steak, bacon, peppers, onions, and melted cheese', 14.00, 'specials', true, 1, false, '/images/menu/tacos-alambre.jpg'),
('Enchiladas Verdes', 'Three corn tortillas filled with chicken, topped with green tomatillo sauce and cheese', 14.00, 'specials', false, 1, false, '/images/menu/enchiladas-verdes.jpg'),
('Chilaquiles Verdes', 'Crispy tortilla chips simmered in green salsa with eggs, cheese, sour cream, and onions', 13.00, 'specials', false, 1, true, '/images/menu/chilaquiles.jpg'),
('Hamburger', 'Classic beef patty with lettuce, tomato, onion, pickles, and special sauce on a brioche bun', 12.00, 'specials', false, 0, false, '/images/menu/hamburger.jpg'),
('Hawaiana Hamburger', 'Beef patty with ham, pineapple, bacon, cheese, and chipotle mayo', 14.00, 'specials', false, 1, false, '/images/menu/hawaiana-burger.jpg'),
('Papas Locas', 'Loaded fries with carne asada, nacho cheese, sour cream, guacamole, and jalapeños', 12.00, 'specials', true, 1, false, '/images/menu/papas-locas.jpg'),
('Fajitas Burrito', 'Large burrito with grilled steak, peppers, onions, rice, beans, cheese, and sour cream', 14.00, 'specials', false, 1, false, '/images/menu/fajitas-burrito.jpg'),
('Quesabirria', 'Three birria tacos dipped in consommé, served with a cup of birria broth for dipping', 15.00, 'specials', true, 1, false, '/images/menu/quesabirria.jpg');

-- ============ KIDS MENU ============
INSERT INTO menu_items (name, description, price, category, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Kids Cheeseburger + Fries', 'Mini cheeseburger with a side of crispy fries', 8.00, 'kids', false, 0, false, '/images/menu/kids-burger.jpg'),
('Kids Quesadilla + Fries', 'Cheese quesadilla with a side of crispy fries', 8.00, 'kids', true, 0, true, '/images/menu/kids-quesadilla.jpg'),
('Kids Corn Dog + Fries', 'Classic corn dog with a side of crispy fries', 8.00, 'kids', false, 0, false, '/images/menu/kids-corndog.jpg');

-- ============ SIDES ============
INSERT INTO menu_items (name, description, price, category, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Rice & Beans', 'Spanish rice and refried beans with melted cheese', 4.00, 'sides', false, 0, true, '/images/menu/rice-beans.jpg'),
('Chips & Salsa', 'Fresh tortilla chips with our homemade salsa verde and roja', 4.50, 'sides', false, 1, true, '/images/menu/chips-salsa.jpg'),
('Chips & Guacamole', 'Fresh tortilla chips with freshly made guacamole', 6.50, 'sides', true, 0, true, '/images/menu/chips-guac.jpg'),
('Elote (Street Corn)', 'Grilled corn on the cob with mayo, cotija cheese, chili, and lime', 5.00, 'sides', true, 1, true, '/images/menu/elote.jpg'),
('French Fries', 'Crispy golden fries', 4.00, 'sides', false, 0, true, '/images/menu/fries.jpg'),
('Extra Salsa', 'Choose from mild, medium, or hot', 1.00, 'sides', false, 2, true, '/images/menu/salsa.jpg');

-- ============ DRINKS ============
INSERT INTO menu_items (name, description, price, category, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Horchata', 'Traditional Mexican rice drink with cinnamon and vanilla', 3.50, 'drinks', true, 0, true, '/images/menu/horchata.jpg'),
('Jamaica', 'Refreshing hibiscus flower tea, lightly sweetened', 3.50, 'drinks', false, 0, true, '/images/menu/jamaica.jpg'),
('Tamarindo', 'Sweet and tangy tamarind drink', 3.50, 'drinks', false, 0, true, '/images/menu/tamarindo.jpg'),
('Mexican Coke', 'Made with real cane sugar', 3.00, 'drinks', false, 0, true, '/images/menu/mexican-coke.jpg'),
('Jarritos', 'Mexican fruit soda - ask for available flavors', 2.50, 'drinks', false, 0, true, '/images/menu/jarritos.jpg'),
('Bottled Water', 'Purified water', 2.00, 'drinks', false, 0, true, '/images/menu/water.jpg');
