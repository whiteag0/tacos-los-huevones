import { MenuItem, Order, BusinessSettings } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || 'An error occurred');
  }

  return res.json();
}

// Menu
export async function getMenu(): Promise<MenuItem[]> {
  return fetchAPI<MenuItem[]>('/api/menu/');
}

export async function getMenuByCategory(category: string): Promise<MenuItem[]> {
  return fetchAPI<MenuItem[]>(`/api/menu/category/${category}`);
}

// Orders
export async function createOrder(orderData: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: Array<{
    menu_item_id: string;
    name: string;
    quantity: number;
    price: number;
    special_instructions?: string;
  }>;
  special_instructions?: string;
}): Promise<Order> {
  return fetchAPI<Order>('/api/orders/', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

export async function getOrder(orderId: string): Promise<Order> {
  return fetchAPI<Order>(`/api/orders/${orderId}`);
}

export async function getOrderStatus(orderId: string): Promise<{ order_id: string; status: string; estimated_ready_time?: string }> {
  return fetchAPI(`/api/orders/${orderId}/status`);
}

// Payments
export async function createPaymentLink(orderId: string): Promise<{ payment_url: string; payment_link_id: string }> {
  return fetchAPI(`/api/payments/create-link/${orderId}`, {
    method: 'POST',
  });
}

export async function verifyPayment(orderId: string): Promise<{ order_id: string; status: string; paid: boolean; total: number }> {
  return fetchAPI(`/api/payments/verify/${orderId}`);
}

// Settings (for business hours display)
export async function getSettings(): Promise<BusinessSettings> {
  // This would typically be a public endpoint
  // For now, we'll use default settings if not available
  try {
    return fetchAPI<BusinessSettings>('/api/admin/settings');
  } catch {
    return {
      id: 'main',
      business_name: 'Tacos Los Huevones',
      tagline: 'Authentic Mexican Street Food',
      address: 'Parker, Colorado',
      hours: [
        { day: 'monday', open_time: '08:00', close_time: '19:00', is_closed: false },
        { day: 'tuesday', open_time: '08:00', close_time: '19:00', is_closed: false },
        { day: 'wednesday', open_time: '08:00', close_time: '19:00', is_closed: false },
        { day: 'thursday', open_time: '08:00', close_time: '19:00', is_closed: false },
        { day: 'friday', open_time: '08:00', close_time: '19:00', is_closed: false },
        { day: 'saturday', open_time: '08:00', close_time: '19:00', is_closed: false },
        { day: 'sunday', open_time: '08:00', close_time: '15:00', is_closed: false },
      ],
      is_accepting_orders: true,
      estimated_wait_minutes: 15,
      tax_rate: 0.08,
      minimum_order: 0,
    };
  }
}
