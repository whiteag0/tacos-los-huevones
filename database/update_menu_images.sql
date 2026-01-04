-- Update Menu Items with Unique Unsplash Images
-- Run this to add high-quality food images for all menu items

-- ============ TACOS ============
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800&q=80' WHERE name = 'Carne Asada Taco';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80' WHERE name = 'Al Pastor Taco';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1624300629298-e9f0e5274f8c?w=800&q=80' WHERE name = 'Pollo Taco';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=800&q=80' WHERE name = 'Barbacoa Taco';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1640719028782-8230f1bdc0b8?w=800&q=80' WHERE name = 'Carnitas Taco';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1629385701021-fcd568a743e8?w=800&q=80' WHERE name = 'Chorizo Taco';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80' WHERE name = 'Veggie Taco';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd?w=800&q=80' WHERE name = 'Fish Taco';

-- ============ BURRITOS ============
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80' WHERE name = 'Carne Asada Burrito';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?w=800&q=80' WHERE name = 'Al Pastor Burrito';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800&q=80' WHERE name = 'Pollo Burrito';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1562059390-a761a084768e?w=800&q=80' WHERE name = 'Barbacoa Burrito';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1573210893116-9817e7ca2ca4?w=800&q=80' WHERE name = 'Veggie Burrito';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1628557044797-f21d1d7ac3bf?w=800&q=80' WHERE name = 'California Burrito';

-- ============ QUESADILLAS ============
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80' WHERE name = 'Cheese Quesadilla';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1599789197514-47270cd526b4?w=800&q=80' WHERE name = 'Chicken Quesadilla';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1628260410022-804bd5a2c9e7?w=800&q=80' WHERE name = 'Steak Quesadilla';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1695007498893-8f87e38f52cc?w=800&q=80' WHERE name = 'Chorizo Quesadilla';

-- ============ BREAKFAST ============
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80' WHERE name = 'Breakfast Taco - Bacon';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80' WHERE name = 'Breakfast Taco - Chorizo';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80' WHERE name = 'Breakfast Taco - Potato';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1584208632869-05fa2b2a5934?w=800&q=80' WHERE name = 'Breakfast Burrito';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80' WHERE name = 'Breakfast Quesadilla';

-- ============ SIDES ============
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&q=80' WHERE name = 'Rice & Beans';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800&q=80' WHERE name ILIKE '%Chips & Salsa%' OR name ILIKE '%Chips and Salsa%';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80' WHERE name ILIKE '%Chips & Guac%' OR name ILIKE '%Chips and Guac%';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=800&q=80' WHERE name ILIKE '%Elote%' OR name ILIKE '%Street Corn%';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80' WHERE name = 'Extra Salsa';

-- ============ DRINKS ============
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=800&q=80' WHERE name = 'Horchata';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80' WHERE name = 'Jamaica';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80' WHERE name = 'Tamarindo';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?w=800&q=80' WHERE name = 'Mexican Coke';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800&q=80' WHERE name = 'Jarritos';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80' WHERE name = 'Bottled Water';

-- ============ SPECIALS ============
-- Update any specials items that may exist
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=800&q=80' WHERE category = 'specials' AND name ILIKE '%torta%';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&q=80' WHERE category = 'specials' AND name ILIKE '%alambre%';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=800&q=80' WHERE category = 'specials' AND name ILIKE '%enchilada%';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80' WHERE category = 'specials' AND name ILIKE '%hamburger%';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1630384060421-cb20aebe2a56?w=800&q=80' WHERE category = 'specials' AND name ILIKE '%quesabirria%';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&q=80' WHERE category = 'specials' AND name ILIKE '%papa%' OR name ILIKE '%fries%';

-- ============ KIDS ============
-- Update any kids menu items
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80' WHERE category = 'kids' AND name ILIKE '%cheeseburger%';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80' WHERE category = 'kids' AND name ILIKE '%quesadilla%';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1619881590738-a111d176d906?w=800&q=80' WHERE category = 'kids' AND name ILIKE '%corn dog%';

-- Fallback: Set a default image for any items that still have placeholder paths
UPDATE menu_items
SET image_url = 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80'
WHERE image_url LIKE '/images/%' OR image_url IS NULL;
