-- Seed Menu Items for Tacos Los Huevones
-- Run this after schema.sql

-- ============ TACOS ============
INSERT INTO menu_items (name, description, price, category, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Carne Asada Taco', 'Grilled marinated steak with fresh cilantro, onions, and our homemade salsa verde', 4.50, 'tacos', true, 1, false, '/images/menu/carne-asada-taco.jpg'),
('Al Pastor Taco', 'Marinated pork with pineapple, cilantro, and onions on a fresh corn tortilla', 4.50, 'tacos', true, 1, false, '/images/menu/al-pastor-taco.jpg'),
('Pollo Taco', 'Seasoned grilled chicken with lettuce, cheese, and chipotle crema', 4.00, 'tacos', false, 0, false, '/images/menu/pollo-taco.jpg'),
('Barbacoa Taco', 'Slow-cooked shredded beef with cilantro, onions, and lime', 4.75, 'tacos', true, 1, false, '/images/menu/barbacoa-taco.jpg'),
('Carnitas Taco', 'Crispy pulled pork with pickled onions and fresh salsa', 4.50, 'tacos', false, 0, false, '/images/menu/carnitas-taco.jpg'),
('Chorizo Taco', 'Spicy Mexican sausage with potatoes, cilantro, and onions', 4.25, 'tacos', false, 2, false, '/images/menu/chorizo-taco.jpg'),
('Veggie Taco', 'Grilled bell peppers, onions, mushrooms, and zucchini with queso fresco', 3.75, 'tacos', false, 0, true, '/images/menu/veggie-taco.jpg'),
('Fish Taco', 'Beer-battered cod with cabbage slaw, chipotle mayo, and lime', 5.25, 'tacos', false, 0, false, '/images/menu/fish-taco.jpg');

-- ============ BURRITOS ============
INSERT INTO menu_items (name, description, price, category, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Carne Asada Burrito', 'Grilled steak with rice, beans, cheese, sour cream, and pico de gallo', 12.50, 'burritos', true, 1, false, '/images/menu/carne-asada-burrito.jpg'),
('Al Pastor Burrito', 'Marinated pork with rice, beans, pineapple, and fresh salsa', 12.50, 'burritos', false, 1, false, '/images/menu/al-pastor-burrito.jpg'),
('Pollo Burrito', 'Grilled chicken with rice, beans, lettuce, cheese, and chipotle crema', 11.50, 'burritos', false, 0, false, '/images/menu/pollo-burrito.jpg'),
('Barbacoa Burrito', 'Slow-cooked shredded beef with rice, beans, cheese, and salsa roja', 13.00, 'burritos', true, 1, false, '/images/menu/barbacoa-burrito.jpg'),
('Veggie Burrito', 'Grilled vegetables with rice, beans, cheese, guacamole, and sour cream', 10.50, 'burritos', false, 0, true, '/images/menu/veggie-burrito.jpg'),
('California Burrito', 'Carne asada with french fries, cheese, sour cream, and guacamole', 13.50, 'burritos', true, 1, false, '/images/menu/california-burrito.jpg');

-- ============ QUESADILLAS ============
INSERT INTO menu_items (name, description, price, category, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Cheese Quesadilla', 'Melted Oaxacan cheese in a crispy flour tortilla with sour cream', 7.00, 'quesadillas', false, 0, true, '/images/menu/cheese-quesadilla.jpg'),
('Chicken Quesadilla', 'Grilled chicken with melted cheese, peppers, and onions', 10.00, 'quesadillas', false, 0, false, '/images/menu/chicken-quesadilla.jpg'),
('Steak Quesadilla', 'Carne asada with melted cheese, peppers, and onions', 11.00, 'quesadillas', false, 1, false, '/images/menu/steak-quesadilla.jpg'),
('Chorizo Quesadilla', 'Spicy chorizo with melted cheese and caramelized onions', 10.50, 'quesadillas', false, 2, false, '/images/menu/chorizo-quesadilla.jpg');

-- ============ BREAKFAST ============
INSERT INTO menu_items (name, description, price, category, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Breakfast Taco - Bacon', 'Scrambled eggs with crispy bacon, cheese, and salsa on a flour tortilla', 4.00, 'breakfast', false, 0, false, '/images/menu/breakfast-bacon-taco.jpg'),
('Breakfast Taco - Chorizo', 'Scrambled eggs with spicy chorizo and cheese on a flour tortilla', 4.25, 'breakfast', true, 2, false, '/images/menu/breakfast-chorizo-taco.jpg'),
('Breakfast Taco - Potato', 'Scrambled eggs with crispy potatoes, cheese, and peppers', 3.75, 'breakfast', false, 0, true, '/images/menu/breakfast-potato-taco.jpg'),
('Breakfast Burrito', 'Scrambled eggs, choice of meat, potatoes, cheese, and salsa', 9.50, 'breakfast', true, 1, false, '/images/menu/breakfast-burrito.jpg'),
('Breakfast Quesadilla', 'Scrambled eggs with cheese, your choice of bacon or chorizo', 8.50, 'breakfast', false, 1, false, '/images/menu/breakfast-quesadilla.jpg');

-- ============ SIDES ============
INSERT INTO menu_items (name, description, price, category, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Rice & Beans', 'Spanish rice and refried beans with melted cheese', 4.00, 'sides', false, 0, true, '/images/menu/rice-beans.jpg'),
('Chips & Salsa', 'Fresh tortilla chips with our homemade salsa verde and roja', 4.50, 'sides', false, 1, true, '/images/menu/chips-salsa.jpg'),
('Chips & Guacamole', 'Fresh tortilla chips with freshly made guacamole', 6.50, 'sides', true, 0, true, '/images/menu/chips-guac.jpg'),
('Elote (Street Corn)', 'Grilled corn on the cob with mayo, cotija cheese, chili, and lime', 5.00, 'sides', true, 1, true, '/images/menu/elote.jpg'),
('Extra Salsa', 'Choose from mild, medium, or hot', 1.00, 'sides', false, 2, true, '/images/menu/salsa.jpg');

-- ============ DRINKS ============
INSERT INTO menu_items (name, description, price, category, is_popular, spicy_level, is_vegetarian, image_url) VALUES
('Horchata', 'Traditional Mexican rice drink with cinnamon and vanilla', 3.50, 'drinks', true, 0, true, '/images/menu/horchata.jpg'),
('Jamaica', 'Refreshing hibiscus flower tea, lightly sweetened', 3.50, 'drinks', false, 0, true, '/images/menu/jamaica.jpg'),
('Tamarindo', 'Sweet and tangy tamarind drink', 3.50, 'drinks', false, 0, true, '/images/menu/tamarindo.jpg'),
('Mexican Coke', 'Made with real cane sugar', 3.00, 'drinks', false, 0, true, '/images/menu/mexican-coke.jpg'),
('Jarritos', 'Mexican fruit soda - ask for available flavors', 2.50, 'drinks', false, 0, true, '/images/menu/jarritos.jpg'),
('Bottled Water', 'Purified water', 2.00, 'drinks', false, 0, true, '/images/menu/water.jpg');
