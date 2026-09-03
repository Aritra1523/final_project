import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productsReducer from "./slices/productsSlice";

export const CART_STORAGE_KEY = "grocery-app.cart.v1";

export function loadPersistedCart() {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    // Guard against malformed/old data shapes.
    if (!parsed || !Array.isArray(parsed.items)) return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

function persistCart(cartState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
  } catch {
    // Storage might be full or unavailable (private browsing, etc.) - ignore.
  }
}

export function makeStore() {
  // IMPORTANT: never read localStorage here. This runs during the very
  // first render on both the server and the client - if the client's
  // initial state differs (because localStorage has items) React throws a
  // hydration mismatch. The cart always starts empty here; it gets
  // "hydrated" from localStorage after mount instead (see Providers.js).
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer,
    },
  });

  if (typeof window !== "undefined") {
    let previousCart = store.getState().cart;
    store.subscribe(() => {
      const nextCart = store.getState().cart;
      if (nextCart !== previousCart) {
        previousCart = nextCart;
        persistCart(nextCart);
      }
    });
  }

  return store;
}
