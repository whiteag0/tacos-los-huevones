'use client';

import { useEffect, useState } from 'react';
import { BusinessSettings, BusinessHours } from '@/types';

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function SettingsPage() {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const fetchSettings = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const apiKey = localStorage.getItem('adminApiKey');

      const res = await fetch(`${API_URL}/api/admin/settings`, {
        headers: { 'X-Admin-Key': apiKey || '' },
      });

      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch settings', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);
    setMessage('');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const apiKey = localStorage.getItem('adminApiKey');

      const res = await fetch(`${API_URL}/api/admin/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': apiKey || '',
        },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to save settings');
      }
    } catch (error) {
      console.error('Failed to save settings', error);
      setMessage('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const updateHours = (day: string, field: 'open_time' | 'close_time' | 'is_closed', value: string | boolean) => {
    if (!settings) return;

    const newHours = settings.hours.map((h) =>
      h.day === day ? { ...h, [field]: value } : h
    );

    setSettings({ ...settings, hours: newHours });
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!settings) {
    return <div>Failed to load settings</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="space-y-6">
        {/* Business Info */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Business Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Business Name</label>
              <input
                type="text"
                value={settings.business_name}
                onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={settings.phone || ''}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Address</label>
              <input
                type="text"
                value={settings.address || ''}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>
        </div>

        {/* Order Settings */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Order Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Tax Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={(settings.tax_rate * 100).toFixed(2)}
                onChange={(e) => setSettings({ ...settings, tax_rate: parseFloat(e.target.value) / 100 })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Estimated Wait (minutes)</label>
              <input
                type="number"
                value={settings.estimated_wait_minutes}
                onChange={(e) => setSettings({ ...settings, estimated_wait_minutes: parseInt(e.target.value) })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Minimum Order ($)</label>
              <input
                type="number"
                step="0.01"
                value={settings.minimum_order}
                onChange={(e) => setSettings({ ...settings, minimum_order: parseFloat(e.target.value) })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.is_accepting_orders}
                onChange={(e) => setSettings({ ...settings, is_accepting_orders: e.target.checked })}
                className="w-5 h-5"
              />
              <span className="font-medium">Accepting Orders</span>
            </label>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Business Hours</h2>

          <div className="space-y-3">
            {daysOfWeek.map((day) => {
              const hours = settings.hours.find((h) => h.day === day) || {
                day,
                open_time: '08:00',
                close_time: '19:00',
                is_closed: false,
              };

              return (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-28 font-medium capitalize">{day}</div>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hours.is_closed}
                      onChange={(e) => updateHours(day, 'is_closed', e.target.checked)}
                    />
                    Closed
                  </label>

                  {!hours.is_closed && (
                    <>
                      <input
                        type="time"
                        value={hours.open_time}
                        onChange={(e) => updateHours(day, 'open_time', e.target.value)}
                        className="border rounded-lg px-3 py-2"
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={hours.close_time}
                        onChange={(e) => updateHours(day, 'close_time', e.target.value)}
                        className="border rounded-lg px-3 py-2"
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
