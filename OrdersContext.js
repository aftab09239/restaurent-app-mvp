import React, {createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initialOrdersState, ordersReducer} from '../reducers/ordersReducer';

const OrdersContext = createContext(null);
const STORAGE_KEY = '@restaurant_app_orders_v1';

export function OrdersProvider({children}) {
  const [state, dispatch] = useReducer(ordersReducer, initialOrdersState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (mounted && raw) dispatch({type: 'HYDRATE_ORDERS', orders: JSON.parse(raw)});
      } catch (error) {
        console.warn('Could not load saved orders', error);
      } finally {
        if (mounted) setHydrated(true);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.orders)).catch(error =>
      console.warn('Could not persist orders', error)
    );
  }, [state.orders, hydrated]);

  const createOrder = useCallback(order => dispatch({type: 'CREATE_ORDER', order}), []);
  const updateOrder = useCallback((id, changes) => dispatch({type: 'UPDATE_ORDER', id, changes}), []);
  const replaceOrders = useCallback(orders => dispatch({type: 'REPLACE_ORDERS', orders}), []);
  const clearOrders = useCallback(() => dispatch({type: 'CLEAR_ORDERS'}), []);

  const value = useMemo(() => ({
    orders: state.orders, createOrder, updateOrder, replaceOrders, clearOrders, hydrated
  }), [state.orders, createOrder, updateOrder, replaceOrders, clearOrders, hydrated]);

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const value = useContext(OrdersContext);
  if (!value) throw new Error('useOrders must be used inside OrdersProvider');
  return value;
}
