export type MenuCategory = 'platos_fuertes' | 'tacos' | 'burritos' | 'quesadillas' | 'breakfast' | 'sides' | 'drinks' | 'specials' | 'kids';

export interface MenuVariantOption {
  id: string;
  name: string;      // Spanish name, e.g., "Pastor"
  name_en: string;   // English name, e.g., "Al Pastor"
  price_modifier: number;  // Additional cost for this option
}

export interface MenuVariants {
  label: string;     // e.g., "Choose your meat"
  required: boolean;
  options: MenuVariantOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image_url?: string;
  is_available: boolean;
  is_popular: boolean;
  spicy_level: number;
  is_vegetarian: boolean;
  variants?: MenuVariants;  // Optional variants for items like tacos/quesadillas
}

export interface SelectedVariant {
  id: string;
  name: string;      // Spanish name
  name_en: string;   // English name
  price_modifier: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  selectedVariant?: SelectedVariant;  // Selected variant for items with options
}

export interface OrderItem {
  menu_item_id: string;
  name: string;
  quantity: number;
  price: number;
  special_instructions?: string;
  selected_variant?: SelectedVariant;
}

export type OrderStatus = 'pending' | 'paid' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  payment_id?: string;
  estimated_ready_time?: string;
  special_instructions?: string;
  created_at: string;
}

export interface BusinessHours {
  day: string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
}

export interface BusinessSettings {
  id: string;
  business_name: string;
  tagline: string;
  phone?: string;
  email?: string;
  address?: string;
  hours: BusinessHours[];
  is_accepting_orders: boolean;
  estimated_wait_minutes: number;
  tax_rate: number;
  minimum_order: number;
  hero_image_url?: string;
  logo_url?: string;
}
