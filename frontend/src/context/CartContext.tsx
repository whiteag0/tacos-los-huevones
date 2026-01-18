'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect, useMemo, useCallback, useRef } from 'react';
import { CartItem, MenuItem, SelectedVariant } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Generate a unique cart item ID
function generateCartItemId(): string {
  return `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { menuItem: MenuItem; quantity?: number; specialInstructions?: string; selectedVariant?: SelectedVariant } }
  | { type: 'REMOVE_ITEM'; payload: string } // cartItemId
  | { type: 'UPDATE_QUANTITY'; payload: { cartItemId: string; quantity: number } }
  | { type: 'UPDATE_INSTRUCTIONS'; payload: { cartItemId: string; instructions: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (menuItem: MenuItem, quantity?: number, specialInstructions?: string, selectedVariant?: SelectedVariant) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateInstructions: (cartItemId: string, instructions: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { menuItem, quantity = 1, specialInstructions, selectedVariant } = action.payload;

      // Check if same item with same special instructions AND same variant already exists
      const existingIndex = state.items.findIndex(
        (item) =>
          item.menuItem.id === menuItem.id &&
          item.specialInstructions === specialInstructions &&
          item.selectedVariant?.id === selectedVariant?.id
      );

      if (existingIndex > -1) {
        // Update quantity of existing item
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity,
        };
        return { ...state, items: newItems };
      }

      // Add as new cart item with unique ID
      return {
        ...state,
        items: [
          ...state.items,
          {
            cartItemId: generateCartItemId(),
            menuItem,
            quantity,
            specialInstructions,
            selectedVariant,
          },
        ],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.cartItemId !== action.payload),
      };

    case 'UPDATE_QUANTITY': {
      const { cartItemId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        ),
      };
    }

    case 'UPDATE_INSTRUCTIONS': {
      const { cartItemId, instructions } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.cartItemId === cartItemId ? { ...item, specialInstructions: instructions } : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    case 'OPEN_CART':
      return { ...state, isOpen: true };

    case 'CLOSE_CART':
      return { ...state, isOpen: false };

    case 'LOAD_CART':
      // Ensure loaded items have cartItemId (for backwards compatibility with old localStorage)
      const itemsWithIds = action.payload.map(item => ({
        ...item,
        cartItemId: item.cartItemId || generateCartItemId(),
      }));
      return { ...state, items: itemsWithIds };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Ref for debounced localStorage save
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: items });
      } catch (e) {
        console.error('Failed to load cart from localStorage', e);
      }
    }
  }, []);

  // Debounced save cart to localStorage on change
  useEffect(() => {
    // Clear any pending save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce localStorage writes by 500ms
    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('cart', JSON.stringify(state.items));
    }, 500);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [state.items]);

  // Memoized action handlers to prevent unnecessary re-renders
  const addToCart = useCallback((menuItem: MenuItem, quantity = 1, specialInstructions?: string, selectedVariant?: SelectedVariant) => {
    dispatch({ type: 'ADD_ITEM', payload: { menuItem, quantity, specialInstructions, selectedVariant } });
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: cartItemId });
  }, []);

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartItemId, quantity } });
  }, []);

  const updateInstructions = useCallback((cartItemId: string, instructions: string) => {
    dispatch({ type: 'UPDATE_INSTRUCTIONS', payload: { cartItemId, instructions } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' });
  }, []);

  const openCart = useCallback(() => {
    dispatch({ type: 'OPEN_CART' });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' });
  }, []);

  // Memoize computed values to prevent recalculation on every render
  // Include variant price modifier in the calculation
  const subtotal = useMemo(() =>
    state.items.reduce((sum, item) => {
      const unitPrice = item.menuItem.price + (item.selectedVariant?.price_modifier || 0);
      return sum + unitPrice * item.quantity;
    }, 0),
    [state.items]
  );

  const itemCount = useMemo(() =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  // Memoize the entire context value to prevent unnecessary re-renders
  const contextValue = useMemo<CartContextValue>(() => ({
    state,
    dispatch,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateInstructions,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    subtotal,
    itemCount,
  }), [
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateInstructions,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    subtotal,
    itemCount,
  ]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
