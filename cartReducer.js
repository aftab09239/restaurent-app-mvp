export const initialCart = {
  items: [],
  promoCode: null,
  discountPercent: 0,
  error: null,
};

export function cartReducer(state = initialCart, action) {
  const id = action.id ?? action.payload?.id;
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = action.item ?? action.payload;
      if (!item) return state;
      const existing = state.items.find(x => x.id === item.id);
      return {
        ...state,
        error: null,
        items: existing
          ? state.items.map(x => x.id === item.id ? {...x, quantity: x.quantity + 1} : x)
          : [...state.items, {...item, quantity: 1, note: item.note ?? ''}],
      };
    }
    case 'REMOVE_ITEM':
      return {...state, items: state.items.filter(x => x.id !== id)};
    case 'INCREMENT':
      return {...state, items: state.items.map(x => x.id === id ? {...x, quantity: x.quantity + 1} : x)};
    case 'DECREMENT':
      return {...state, items: state.items.flatMap(x => x.id === id ? (x.quantity > 1 ? [{...x, quantity: x.quantity - 1}] : []) : [x])};
    case 'UPDATE_NOTE':
      return {...state, items: state.items.map(x => x.id === id ? {...x, note: action.note ?? action.payload?.note ?? ''} : x)};
    case 'CLEAR_CART':
      return {...initialCart, items: []};
    case 'APPLY_PROMO': {
      const code = String(action.code ?? action.payload ?? '').trim().toUpperCase();
      const percent = action.discountPercent ?? action.payload?.percent;
      if (!percent) return {...state, error: 'Invalid promo code'};
      return {...state, promoCode: code, discountPercent: percent, error: null};
    }
    case 'REMOVE_PROMO':
      return {...state, promoCode: null, discountPercent: 0, error: null};
    default:
      return state;
  }
}
