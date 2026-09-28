export const initialOrdersState = {orders: []};

export function ordersReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE_ORDERS':
      return {orders: Array.isArray(action.orders) ? action.orders : []};
    case 'CREATE_ORDER':
      return {orders: [action.order, ...state.orders]};
    case 'UPDATE_ORDER':
      return {orders: state.orders.map(o => o.id === action.id ? {...o, ...action.changes} : o)};
    case 'REPLACE_ORDERS':
      return {orders: typeof action.orders === 'function' ? action.orders(state.orders) : action.orders};
    case 'CLEAR_ORDERS':
      return {orders: []};
    default:
      return state;
  }
}
