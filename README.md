# Restaurant App MVP — Assignment 1

**Fall 2026 · React Native / Expo · Frontend Only**

A complete academic Restaurant App MVP covering the customer and restaurant-manager workflows required by Assignment 1. The app uses mock/local data, React hooks, Context, reducers, custom hooks and AsyncStorage; no backend or external API is required.

## 1. Run the project

Requirements:
- Node.js LTS
- npm
- Expo Go or an Android/iOS emulator

```bash
cd restaurant-app-mvp
npm install
npx expo start
```

For web:

```bash
npx expo start --web
```

## 2. Mock credentials

| Role | Email | Password |
|---|---|---|
| Customer | `customer@example.com` | `Customer123` |
| Manager | `manager@example.com` | `Manager123` |

## 3. Customer flow

Login/Signup → Menu → Search/Category/Sort → Add to Cart → Promo → Choose Dine-in/Takeaway → Order Summary → Place Order → Order Tracking.

Customers can also reserve a table, view/cancel reservations, favourite menu items and switch between light/dark themes.

## 4. Manager flow

Manager Login → Dashboard → Incoming Orders / Reservations / Menu Management.

The manager can update order status, accept/decline reservations, toggle menu availability and edit menu prices. Menu changes are shared with the customer menu and persisted locally.

## 5. Hook coverage

| Hook / API | Usage |
|---|---|
| `useState` | Forms, filters, cart UI, reservations, manager controls |
| `useEffect` | Menu loading, AsyncStorage hydration/persistence, order timers |
| `useRef` | Search focus, FlatList scrolling, render counter, previous query |
| `useContext` | Auth, Theme, Cart and Orders shared state |
| `useReducer` | Cart and Orders state transitions |
| `useMemo` | Menu filtering/sorting and order totals |
| `useCallback` | Stable menu/theme/auth callbacks |
| `React.memo` | `MenuItemCard` optimization |
| `useForm` | Reusable form state/validation contract |
| `useDebounce` | 400 ms search debounce |
| `useReservation` | Reservation validation, table availability and creation |

## 6. Assignment structure

```text
restaurant-app-mvp/
├── A1/
│   ├── SRS.pdf
│   └── UML/
│       ├── use-case-diagram.png
│       ├── class-diagram.png
│       ├── sequence-diagram.png
│       ├── state-machine-diagram.png
│       └── component-diagram.png
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── navigation/
│   ├── reducers/
│   ├── screens/
│   └── theme/
├── docs/screenshots/
├── PROJECT_MEMORY/
├── App.js
├── app.json
├── package.json
└── README.md
```

## 6.1 Why Context is used

Context is appropriate for authentication, theme, cart and orders because these values are needed by multiple screens.
It avoids passing the same data through unrelated parent components.
A provider exposes a small, predictable API such as `user/login/logout` or `cart/dispatch`.
The Orders context also owns reducer-based order updates and persistence.
The main drawback is that consumers can re-render when a context value changes, so context should not be used for every small local state value.

## 7. Data model

Local datasets are provided for:
- Users
- Categories
- MenuItems
- Tables
- Reservations
- Orders
- PromoCodes

The app persists orders, reservations and manager menu edits with AsyncStorage.

## 8. Cart reducer test cases

See `src/reducers/CART_TEST_CASES.md`.

Covered actions:
`ADD_ITEM`, `REMOVE_ITEM`, `INCREMENT`, `DECREMENT`, `UPDATE_NOTE`, `CLEAR_CART`, `APPLY_PROMO`, `REMOVE_PROMO`.

The reducer is pure and returns new state objects instead of mutating the previous state.

## 9. Reservation rules

- Hourly slots: `12:00`–`22:00`
- Party size: 1–12
- Pakistani mobile: `03XX-XXXXXXX`
- Date cannot be in the past
- Booking must be at least one hour ahead
- A slot is disabled when no table has enough capacity
- Confirmation is shown before saving
- Existing reservations can be cancelled after confirmation

## 10. Order tracking

Demo lifecycle:

```text
Pending
   ↓ 10 sec
Preparing
   ↓ 10 sec
Ready
   ↓ 10 sec
Served
```

The tracking effect clears its interval during cleanup. Managers can also update order status manually.

## 11. Performance

The menu uses:
- `FlatList`
- 400 ms debounce
- `useMemo` for derived filtering/sorting
- `useCallback` for stable handlers
- `React.memo` for menu item cards
- `useRef` for non-rendering mutable values

Derived menu data is calculated rather than stored as duplicate state.

## 12. Scope

This is a frontend-only academic MVP. Real payment processing, backend APIs, production authentication, push notifications, production database services and external restaurant APIs are outside scope.

## 13. UML

Five required diagrams are included under `A1/UML/`:
1. Use Case
2. Class
3. Sequence
4. State Machine
5. Component

## 14. Evidence

Existing captured evidence is stored in `docs/screenshots/`. Before final university submission, replace/add screenshots from the final build if your instructor requires current-device evidence and add the final demo-video link to this README.

## 15. Git submission

Recommended meaningful commits:

```text
feat: implement authentication and menu browsing
feat: add search cart and reservation flows
feat: add order tracking and manager dashboard
docs: finalize SRS UML and README
```
