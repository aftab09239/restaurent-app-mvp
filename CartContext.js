import React, {createContext, useContext, useMemo, useReducer} from 'react';
import {cartReducer, initialCart} from '../reducers/cartReducer';
const CartContext = createContext(null);
export function CartProvider({children}) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const value = useMemo(() => ({cart, dispatch}), [cart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside CartProvider');
  return value;
}
