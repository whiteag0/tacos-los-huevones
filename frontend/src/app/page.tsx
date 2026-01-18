'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import { MenuItem, MenuCategory } from '@/types';
import { getMenu } from '@/lib/api';

const categories: MenuCategory[] = ['platos_fuertes', 'breakfast', 'specials', 'kids', 'drinks'];

// Fallback menu items in case API is unavailable
const fallbackMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Taco',
    description: 'Authentic street taco on a fresh corn tortilla with cilantro, onions, and salsa',
    price: 3.00,
    category: 'platos_fuertes',
    is_available: true,
    is_popular: true,
    spicy_level: 1,
    is_vegetarian: false,
    variants: {
      label: 'Choose your meat',
      required: true,
      options: [
        { id: 'pastor', name: 'Pastor', name_en: 'Al Pastor', price_modifier: 0 },
        { id: 'asada', name: 'Asada', name_en: 'Grilled Steak', price_modifier: 0 },
        { id: 'pollo', name: 'Pollo', name_en: 'Chicken', price_modifier: 0 },
      ]
    }
  },
  {
    id: '2',
    name: 'Quesadilla',
    description: 'Large flour tortilla with melted Oaxacan cheese and your choice of meat',
    price: 11.00,
    category: 'platos_fuertes',
    is_available: true,
    is_popular: true,
    spicy_level: 0,
    is_vegetarian: false,
    variants: {
      label: 'Choose your meat',
      required: true,
      options: [
        { id: 'pastor', name: 'Pastor', name_en: 'Al Pastor', price_modifier: 0 },
        { id: 'asada', name: 'Asada', name_en: 'Grilled Steak', price_modifier: 0 },
        { id: 'pollo', name: 'Pollo', name_en: 'Chicken', price_modifier: 0 },
      ]
    }
  },
  { id: '3', name: 'Breakfast Tacos', description: 'Two tacos with scrambled eggs, cheese, and choice of bacon or chorizo', price: 8.00, category: 'breakfast', is_available: true, is_popular: true, spicy_level: 1, is_vegetarian: false },
  { id: '4', name: 'Torta Mamalona', description: 'The ultimate Mexican sandwich loaded with meats, avocado, and more', price: 15.00, category: 'specials', is_available: true, is_popular: true, spicy_level: 1, is_vegetarian: false },
  { id: '5', name: 'Kids Quesadilla + Fries', description: 'Cheese quesadilla with a side of crispy fries', price: 8.00, category: 'kids', is_available: true, is_popular: false, spicy_level: 0, is_vegetarian: true },
  { id: '6', name: 'Horchata', description: 'Traditional Mexican rice drink with cinnamon and vanilla', price: 3.50, category: 'drinks', is_available: true, is_popular: true, spicy_level: 0, is_vegetarian: true },
];

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(fallbackMenuItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMenu() {
      try {
        const items = await getMenu();
        if (items && items.length > 0) {
          setMenuItems(items);
        }
        setError(null);
      } catch (err) {
        console.error('Failed to load menu from API, using fallback:', err);
        setError('Using cached menu - some items may not be available');
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

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

      {/* Loading/Error States */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="animate-pulse text-gray-500">Loading menu...</div>
        </div>
      )}

      {error && (
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-lg text-sm text-center">
            {error}
          </div>
        </div>
      )}

      {/* Menu Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categories.map((category) => (
          <MenuSection
            key={category}
            category={category}
            items={groupedItems[category] || []}
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
                From our famous barbacoa tacos to our loaded papas locas, every item is
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
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
              >
                <source src="/videos/about-bg.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Animated Text Overlays */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <p className="text-3xl md:text-4xl font-bold animate-slide-left animate-text-glow drop-shadow-lg">
                  Authentic Mexican Flavors
                </p>
                <p className="text-lg md:text-xl mt-3 animate-slide-up delay-300 text-white/90 font-medium tracking-wide">
                  Made Fresh Daily
                </p>
              </div>
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
