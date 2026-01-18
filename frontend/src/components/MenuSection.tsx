'use client';

import { MenuItem, MenuCategory } from '@/types';
import MenuCard from './MenuCard';

interface MenuSectionProps {
  category: MenuCategory;
  items: MenuItem[];
}

const categoryInfo: Record<MenuCategory, { title: string; description: string; icon: React.ReactNode }> = {
  platos_fuertes: {
    title: 'Platos Fuertes',
    description: 'Tacos, quesadillas, and more - our signature dishes',
    icon: (
      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
  breakfast: {
    title: 'Breakfast',
    description: 'Start your day the Mexican way',
    icon: (
      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    ),
  },
  tacos: {
    title: 'Tacos',
    description: 'Authentic street tacos on fresh corn tortillas',
    icon: (
      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
  quesadillas: {
    title: 'Quesadillas',
    description: 'Melty cheese perfection',
    icon: (
      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    ),
  },
  burritos: {
    title: 'Burritos',
    description: 'Packed with flavor, wrapped with love',
    icon: (
      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
      </svg>
    ),
  },
  specials: {
    title: 'Specials',
    description: 'House favorites and signature dishes',
    icon: (
      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ),
  },
  kids: {
    title: 'Kids Menu',
    description: 'Kid-friendly meals served with fries',
    icon: (
      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  sides: {
    title: 'Sides',
    description: 'Perfect accompaniments',
    icon: (
      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
      </svg>
    ),
  },
  drinks: {
    title: 'Drinks',
    description: 'Refreshing beverages',
    icon: (
      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
};

export default function MenuSection({ category, items }: MenuSectionProps) {
  const info = categoryInfo[category];

  if (items.length === 0) return null;

  return (
    <section id={category} className="py-8 sm:py-12 scroll-mt-20">
      <div className="mb-4 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-red-500/25">
            {info.icon}
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{info.title}</h2>
        </div>
        <p className="text-gray-500 text-sm sm:text-base ml-10 sm:ml-13">{info.description}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
          >
            <MenuCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
