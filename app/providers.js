"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStore, loadPersistedCart } from "@/store/store";
import { hydrateCart } from "@/store/slices/cartSlice";

export default function Providers({ children }) {
  const [store] = useState(() => makeStore());

  // Runs only on the client, after the first paint - safe to change state
  // here because hydration has already finished matching server output.
  useEffect(() => {
    const persisted = loadPersistedCart();
    if (persisted) {
      store.dispatch(hydrateCart(persisted));
    }
  }, [store]);

  return (
    <Provider store={store}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={2200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
}
