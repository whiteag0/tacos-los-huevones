-- Fix Menu Images with ACCURATE food photos
-- Each image specifically matches the menu item

-- ============ BREAKFAST ============
-- Breakfast Quesadilla - folded tortilla with eggs and cheese
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80' WHERE name = 'Breakfast Quesadilla';

-- Huevos Rancheros - eggs on tortilla with salsa and beans
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=800&q=80' WHERE name = 'Huevos Rancheros';

-- Breakfast Tacos - tacos with eggs
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1629385701021-fcd568a743e8?w=800&q=80' WHERE name = 'Breakfast Tacos';

-- Breakfast Burrito - wrapped burrito
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80' WHERE name = 'Breakfast Burrito';

-- ============ TACOS ============
-- Taco de Asada - grilled steak taco
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800&q=80' WHERE name = 'Taco de Asada';

-- Taco de Pastor - marinated pork with pineapple
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1611250188496-e966043a0629?w=800&q=80' WHERE name = 'Taco de Pastor';

-- Taco de Barbacoa - shredded beef taco
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80' WHERE name = 'Taco de Barbacoa';

-- Taco de Carnitas - pulled pork taco
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=800&q=80' WHERE name = 'Taco de Carnitas';

-- Taco de Pollo - chicken taco
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80' WHERE name = 'Taco de Pollo';

-- Taco de Suadero - brisket taco
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800&q=80' WHERE name = 'Taco de Suadero';

-- Taco de Camaron - shrimp taco
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd?w=800&q=80' WHERE name = 'Taco de Camaron';

-- Taco Campechano - mixed meat taco
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80' WHERE name = 'Taco Campechano';

-- ============ BURRITOS ============
-- All burritos - wrapped flour tortilla
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80' WHERE name LIKE 'Burrito de%';

-- ============ QUESADILLAS ============
-- All quesadillas - grilled folded tortilla with cheese
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80' WHERE name LIKE 'Quesadilla de%';

-- ============ SPECIALS ============
-- Quesabirria - birria tacos with consomme
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1630384060421-cb20aebe2a56?w=800&q=80' WHERE name = 'Quesabirria';

-- Tacos Alambre - tacos with peppers and onions
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80' WHERE name = 'Tacos Alambre';

-- Tortas - Mexican sandwich
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=800&q=80' WHERE name LIKE 'Torta%';

-- Enchiladas Verdes - green enchiladas
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=800&q=80' WHERE name = 'Enchiladas Verdes';

-- Hamburguesa - Mexican burger
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80' WHERE name LIKE 'Hamburguesa%';

-- Papas Locas - loaded fries
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80' WHERE name = 'Papas Locas';

-- Fajita Burrito
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80' WHERE name = 'Fajita Burrito';

-- ============ KIDS ============
-- Kids Cheeseburger
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80' WHERE name = 'Kids Cheeseburger';

-- Kids Quesadilla
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80' WHERE name = 'Kids Quesadilla';

-- Kids Corn Dog
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1619881590738-a111d176d906?w=800&q=80' WHERE name = 'Kids Corn Dog';

-- ============ DRINKS ============
-- Horchata - white rice drink
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=800&q=80' WHERE name = 'Horchata';

-- Jamaica - red hibiscus drink
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=800&q=80' WHERE name = 'Jamaica';

-- Mexican Coke - glass bottle coke
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?w=800&q=80' WHERE name = 'Mexican Coke';

-- Jarritos - colorful Mexican soda
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800&q=80' WHERE name = 'Jarritos';

-- Bottled Water
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80' WHERE name = 'Bottled Water';

-- ============ FALLBACK ============
-- Set default taco image for any remaining items with placeholder paths
UPDATE menu_items
SET image_url = 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80'
WHERE image_url LIKE '/images/%' OR image_url IS NULL;
