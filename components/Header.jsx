

"use client";

import { useSelector } from "react-redux";
import { ShoppingBasket, Wheat } from "lucide-react";
import { selectCartCount, selectSubtotal } from "@/store/slices/cartSlice";
import { formatCurrency } from "@/lib/pricing";

export default function Header() {
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectSubtotal);

  return (
    <header className="app-header fixed top-0 left-0 right-0 z-50 border-b-2 border-indigo-100/50 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="app-header-container mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="app-brand flex items-center gap-3">
          <div className="app-brand-icon flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md shadow-amber-200/50">
            <Wheat size={20} strokeWidth={2} className="text-white" />
          </div>
          <div className="app-brand-text">
            <h1 className="font-serif text-2xl font-bold leading-none tracking-tight text-slate-800">
              Grain &amp; Grove
            </h1>
            <p className="mt-0.5 text-[11px] font-medium text-emerald-600">
              🌿 Farm to table, always
            </p>
          </div>
        </div>

        <a
          href="#basket"
          className="app-cart-btn group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 px-5 py-2.5 shadow-md shadow-indigo-100/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-200/50 hover:scale-105 active:scale-95"
        >
          <span className="app-cart-icon relative">
            <ShoppingBasket size={22} className="text-indigo-600 transition-colors group-hover:text-indigo-700" strokeWidth={2} />
            {count > 0 && (
              <span className="app-cart-badge absolute -right-2.5 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-1.5 text-[11px] font-bold text-white shadow-sm shadow-rose-200/50 ring-2 ring-white">
                {count}
              </span>
            )}
          </span>
          <span className="app-cart-total hidden text-sm font-semibold text-slate-700 sm:inline">
            {count === 0 ? (
              <span className="text-slate-400">🛒 Empty cart</span>
            ) : (
              <span className="text-indigo-700">{formatCurrency(subtotal)}</span>
            )}
          </span>
          <span className="app-cart-arrow hidden text-indigo-300 transition-transform group-hover:translate-x-1 sm:inline">
            →
          </span>
        </a>
      </div>
    </header>
  );
}