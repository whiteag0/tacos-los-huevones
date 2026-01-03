'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Order, OrderStatus } from '@/types';

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: string }> = {
  pending: { label: 'Pending Payment', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
  paid: { label: 'Order Received', color: 'bg-blue-100 text-blue-800', icon: '✅' },
  preparing: { label: 'Being Prepared', color: 'bg-orange-100 text-orange-800', icon: '👨‍🍳' },
  ready: { label: 'Ready for Pickup!', color: 'bg-green-100 text-green-800', icon: '🎉' },
  completed: { label: 'Completed', color: 'bg-gray-100 text-gray-800', icon: '✔️' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: '❌' },
};

export default function OrderPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${API_URL}/api/orders/${orderId}`);

        if (!res.ok) {
          throw new Error('Order not found');
        }

        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    // Poll for status updates every 30 seconds if order is active
    const interval = setInterval(async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${API_URL}/api/orders/${orderId}/status`);
        if (res.ok) {
          const data = await res.json();
          setOrder((prev) => (prev ? { ...prev, status: data.status } : null));
        }
      } catch {
        // Ignore polling errors
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <span className="text-6xl block mb-4">😕</span>
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-8">{error || 'We couldn\'t find this order.'}</p>
        <Link
          href="/"
          className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  const status = statusConfig[order.status];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Status Banner */}
      {order.status === 'ready' && (
        <div className="bg-green-500 text-white p-6 rounded-xl mb-8 text-center animate-pulse">
          <span className="text-4xl block mb-2">🎉</span>
          <h2 className="text-2xl font-bold">Your Order is Ready!</h2>
          <p className="mt-2">Come pick it up at the truck</p>
        </div>
      )}

      {/* Order Confirmation */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="text-center mb-6">
          <span className="text-5xl block mb-4">{order.status === 'paid' || order.status === 'preparing' || order.status === 'ready' ? '🌮' : status.icon}</span>
          <h1 className="text-2xl font-bold">
            {order.status === 'pending' ? 'Awaiting Payment' : 'Order Confirmed!'}
          </h1>
          <p className="text-gray-600">Order #{order.id.slice(0, 8).toUpperCase()}</p>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          <span className={`${status.color} px-4 py-2 rounded-full font-medium flex items-center gap-2`}>
            <span>{status.icon}</span>
            {status.label}
          </span>
        </div>

        {/* Progress Tracker */}
        {order.status !== 'cancelled' && order.status !== 'pending' && (
          <div className="flex justify-between items-center mb-8 px-4">
            {['paid', 'preparing', 'ready'].map((step, index) => {
              const steps = ['paid', 'preparing', 'ready'];
              const currentIndex = steps.indexOf(order.status);
              const isComplete = index <= currentIndex;
              const isCurrent = step === order.status;

              return (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isComplete
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    } ${isCurrent ? 'ring-4 ring-green-200' : ''}`}
                  >
                    {isComplete ? '✓' : index + 1}
                  </div>
                  <span className={`text-sm mt-2 ${isComplete ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                    {step === 'paid' && 'Received'}
                    {step === 'preparing' && 'Preparing'}
                    {step === 'ready' && 'Ready'}
                  </span>
                  {index < 2 && (
                    <div
                      className={`h-0.5 w-full mt-5 absolute ${
                        index < currentIndex ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                      style={{ left: '50%', width: '100%' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Wait Time */}
        {(order.status === 'paid' || order.status === 'preparing') && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-center">
            <p className="text-yellow-800">
              <span className="font-bold">Estimated wait:</span> 15-20 minutes
            </p>
            <p className="text-yellow-700 text-sm mt-1">
              We&apos;ll text you when it&apos;s ready!
            </p>
          </div>
        )}

        {/* Order Details */}
        <div className="border-t pt-6">
          <h2 className="font-bold text-lg mb-4">Order Details</h2>

          <div className="space-y-3 mb-6">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <span className="font-medium">{item.quantity}x</span> {item.name}
                  {item.special_instructions && (
                    <p className="text-gray-500 text-sm italic ml-6">{item.special_instructions}</p>
                  )}
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-2 border-t">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        {order.special_instructions && (
          <div className="border-t mt-6 pt-6">
            <h3 className="font-bold mb-2">Special Instructions</h3>
            <p className="text-gray-600 italic">{order.special_instructions}</p>
          </div>
        )}

        {/* Customer Info */}
        <div className="border-t mt-6 pt-6">
          <h3 className="font-bold mb-2">Pickup Info</h3>
          <p className="text-gray-600">{order.customer_name}</p>
          <p className="text-gray-600">{order.customer_phone}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="text-center space-y-4">
        <Link
          href="/"
          className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition"
        >
          Order More
        </Link>

        <p className="text-gray-500 text-sm">
          Questions? Call us or visit the truck!
        </p>
      </div>
    </div>
  );
}
