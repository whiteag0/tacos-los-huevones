'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartSlider() {
  const { state, closeCart, removeFromCart, updateQuantity, subtotal, itemCount } = useCart();

  if (!state.isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeCart}
      />

      {/* Slider */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Your Cart ({itemCount})</h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-4">
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🌮</span>
              <p className="text-gray-500">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add some delicious tacos!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.menuItem.id} className="flex items-start space-x-4 bg-gray-50 p-3 rounded-lg">
                  {/* Item Image Placeholder */}
                  <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-yellow-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {item.menuItem.category === 'tacos' && '🌮'}
                    {item.menuItem.category === 'burritos' && '🌯'}
                    {item.menuItem.category === 'quesadillas' && '🧀'}
                    {item.menuItem.category === 'breakfast' && '🍳'}
                    {item.menuItem.category === 'sides' && '🌽'}
                    {item.menuItem.category === 'drinks' && '🥤'}
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-medium">{item.menuItem.name}</h3>
                    <p className="text-red-600 font-bold">${item.menuItem.price.toFixed(2)}</p>
                    {item.specialInstructions && (
                      <p className="text-gray-500 text-sm italic mt-1">{item.specialInstructions}</p>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.menuItem.id)}
                        className="ml-auto text-gray-400 hover:text-red-600 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-sm">Tax calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-red-600 text-white text-center py-3 rounded-lg font-bold hover:bg-red-700 transition"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
