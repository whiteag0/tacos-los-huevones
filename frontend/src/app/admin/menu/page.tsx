'use client';

import { useEffect, useState } from 'react';
import { MenuItem, MenuCategory } from '@/types';

const categories: MenuCategory[] = ['tacos', 'burritos', 'quesadillas', 'breakfast', 'sides', 'drinks'];

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'tacos' as MenuCategory,
    is_available: true,
    is_popular: false,
    spicy_level: 0,
    is_vegetarian: false,
    image_url: '',
  });

  const fetchMenu = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/menu/all`);

      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch menu', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'tacos',
      is_available: true,
      is_popular: false,
      spicy_level: 0,
      is_vegetarian: false,
      image_url: '',
    });
  };

  const openCreate = () => {
    resetForm();
    setEditingItem(null);
    setIsCreating(true);
  };

  const openEdit = (item: MenuItem) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      is_available: item.is_available,
      is_popular: item.is_popular,
      spicy_level: item.spicy_level,
      is_vegetarian: item.is_vegetarian,
      image_url: item.image_url || '',
    });
    setEditingItem(item);
    setIsCreating(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const apiKey = localStorage.getItem('adminApiKey');

      const body = {
        ...formData,
        price: parseFloat(formData.price),
        image_url: formData.image_url || null,
      };

      let res;
      if (editingItem) {
        res = await fetch(`${API_URL}/api/admin/menu/${editingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Key': apiKey || '',
          },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch(`${API_URL}/api/admin/menu`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Key': apiKey || '',
          },
          body: JSON.stringify(body),
        });
      }

      if (res.ok) {
        fetchMenu();
        setIsCreating(false);
        resetForm();
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Failed to save item', error);
    }
  };

  const toggleAvailability = async (item: MenuItem) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const apiKey = localStorage.getItem('adminApiKey');

      const res = await fetch(
        `${API_URL}/api/admin/menu/${item.id}/availability?is_available=${!item.is_available}`,
        {
          method: 'PATCH',
          headers: { 'X-Admin-Key': apiKey || '' },
        }
      );

      if (res.ok) {
        fetchMenu();
      }
    } catch (error) {
      console.error('Failed to toggle availability', error);
    }
  };

  const deleteItem = async (item: MenuItem) => {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const apiKey = localStorage.getItem('adminApiKey');

      const res = await fetch(`${API_URL}/api/admin/menu/${item.id}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Key': apiKey || '' },
      });

      if (res.ok) {
        fetchMenu();
      }
    } catch (error) {
      console.error('Failed to delete item', error);
    }
  };

  // Group items by category
  const groupedItems = categories.reduce((acc, category) => {
    acc[category] = items.filter((item) => item.category === category);
    return acc;
  }, {} as Record<MenuCategory, MenuItem[]>);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <button
          onClick={openCreate}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition"
        >
          + Add Item
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-xl font-bold mb-4 capitalize flex items-center gap-2">
                {category === 'tacos' && '🌮'}
                {category === 'burritos' && '🌯'}
                {category === 'quesadillas' && '🧀'}
                {category === 'breakfast' && '🍳'}
                {category === 'sides' && '🌽'}
                {category === 'drinks' && '🥤'}
                {category}
                <span className="text-gray-400 text-sm font-normal">
                  ({groupedItems[category].length} items)
                </span>
              </h2>

              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">Item</th>
                      <th className="text-left px-4 py-3 font-medium">Price</th>
                      <th className="text-left px-4 py-3 font-medium">Status</th>
                      <th className="text-right px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedItems[category].map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-gray-500 text-sm line-clamp-1">{item.description}</p>
                              <div className="flex gap-2 mt-1">
                                {item.is_popular && (
                                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                                    Popular
                                  </span>
                                )}
                                {item.is_vegetarian && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                    Veggie
                                  </span>
                                )}
                                {item.spicy_level > 0 && (
                                  <span className="text-xs">
                                    {'🌶️'.repeat(item.spicy_level)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleAvailability(item)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              item.is_available
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {item.is_available ? 'Available' : 'Sold Out'}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => openEdit(item)}
                            className="text-blue-600 hover:text-blue-800 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteItem(item)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {groupedItems[category].length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                          No items in this category
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Description *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Price *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as MenuCategory })}
                      className="w-full border rounded-lg px-4 py-2"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">Spicy Level</label>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setFormData({ ...formData, spicy_level: level })}
                        className={`px-4 py-2 rounded-lg ${
                          formData.spicy_level === level
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        {level === 0 ? 'None' : '🌶️'.repeat(level)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_available}
                      onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                    />
                    Available
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_popular}
                      onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                    />
                    Popular
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_vegetarian}
                      onChange={(e) => setFormData({ ...formData, is_vegetarian: e.target.checked })}
                    />
                    Vegetarian
                  </label>
                </div>

                <div>
                  <label className="block font-medium mb-1">Image URL (optional)</label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      resetForm();
                      setEditingItem(null);
                    }}
                    className="flex-1 py-3 rounded-lg border hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition"
                  >
                    {editingItem ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
