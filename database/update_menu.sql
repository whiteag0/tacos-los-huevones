-- Tacos Los Huevones - Menu Update
-- Run this in Supabase SQL Editor

-- Step 1: Update category constraint to include new categories
ALTER TABLE menu_items DROP CONSTRAINT IF EXISTS menu_items_category_check;
ALTER TABLE menu_items ADD CONSTRAINT menu_items_category_check
  CHECK (category IN ('tacos', 'burritos', 'quesadillas', 'breakfast', 'sides', 'drinks', 'specials', 'kids'));

-- Step 2: Clear existing menu items
DELETE FROM menu_items;

-- Step 3: Insert BREAKFAST items
INSERT INTO menu_items (name, description, price, category, is_available, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Breakfast Tacos', 'Three tacos with potatoes, eggs, cheese, onion, jalapeño and choice of meat (chorizo, ham, bacon, or sausage)', 8.50, 'breakfast', true, true, 1, false, 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80'),
('Breakfast Burrito', 'Potatoes, eggs, cheese, beans, onion, jalapeño, and choice of meat', 9.00, 'breakfast', true, true, 1, false, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80'),
('Breakfast Quesadilla', 'Eggs, cheese, onion, jalapeño, and choice of meat', 9.00, 'breakfast', true, false, 1, false, 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80'),
('Huevos Rancheros', 'Potatoes, beans, green chile, cheese, sour cream, avocado, and choice of meat', 10.00, 'breakfast', true, true, 2, false, 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=800&q=80');

-- Step 4: Insert TACOS (served with cilantro, onion, spicy sauce)
INSERT INTO menu_items (name, description, price, category, is_available, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Taco de Pastor', 'Marinated pork with cilantro, onion, and spicy sauce', 3.00, 'tacos', true, true, 1, false, 'https://images.unsplash.com/photo-1611250188496-e966043a0629?w=800&q=80'),
('Taco de Suadero', 'Tender brisket with cilantro, onion, and spicy sauce', 3.00, 'tacos', true, true, 1, false, 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800&q=80'),
('Taco de Asada', 'Grilled steak with cilantro, onion, and spicy sauce', 3.00, 'tacos', true, true, 1, false, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80'),
('Taco de Barbacoa', 'Slow-cooked shredded beef with cilantro, onion, and spicy sauce', 3.00, 'tacos', true, true, 1, false, 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80'),
('Taco de Carnitas', 'Crispy chopped pork with cilantro, onion, and spicy sauce', 3.00, 'tacos', true, false, 1, false, 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=800&q=80'),
('Taco Campechano', 'Homemade mix with cilantro, onion, and spicy sauce', 3.00, 'tacos', true, false, 1, false, 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80'),
('Taco de Pollo', 'Grilled chicken with cilantro, onion, and spicy sauce', 3.00, 'tacos', true, false, 0, false, 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800&q=80'),
('Taco de Camaron', 'Seasoned shrimp with cilantro, onion, and spicy sauce', 3.50, 'tacos', true, true, 1, false, 'https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd?w=800&q=80');

-- Step 5: Insert QUESADILLAS (served with lettuce, sour cream, guacamole, cheese)
INSERT INTO menu_items (name, description, price, category, is_available, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Quesadilla de Pastor', 'Marinated pork with lettuce, sour cream, guacamole, and cheese', 11.00, 'quesadillas', true, true, 1, false, 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80'),
('Quesadilla de Suadero', 'Tender brisket with lettuce, sour cream, guacamole, and cheese', 11.00, 'quesadillas', true, false, 1, false, 'https://images.unsplash.com/photo-1628191139360-4083564d03fd?w=800&q=80'),
('Quesadilla de Asada', 'Grilled steak with lettuce, sour cream, guacamole, and cheese', 11.00, 'quesadillas', true, true, 1, false, 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80'),
('Quesadilla de Barbacoa', 'Shredded beef with lettuce, sour cream, guacamole, and cheese', 11.00, 'quesadillas', true, false, 1, false, 'https://images.unsplash.com/photo-1628191139360-4083564d03fd?w=800&q=80'),
('Quesadilla de Pollo', 'Grilled chicken with lettuce, sour cream, guacamole, and cheese', 11.00, 'quesadillas', true, false, 0, false, 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80'),
('Quesadilla de Camaron', 'Seasoned shrimp with lettuce, sour cream, guacamole, and cheese', 11.50, 'quesadillas', true, true, 1, false, 'https://images.unsplash.com/photo-1628191139360-4083564d03fd?w=800&q=80');

-- Step 6: Insert BURRITOS (served with beans, rice, sour cream, guacamole, lettuce)
INSERT INTO menu_items (name, description, price, category, is_available, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Burrito de Pastor', 'Marinated pork with beans, rice, sour cream, guacamole, and lettuce', 11.50, 'burritos', true, true, 1, false, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80'),
('Burrito de Suadero', 'Tender brisket with beans, rice, sour cream, guacamole, and lettuce', 11.50, 'burritos', true, false, 1, false, 'https://images.unsplash.com/photo-1584208632869-05fa2b2a5934?w=800&q=80'),
('Burrito de Asada', 'Grilled steak with beans, rice, sour cream, guacamole, and lettuce', 11.50, 'burritos', true, true, 1, false, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80'),
('Burrito de Barbacoa', 'Shredded beef with beans, rice, sour cream, guacamole, and lettuce', 11.50, 'burritos', true, true, 1, false, 'https://images.unsplash.com/photo-1584208632869-05fa2b2a5934?w=800&q=80'),
('Burrito de Carnitas', 'Chopped pork with beans, rice, sour cream, guacamole, and lettuce', 11.50, 'burritos', true, false, 1, false, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80'),
('Burrito de Pollo', 'Grilled chicken with beans, rice, sour cream, guacamole, and lettuce', 11.50, 'burritos', true, false, 0, false, 'https://images.unsplash.com/photo-1584208632869-05fa2b2a5934?w=800&q=80'),
('Burrito de Camaron', 'Seasoned shrimp with beans, rice, sour cream, guacamole, and lettuce', 12.00, 'burritos', true, true, 1, false, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80');

-- Step 7: Insert SPECIALTY ITEMS
INSERT INTO menu_items (name, description, price, category, is_available, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Torta Mamalona', 'The ultimate torta! Beans, mayo, sausage, ham, chorizo, avocado, tomatoes, onion, lettuce, cheese, quesillo, egg, and grilled carnitas', 13.00, 'specials', true, true, 2, false, 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80'),
('Torta de Carne Asada', 'Grilled steak, cheese, beans, avocado, onion, tomatoes, lettuce, and jalapeño', 12.00, 'specials', true, true, 1, false, 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80'),
('Tacos Alambre', 'Three tacos with ham, steak, pepper, onion, cheese, lettuce, sour cream, and guacamole', 12.00, 'specials', true, true, 1, false, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80'),
('Enchiladas Verdes', 'Chicken in tomatillo sauce with corn tortilla, cheese, lettuce, cream, avocado, served with rice and beans', 12.00, 'specials', true, true, 1, false, 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=800&q=80'),
('Hamburguesa', 'Juicy beef patty with mayo, cheese, sausage, jalapeño, lettuce, tomatoes, and onion', 12.00, 'specials', true, false, 1, false, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80'),
('Hamburguesa Hawaiana', 'Beef patty with mayo, cheese, bacon, pineapple, jalapeño, lettuce, tomatoes, and onion', 12.00, 'specials', true, true, 1, false, 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=800&q=80'),
('Papas Locas', 'Loaded fries with green chili, cheese, steak, guacamole, sour cream, jalapeño, and pico de gallo', 11.00, 'specials', true, true, 2, false, 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&q=80'),
('Fajita Burrito', 'Choice of chicken, shrimp, or steak with beans, rice, cheese, onion, and peppers', 12.00, 'specials', true, false, 1, false, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80'),
('Quesabirria', 'Three tacos with corn tortilla, cheese, birria (slow-cooked shredded beef), onion, and cilantro - served with consomé', 12.00, 'specials', true, true, 1, false, 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=800&q=80');

-- Step 8: Insert KIDS MENU
INSERT INTO menu_items (name, description, price, category, is_available, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Kid''s Cheeseburger', 'Kid-sized cheeseburger served with fries', 7.00, 'kids', true, false, 0, false, 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&q=80'),
('Kid''s Quesadilla', 'Cheese quesadilla served with fries', 7.00, 'kids', true, true, 0, true, 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80'),
('Kid''s Corn Dog', 'Classic corn dog served with fries', 5.00, 'kids', true, false, 0, false, 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=800&q=80');

-- Step 9: Insert DRINKS
INSERT INTO menu_items (name, description, price, category, is_available, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Horchata', 'Traditional Mexican rice drink with cinnamon and vanilla', 3.50, 'drinks', true, true, 0, true, 'https://images.unsplash.com/photo-1625865352034-5e5a5e0b5e3c?w=800&q=80'),
('Jamaica', 'Refreshing hibiscus flower tea, lightly sweetened', 3.50, 'drinks', true, false, 0, true, 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80'),
('Mexican Coke', 'Made with real cane sugar', 3.00, 'drinks', true, false, 0, true, 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800&q=80'),
('Jarritos', 'Mexican fruit soda - ask for available flavors', 2.50, 'drinks', true, false, 0, true, 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800&q=80'),
('Bottled Water', 'Purified water', 2.00, 'drinks', true, false, 0, true, 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80');

-- Verify the menu
SELECT category, COUNT(*) as count FROM menu_items GROUP BY category ORDER BY category;
