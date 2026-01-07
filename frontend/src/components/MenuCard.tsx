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
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    addToCart(item, quantity, specialInstructions || undefined);
    setShowModal(false);
    setQuantity(1);
    setSpecialInstructions('');
    openCart();
  };

  const handleQuickAdd = () => {
    setIsAdding(true);
    addToCart(item, 1);
    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 300);
  };

  // Spicy level indicators
  const spicyDots = Array(3).fill(0).map((_, i) => (
    <span
      key={i}
      className={`w-2 h-2 rounded-full ${i < item.spicy_level ? 'bg-red-500' : 'bg-gray-200'}`}
    />
  ));

  return (
    <>
      <div className="group bg-white rounded-2xl overflow-hidden card-hover border border-gray-100">
        {/* Image Container */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover img-zoom"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-red-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Price Badge */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-900 font-bold px-3 py-1.5 rounded-full shadow-lg text-sm">
            ${item.price.toFixed(2)}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {item.is_popular && (
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Popular
              </span>
            )}
            {item.is_vegetarian && (
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Veggie
              </span>
            )}
          </div>

          {/* Quick Add Button - always visible on mobile, hover-show on desktop */}
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className={`absolute bottom-3 right-3 bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 btn-press ${
              isAdding
                ? 'scale-110 bg-green-500'
                : 'opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:bg-red-700 active:scale-95 md:hover:scale-105'
            }`}
          >
            {isAdding ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 leading-tight">{item.name}</h3>
          </div>

          <p className="text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">{item.description}</p>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-3">
              {item.spicy_level > 0 && (
                <div className="flex items-center gap-1" title={`Spicy level: ${item.spicy_level}/3`}>
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"/>
                  </svg>
                  <div className="flex gap-0.5">{spicyDots}</div>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1 transition-colors"
            >
              Customize
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Customization Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="relative h-48 bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                    <svg className="w-12 h-12 text-red-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
              )}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

              <div className="flex items-center gap-3 mb-4">
                {item.spicy_level > 0 && (
                  <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-full">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"/>
                    </svg>
                    <div className="flex gap-0.5">{spicyDots}</div>
                  </div>
                )}
                {item.is_vegetarian && (
                  <span className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Vegetarian
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-medium transition-colors"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold w-10 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-medium transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Special Instructions</label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special requests? (allergies, no onions, extra salsa...)"
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-shadow"
                  rows={3}
                />
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-500/25 btn-press"
              >
                Add to Cart — ${(item.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
