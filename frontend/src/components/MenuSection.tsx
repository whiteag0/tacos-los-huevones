'use client';

import { MenuItem, MenuCategory } from '@/types';
import MenuCard from './MenuCard';

interface MenuSectionProps {
  category: MenuCategory;
  items: MenuItem[];
}

const categoryInfo: Record<MenuCategory, { title: string; emoji: string; description: string }> = {
  tacos: {
    title: 'Tacos',
    emoji: '🌮',
    description: 'Authentic street tacos on fresh corn tortillas',
  },
  burritos: {
    title: 'Burritos',
    emoji: '🌯',
    description: 'Packed with flavor, wrapped with love',
  },
  quesadillas: {
    title: 'Quesadillas',
    emoji: '🧀',
    description: 'Melty cheese perfection',
  },
  breakfast: {
    title: 'Breakfast',
    emoji: '🍳',
    description: 'Start your day the Mexican way',
  },
  sides: {
    title: 'Sides',
    emoji: '🌽',
    description: 'Perfect accompaniments',
  },
  drinks: {
    title: 'Drinks',
    emoji: '🥤',
    description: 'Refreshing beverages',
  },
};

export default function MenuSection({ category, items }: MenuSectionProps) {
  const info = categoryInfo[category];

  if (items.length === 0) return null;

  return (
    <section id={category} className="py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <span className="text-4xl">{info.emoji}</span>
          {info.title}
        </h2>
        <p className="text-gray-600 mt-1">{info.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
