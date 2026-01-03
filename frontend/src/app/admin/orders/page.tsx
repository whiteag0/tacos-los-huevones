'use client';

import { useEffect, useState } from 'react';
import { Order, OrderStatus } from '@/types';

const statusConfig: Record<OrderStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pending', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  paid: { label: 'New', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  preparing: { label: 'Preparing', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  ready: { label: 'Ready', color: 'text-green-700', bgColor: 'bg-green-100' },
  completed: { label: 'Completed', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  cancelled: { label: 'Cancelled', color: 'text-red-700', bgColor: 'bg-red-100' },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'active' | 'today' | 'recent'>('active');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const apiKey = localStorage.getItem('adminApiKey');

      let endpoint = '/api/admin/orders/active';
      if (filter === 'today') endpoint = '/api/admin/orders/today';
      if (filter === 'recent') endpoint = '/api/admin/orders/recent';

      const res = await fetch(`${API_URL}${endpoint}`, {
        headers: { 'X-Admin-Key': apiKey || '' },
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000); // Refresh every 15s
    return () => clearInterval(interval);
  }, [filter]);

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const apiKey = localStorage.getItem('adminApiKey');

      const res = await fetch(`${API_URL}/api/admin/orders/${orderId}/status?status=${status}`, {
        method: 'PATCH',
        headers: { 'X-Admin-Key': apiKey || '' },
      });

      if (res.ok) {
        fetchOrders();
        if (selectedOrder?.id === orderId) {
          const updated = await res.json();
          setSelectedOrder(updated);
        }
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex gap-6">
      {/* Orders List */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Orders</h1>
          <div className="flex gap-2">
            {(['active', 'today', 'recent'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === f
                    ? 'bg-red-600 text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <span className="text-6xl block mb-4">📋</span>
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status];
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-md transition ${
                    selectedOrder?.id === order.id ? 'ring-2 ring-red-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-bold">#{order.id.slice(0, 8).toUpperCase()}</span>
                      <span className="text-gray-500 ml-2">{formatTime(order.created_at)}</span>
                    </div>
                    <span className={`${status.bgColor} ${status.color} px-3 py-1 rounded-full text-sm font-medium`}>
                      {status.label}
                    </span>
                  </div>

                  <p className="font-medium">{order.customer_name}</p>
                  <p className="text-gray-500 text-sm">
                    {order.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')}
                  </p>

                  <div className="flex justify-between items-center mt-3 pt-3 border-t">
                    <span className="font-bold text-lg">${order.total.toFixed(2)}</span>

                    {order.status === 'paid' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(order.id, 'preparing');
                        }}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition"
                      >
                        Start Preparing
                      </button>
                    )}

                    {order.status === 'preparing' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(order.id, 'ready');
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition"
                      >
                        Mark Ready
                      </button>
                    )}

                    {order.status === 'ready' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(order.id, 'completed');
                        }}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Detail */}
      {selectedOrder && (
        <div className="w-96 bg-white rounded-xl shadow-lg p-6 sticky top-8 h-fit">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold">Order Details</h2>
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="mb-4">
            <span className="text-gray-500">Order ID</span>
            <p className="font-mono text-sm">{selectedOrder.id}</p>
          </div>

          <div className="mb-4">
            <span className="text-gray-500">Customer</span>
            <p className="font-medium">{selectedOrder.customer_name}</p>
            <p className="text-sm">{selectedOrder.customer_email}</p>
            <p className="text-sm">{selectedOrder.customer_phone}</p>
          </div>

          <div className="mb-4">
            <span className="text-gray-500">Items</span>
            <div className="mt-2 space-y-2">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>
                    {item.quantity}x {item.name}
                    {item.special_instructions && (
                      <span className="block text-sm text-gray-500 italic">
                        {item.special_instructions}
                      </span>
                    )}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {selectedOrder.special_instructions && (
            <div className="mb-4 bg-yellow-50 p-3 rounded-lg">
              <span className="text-gray-500 text-sm">Special Instructions</span>
              <p className="italic">{selectedOrder.special_instructions}</p>
            </div>
          )}

          <div className="border-t pt-4 space-y-1">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>${selectedOrder.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax</span>
              <span>${selectedOrder.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Total</span>
              <span>${selectedOrder.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <span className="text-gray-500 text-sm">Update Status</span>
            <div className="grid grid-cols-2 gap-2">
              {(['paid', 'preparing', 'ready', 'completed'] as OrderStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(selectedOrder.id, status)}
                  disabled={selectedOrder.status === status}
                  className={`py-2 rounded-lg text-sm font-medium transition ${
                    selectedOrder.status === status
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {statusConfig[status].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
