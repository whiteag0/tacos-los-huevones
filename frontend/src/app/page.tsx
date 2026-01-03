import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import { MenuItem, MenuCategory } from '@/types';

// For now, using static data. In production, this would fetch from the API
const menuItems: MenuItem[] = [
  // TACOS
  { id: '1', name: 'Carne Asada Taco', description: 'Grilled marinated steak with fresh cilantro, onions, and our homemade salsa verde', price: 4.50, category: 'tacos', is_available: true, is_popular: true, spicy_level: 1, is_vegetarian: false },
  { id: '2', name: 'Al Pastor Taco', description: 'Marinated pork with pineapple, cilantro, and onions on a fresh corn tortilla', price: 4.50, category: 'tacos', is_available: true, is_popular: true, spicy_level: 1, is_vegetarian: false },
  { id: '3', name: 'Pollo Taco', description: 'Seasoned grilled chicken with lettuce, cheese, and chipotle crema', price: 4.00, category: 'tacos', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: false },
  { id: '4', name: 'Barbacoa Taco', description: 'Slow-cooked shredded beef with cilantro, onions, and lime', price: 4.75, category: 'tacos', is_available: true, is_popular: true, spicy_level: 1, is_vegetarian: false },
  { id: '5', name: 'Carnitas Taco', description: 'Crispy pulled pork with pickled onions and fresh salsa', price: 4.50, category: 'tacos', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: false },
  { id: '6', name: 'Chorizo Taco', description: 'Spicy Mexican sausage with potatoes, cilantro, and onions', price: 4.25, category: 'tacos', is_available: true, is_popular: false, spicy_level: 2, is_vegetarian: false },
  { id: '7', name: 'Veggie Taco', description: 'Grilled bell peppers, onions, mushrooms, and zucchini with queso fresco', price: 3.75, category: 'tacos', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: true },
  { id: '8', name: 'Fish Taco', description: 'Beer-battered cod with cabbage slaw, chipotle mayo, and lime', price: 5.25, category: 'tacos', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: false },

  // BURRITOS
  { id: '9', name: 'Carne Asada Burrito', description: 'Grilled steak with rice, beans, cheese, sour cream, and pico de gallo', price: 12.50, category: 'burritos', is_available: true, is_popular: true, spicy_level: 1, is_vegetarian: false },
  { id: '10', name: 'Al Pastor Burrito', description: 'Marinated pork with rice, beans, pineapple, and fresh salsa', price: 12.50, category: 'burritos', is_available: true, is_popular: false, spicy_level: 1, is_vegetarian: false },
  { id: '11', name: 'Pollo Burrito', description: 'Grilled chicken with rice, beans, lettuce, cheese, and chipotle crema', price: 11.50, category: 'burritos', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: false },
  { id: '12', name: 'Barbacoa Burrito', description: 'Slow-cooked shredded beef with rice, beans, cheese, and salsa roja', price: 13.00, category: 'burritos', is_available: true, is_popular: true, spicy_level: 1, is_vegetarian: false },
  { id: '13', name: 'Veggie Burrito', description: 'Grilled vegetables with rice, beans, cheese, guacamole, and sour cream', price: 10.50, category: 'burritos', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: true },
  { id: '14', name: 'California Burrito', description: 'Carne asada with french fries, cheese, sour cream, and guacamole', price: 13.50, category: 'burritos', is_available: true, is_popular: true, spicy_level: 1, is_vegetarian: false },

  // QUESADILLAS
  { id: '15', name: 'Cheese Quesadilla', description: 'Melted Oaxacan cheese in a crispy flour tortilla with sour cream', price: 7.00, category: 'quesadillas', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: true },
  { id: '16', name: 'Chicken Quesadilla', description: 'Grilled chicken with melted cheese, peppers, and onions', price: 10.00, category: 'quesadillas', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: false },
  { id: '17', name: 'Steak Quesadilla', description: 'Carne asada with melted cheese, peppers, and onions', price: 11.00, category: 'quesadillas', is_available: true, is_popular: false, spicy_level: 1, is_vegetarian: false },
  { id: '18', name: 'Chorizo Quesadilla', description: 'Spicy chorizo with melted cheese and caramelized onions', price: 10.50, category: 'quesadillas', is_available: true, is_popular: false, spicy_level: 2, is_vegetarian: false },

  // BREAKFAST
  { id: '19', name: 'Breakfast Taco - Bacon', description: 'Scrambled eggs with crispy bacon, cheese, and salsa on a flour tortilla', price: 4.00, category: 'breakfast', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: false },
  { id: '20', name: 'Breakfast Taco - Chorizo', description: 'Scrambled eggs with spicy chorizo and cheese on a flour tortilla', price: 4.25, category: 'breakfast', is_available: true, is_popular: true, spicy_level: 2, is_vegetarian: false },
  { id: '21', name: 'Breakfast Taco - Potato', description: 'Scrambled eggs with crispy potatoes, cheese, and peppers', price: 3.75, category: 'breakfast', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: true },
  { id: '22', name: 'Breakfast Burrito', description: 'Scrambled eggs, choice of meat, potatoes, cheese, and salsa', price: 9.50, category: 'breakfast', is_available: true, is_popular: true, spicy_level: 1, is_vegetarian: false },
  { id: '23', name: 'Breakfast Quesadilla', description: 'Scrambled eggs with cheese, your choice of bacon or chorizo', price: 8.50, category: 'breakfast', is_available: true, is_popular: false, spicy_level: 1, is_vegetarian: false },

  // SIDES
  { id: '24', name: 'Rice & Beans', description: 'Spanish rice and refried beans with melted cheese', price: 4.00, category: 'sides', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: true },
  { id: '25', name: 'Chips & Salsa', description: 'Fresh tortilla chips with our homemade salsa verde and roja', price: 4.50, category: 'sides', is_available: true, is_popular: false, spicy_level: 1, is_vegetarian: true },
  { id: '26', name: 'Chips & Guacamole', description: 'Fresh tortilla chips with freshly made guacamole', price: 6.50, category: 'sides', is_available: true, is_popular: true, spicy_level: 0, is_vegetarian: true },
  { id: '27', name: 'Elote (Street Corn)', description: 'Grilled corn on the cob with mayo, cotija cheese, chili, and lime', price: 5.00, category: 'sides', is_available: true, is_popular: true, spicy_level: 1, is_vegetarian: true },
  { id: '28', name: 'Extra Salsa', description: 'Choose from mild, medium, or hot', price: 1.00, category: 'sides', is_available: true, is_popular: false, spicy_level: 2, is_vegetarian: true },

  // DRINKS
  { id: '29', name: 'Horchata', description: 'Traditional Mexican rice drink with cinnamon and vanilla', price: 3.50, category: 'drinks', is_available: true, is_popular: true, spicy_level: 0, is_vegetarian: true },
  { id: '30', name: 'Jamaica', description: 'Refreshing hibiscus flower tea, lightly sweetened', price: 3.50, category: 'drinks', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: true },
  { id: '31', name: 'Tamarindo', description: 'Sweet and tangy tamarind drink', price: 3.50, category: 'drinks', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: true },
  { id: '32', name: 'Mexican Coke', description: 'Made with real cane sugar', price: 3.00, category: 'drinks', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: true },
  { id: '33', name: 'Jarritos', description: 'Mexican fruit soda - ask for available flavors', price: 2.50, category: 'drinks', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: true },
  { id: '34', name: 'Bottled Water', description: 'Purified water', price: 2.00, category: 'drinks', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: true },
];

const categories: MenuCategory[] = ['tacos', 'burritos', 'quesadillas', 'breakfast', 'sides', 'drinks'];

export default function Home() {
  // Group items by category
  const groupedItems = categories.reduce((acc, category) => {
    acc[category] = menuItems.filter(item => item.category === category && item.is_available);
    return acc;
  }, {} as Record<MenuCategory, MenuItem[]>);

  return (
    <>
      <Hero />

      {/* Category Navigation */}
      <nav className="sticky top-16 bg-white/95 backdrop-blur-sm shadow-sm z-30 py-3">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex space-x-4 min-w-max">
            {categories.map((category) => (
              <a
                key={category}
                href={`#${category}`}
                className="px-4 py-2 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 transition font-medium capitalize whitespace-nowrap"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Menu Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categories.map((category) => (
          <MenuSection
            key={category}
            category={category}
            items={groupedItems[category]}
          />
        ))}
      </div>

      {/* About Section */}
      <section id="about" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">About Us</h2>
              <p className="text-gray-600 mb-4">
                Tacos Los Huevones brings authentic Mexican street food to Parker, Colorado.
                Our recipes have been passed down through generations, and we take pride in
                using fresh, quality ingredients to create the flavors of Mexico.
              </p>
              <p className="text-gray-600 mb-4">
                From our famous barbacoa tacos to our refreshing horchata, every item is
                made with love and served with a smile.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                  <span className="text-2xl">👨‍🍳</span>
                  <span className="ml-2 font-medium">Family Recipes</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                  <span className="text-2xl">🌿</span>
                  <span className="ml-2 font-medium">Fresh Ingredients</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                  <span className="text-2xl">❤️</span>
                  <span className="ml-2 font-medium">Made with Love</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100 rounded-2xl p-8 text-center">
              <span className="text-8xl block mb-4">🌮</span>
              <p className="text-xl font-bold text-gray-800">Authentic Mexican Flavors</p>
              <p className="text-gray-600">Since the beginning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Find Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-4">📍 Location</h3>
              <p className="text-gray-600 mb-2">Parker, Colorado</p>
              <p className="text-gray-600 mb-4">Near Stroh Soccer Park</p>

              <h3 className="font-bold text-xl mb-4 mt-6">⏰ Hours</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span className="font-medium">8:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">8:00 AM - 3:00 PM</span>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/5BrjnN7otVDnHYSi6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition"
              >
                Get Directions →
              </a>
            </div>

            <div className="bg-gray-200 rounded-xl overflow-hidden h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.8!2d-104.77!3d39.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c91011a2486db%3A0x716999691a214ee0!2sTacos%20Los%20Huevones!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
