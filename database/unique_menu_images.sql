-- 42 UNIQUE Menu Images - Every item has a different image
-- Each Unsplash photo ID is used only ONCE

-- ============ BREAKFAST (4 items) ============
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=800&q=80'
WHERE name = 'Huevos Rancheros';
-- Photo: Huevos rancheros with salsa

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1629385701021-fcd568a743e8?w=800&q=80'
WHERE name = 'Breakfast Tacos';
-- Photo: Breakfast tacos with eggs

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1584208632869-05fa2b2a5934?w=800&q=80'
WHERE name = 'Breakfast Burrito';
-- Photo: Wrapped breakfast burrito

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1599789197514-47270cd526b4?w=800&q=80'
WHERE name = 'Breakfast Quesadilla';
-- Photo: Grilled quesadilla

-- ============ TACOS (8 items) ============
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800&q=80'
WHERE name = 'Taco de Asada';
-- Photo: Carne asada taco

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1611250188496-e966043a0629?w=800&q=80'
WHERE name = 'Taco de Pastor';
-- Photo: Al pastor taco with pineapple

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80'
WHERE name = 'Taco de Barbacoa';
-- Photo: Shredded beef taco

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=800&q=80'
WHERE name = 'Taco de Carnitas';
-- Photo: Carnitas taco

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80'
WHERE name = 'Taco de Pollo';
-- Photo: Chicken taco

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80'
WHERE name = 'Taco de Suadero';
-- Photo: Brisket taco

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd?w=800&q=80'
WHERE name = 'Taco de Camaron';
-- Photo: Shrimp taco

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1604467715878-83e57e8bc129?w=800&q=80'
WHERE name = 'Taco Campechano';
-- Photo: Mixed meat taco

-- ============ BURRITOS (7 items) ============
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80'
WHERE name = 'Burrito de Asada';
-- Photo: Carne asada burrito

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?w=800&q=80'
WHERE name = 'Burrito de Pastor';
-- Photo: Al pastor burrito

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1562059390-a761a084768e?w=800&q=80'
WHERE name = 'Burrito de Barbacoa';
-- Photo: Barbacoa burrito

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800&q=80'
WHERE name = 'Burrito de Pollo';
-- Photo: Chicken burrito

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1573210893116-9817e7ca2ca4?w=800&q=80'
WHERE name = 'Burrito de Carnitas';
-- Photo: Carnitas burrito

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1628557044797-f21d1d7ac3bf?w=800&q=80'
WHERE name = 'Burrito de Suadero';
-- Photo: Suadero burrito

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=800&q=80'
WHERE name = 'Burrito de Camaron';
-- Photo: Shrimp burrito

-- ============ QUESADILLAS (6 items) ============
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80'
WHERE name = 'Quesadilla de Asada';
-- Photo: Steak quesadilla

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1628191139360-4083564d03fd?w=800&q=80'
WHERE name = 'Quesadilla de Pollo';
-- Photo: Chicken quesadilla

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1648679708242-61ab0881fd60?w=800&q=80'
WHERE name = 'Quesadilla de Pastor';
-- Photo: Pastor quesadilla

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1593759608136-45eb2ad9507d?w=800&q=80'
WHERE name = 'Quesadilla de Barbacoa';
-- Photo: Barbacoa quesadilla

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80'
WHERE name = 'Quesadilla de Suadero';
-- Photo: Cheese quesadilla

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1535473895227-bdecb20fb157?w=800&q=80'
WHERE name = 'Quesadilla de Camaron';
-- Photo: Seafood quesadilla

-- ============ SPECIALS (9 items) ============
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=800&q=80'
WHERE name = 'Enchiladas Verdes';
-- Photo: Green enchiladas

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1630384060421-cb20aebe2a56?w=800&q=80'
WHERE name = 'Quesabirria';
-- Photo: Birria tacos with consomme

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80'
WHERE name = 'Tacos Alambre';
-- Photo: Alambre tacos

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=800&q=80'
WHERE name = 'Torta Mamalona';
-- Photo: Large Mexican torta

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?w=800&q=80'
WHERE name = 'Torta de Carne Asada';
-- Photo: Steak torta

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80'
WHERE name = 'Hamburguesa';
-- Photo: Mexican hamburger

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=800&q=80'
WHERE name = 'Hamburguesa Hawaiana';
-- Photo: Hawaiian burger with pineapple

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80'
WHERE name = 'Papas Locas';
-- Photo: Loaded fries

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?w=800&q=80'
WHERE name = 'Fajita Burrito';
-- Photo: Fajita burrito

-- ============ KIDS (3 items) ============
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1619881590738-a111d176d906?w=800&q=80'
WHERE name = 'Kids Corn Dog';
-- Photo: Corn dog with fries

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80'
WHERE name = 'Kids Cheeseburger';
-- Photo: Kids cheeseburger

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1624300629308-ab7ba0ad5e36?w=800&q=80'
WHERE name = 'Kids Quesadilla';
-- Photo: Simple cheese quesadilla

-- ============ DRINKS (5 items) ============
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=800&q=80'
WHERE name = 'Horchata';
-- Photo: Horchata in glass

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=800&q=80'
WHERE name = 'Jamaica';
-- Photo: Hibiscus drink

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?w=800&q=80'
WHERE name = 'Mexican Coke';
-- Photo: Glass bottle Coca-Cola

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800&q=80'
WHERE name = 'Jarritos';
-- Photo: Jarritos soda bottle

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80'
WHERE name = 'Bottled Water';
-- Photo: Water bottle
