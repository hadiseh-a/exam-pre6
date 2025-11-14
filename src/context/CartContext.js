'use client';
import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        const existing = state.items.find(item => item.id === action.payload.id);
        if (existing) {
          return {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item
            ),
          };
        }
        return { ...state, items: [...state.items, action.payload] };
      case 'REMOVE_ITEM':
        return { ...state, items: state.items.filter(item => item.id !== action.payload) };
      default:
        return state;
    }
  }, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}