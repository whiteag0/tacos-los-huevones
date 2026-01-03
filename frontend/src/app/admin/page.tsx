'use client';

import { useEffect, useState } from 'react';

interface Stats {
  today: {
    total_orders: number;
    completed_orders: number;
    total_revenue: number;
  };
  active: {
    pending: number;
    preparing: number;
    ready: number;
  };
  settings: {
    is_accepting_orders: boolean;
    estimated_wait_minutes: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [acceptingOrders, setAcceptingOrders] = useState(true);

  const fetchStats = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const apiKey = localStorage.getItem('adminApiKey');

      const res = await fetch(`${API_URL}/api/admin/stats`, {
        headers: { 'X-Admin-Key': apiKey || '' },
      });

      if (res.ok) {
        const data = await res.json();
        setStats(data);
        setAcceptingOrders(data.settings.is_accepting_orders);
      }
    } catch (error) {
      console.error('Failed to fetch stats', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const toggleAcceptingOrders = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const apiKey = localStorage.getItem('adminApiKey');

      const res = await fetch(`${API_URL}/api/admin/settings/toggle-orders?accepting=${!acceptingOrders}`, {
        method: 'POST',
        headers: { 'X-Admin-Key': apiKey || '' },
      });

      if (res.ok) {
        setAcceptingOrders(!acceptingOrders);
      }
    } catch (error) {
      console.error('Failed to toggle orders', error);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={toggleAcceptingOrders}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            acceptingOrders
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          {acceptingOrders ? '✓ Accepting Orders' : '✕ Orders Paused'}
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-gray-500 text-sm mb-1">Today&apos;s Orders</div>
          <div className="text-3xl font-bold">{stats?.today.total_orders || 0}</div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-gray-500 text-sm mb-1">Today&apos;s Revenue</div>
          <div className="text-3xl font-bold text-green-600">
            ${stats?.today.total_revenue.toFixed(2) || '0.00'}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-gray-500 text-sm mb-1">Completed Orders</div>
          <div className="text-3xl font-bold">{stats?.today.completed_orders || 0}</div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-gray-500 text-sm mb-1">Est. Wait Time</div>
          <div className="text-3xl font-bold">{stats?.settings.estimated_wait_minutes || 15} min</div>
        </div>
      </div>

      {/* Active Orders Summary */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Active Orders</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-blue-600 text-2xl font-bold">{stats?.active.pending || 0}</div>
            <div className="text-blue-600 text-sm">New (Paid)</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-orange-600 text-2xl font-bold">{stats?.active.preparing || 0}</div>
            <div className="text-orange-600 text-sm">Preparing</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-green-600 text-2xl font-bold">{stats?.active.ready || 0}</div>
            <div className="text-green-600 text-sm">Ready</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin/orders"
            className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center transition"
          >
            <span className="text-2xl block mb-2">📋</span>
            <span className="font-medium">View Orders</span>
          </a>
          <a
            href="/admin/menu"
            className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center transition"
          >
            <span className="text-2xl block mb-2">🍽️</span>
            <span className="font-medium">Edit Menu</span>
          </a>
          <a
            href="/admin/settings"
            className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center transition"
          >
            <span className="text-2xl block mb-2">⚙️</span>
            <span className="font-medium">Settings</span>
          </a>
          <button
            onClick={fetchStats}
            className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center transition"
          >
            <span className="text-2xl block mb-2">🔄</span>
            <span className="font-medium">Refresh Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
