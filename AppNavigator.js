/*
  Navigation contract for Assignment 1.
  The working MVP currently uses a lightweight bottom-tab + nested-view navigator
  inside App.js so it can run with the supplied Expo dependency set without an
  additional navigation package. Route names mirror a React Navigation setup:
  CustomerTabs(Menu, Cart, Orders, Reserve, Profile) and nested OrderSummary.
  ManagerTabs(Dashboard, Profile).

  If the instructor requires the React Navigation package specifically, this route
  map is the integration point for @react-navigation/native and its tab/stack
  navigators.
*/
export const CUSTOMER_ROUTES = ['Menu','Cart','OrderSummary','Orders','Reserve','Profile'];
export const MANAGER_ROUTES = ['Dashboard','Profile'];
export const NAVIGATION_SCOPE = 'Bottom tabs with nested OrderSummary view';
