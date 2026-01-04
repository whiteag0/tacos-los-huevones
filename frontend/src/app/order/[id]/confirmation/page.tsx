'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { verifyPayment } from '@/lib/api';
import { useCart } from '@/context/CartContext';

export default function ConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const { clearCart } = useCart();

  const [status, setStatus] = useState<'verifying' | 'success' | 'pending' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function checkPayment() {
      try {
        const result = await verifyPayment(orderId);

        if (result.paid) {
          setStatus('success');
          // Clear the cart after successful payment
          clearCart();
          // Redirect to order tracking after a brief delay
          setTimeout(() => {
            router.push(`/order/${orderId}`);
          }, 3000);
        } else {
          // Payment not yet confirmed - might be processing
          setStatus('pending');
          // Poll a few more times
          let attempts = 0;
          const pollInterval = setInterval(async () => {
            attempts++;
            try {
              const retryResult = await verifyPayment(orderId);
              if (retryResult.paid) {
                clearInterval(pollInterval);
                setStatus('success');
                clearCart();
                setTimeout(() => {
                  router.push(`/order/${orderId}`);
                }, 2000);
              } else if (attempts >= 5) {
                clearInterval(pollInterval);
                // After 5 attempts, just redirect to order page
                router.push(`/order/${orderId}`);
              }
            } catch {
              clearInterval(pollInterval);
              router.push(`/order/${orderId}`);
            }
          }, 2000);
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Failed to verify payment');
      }
    }

    checkPayment();
  }, [orderId, clearCart, router]);

  if (status === 'verifying') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <span className="text-6xl block mb-6">🌮</span>
          <h1 className="text-2xl font-bold mb-4">Verifying Payment...</h1>
          <p className="text-gray-600">Please wait while we confirm your order.</p>
          <div className="mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <span className="text-6xl block mb-6">⏳</span>
        <h1 className="text-2xl font-bold mb-4">Processing Payment...</h1>
        <p className="text-gray-600 mb-4">Your payment is being processed. This usually takes just a moment.</p>
        <div className="mt-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-green-50 rounded-2xl p-8 mb-8">
          <span className="text-6xl block mb-6">🎉</span>
          <h1 className="text-3xl font-bold text-green-800 mb-4">Payment Successful!</h1>
          <p className="text-green-700 text-lg mb-2">Thank you for your order!</p>
          <p className="text-green-600">Order #{orderId.slice(0, 8).toUpperCase()}</p>
        </div>

        <p className="text-gray-600 mb-8">
          Redirecting you to your order tracking page...
        </p>

        <div className="space-y-4">
          <Link
            href={`/order/${orderId}`}
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition"
          >
            View Order Status
          </Link>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Tip:</strong> We&apos;ll text you when your order is ready for pickup!
          </p>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <span className="text-6xl block mb-6">😕</span>
      <h1 className="text-2xl font-bold mb-4">Something Went Wrong</h1>
      <p className="text-gray-600 mb-4">{errorMessage || 'We couldn\'t verify your payment.'}</p>
      <p className="text-gray-500 text-sm mb-8">
        Don&apos;t worry - if your payment went through, your order is still being processed.
      </p>

      <div className="space-y-4">
        <Link
          href={`/order/${orderId}`}
          className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition"
        >
          Check Order Status
        </Link>
        <br />
        <Link
          href="/"
          className="inline-block text-gray-600 hover:text-gray-800 transition"
        >
          Return to Menu
        </Link>
      </div>
    </div>
  );
}
