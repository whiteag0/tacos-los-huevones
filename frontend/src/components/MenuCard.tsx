'use client';

import { useState } from 'react';
import { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  const { addToCart, openCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleAddToCart = () => {
    addToCart(item, quantity, specialInstructions || undefined);
    setShowModal(false);
    setQuantity(1);
    setSpecialInstructions('');
    openCart();
  };

  const handleQuickAdd = () => {
    addToCart(item, 1);
    openCart();
  };

  // Spicy level indicators
  const spicyIndicators = Array(3).fill(0).map((_, i) => (
    <span
      key={i}
      className={`text-lg ${i < item.spicy_level ? 'opacity-100' : 'opacity-20'}`}
    >
      🌶️
    </span>
  ));

  // Category emoji
  const categoryEmoji: Record<string, string> = {
    tacos: '🌮',
    burritos: '🌯',
    quesadillas: '🧀',
    breakfast: '🍳',
    sides: '🌽',
    drinks: '🥤',
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {categoryEmoji[item.category] || '🍽️'}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-2">
            {item.is_popular && (
              <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                ⭐ Popular
              </span>
            )}
            {item.is_vegetarian && (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                🌱 Veggie
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-2 right-2 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-700 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg">{item.name}</h3>
            <span className="text-red-600 font-bold text-lg">${item.price.toFixed(2)}</span>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

          <div className="flex items-center justify-between">
            {item.spicy_level > 0 && (
              <div className="flex">{spicyIndicators}</div>
            )}
            <button
              onClick={() => setShowModal(true)}
              className="text-red-600 hover:text-red-700 font-medium text-sm"
            >
              Customize →
            </button>
          </div>
        </div>
      </div>

      {/* Customization Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative h-40 bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  {categoryEmoji[item.category] || '🍽️'}
                </div>
              )}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold">{item.name}</h2>
                <span className="text-red-600 font-bold text-xl">${item.price.toFixed(2)}</span>
              </div>

              <p className="text-gray-600 mb-4">{item.description}</p>

              <div className="flex items-center gap-4 mb-4">
                {item.spicy_level > 0 && <div className="flex">{spicyIndicators}</div>}
                {item.is_vegetarian && (
                  <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded">
                    🌱 Vegetarian
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="block font-medium mb-2">Quantity</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="mb-6">
                <label className="block font-medium mb-2">Special Instructions</label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special requests? (allergies, no onions, extra salsa...)"
                  className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition"
              >
                Add to Cart - ${(item.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
