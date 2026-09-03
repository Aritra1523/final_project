

"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { ShoppingBasket, Wheat } from "lucide-react";
import { selectCartCount, selectSubtotal } from "@/store/slices/cartSlice";
import { formatCurrency } from "@/lib/pricing";

export default function Header() {
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectSubtotal);

  return (
    <header className="app-header fixed top-0 left-0 right-0 z-50 border-b border-line bg-surface/95 backdrop-blur-xl shadow-sm">
      <div className="app-header-container mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="app-brand flex items-center gap-3">
          <div className="app-brand-icon flex h-10 w-10 items-center justify-center rounded-2xl bg-primary shadow-sm">
            <Wheat size={20} strokeWidth={2} className="text-white" />
          </div>
          <div className="app-brand-text">
            <h1 className="font-serif text-2xl font-bold leading-none tracking-tight text-ink">
              Field &amp; Pantry
            </h1>
            <p className="mt-0.5 text-[11px] font-medium text-primary-dark">
              🌿 Farm to table, always
            </p>
          </div>
        </div>

        <Link
          href="/cart"
          className="app-cart-btn group flex items-center gap-3 rounded-2xl border border-line bg-bg px-5 py-2.5 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md active:scale-95"
        >
          <span className="app-cart-icon relative">
            <ShoppingBasket size={22} className="text-primary transition-colors group-hover:text-primary-dark" strokeWidth={2} />
            {count > 0 && (
              <span className="app-cart-badge absolute -right-2.5 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-white shadow-sm ring-2 ring-surface">
                {count}
              </span>
            )}
          </span>
          <span className="app-cart-total hidden text-sm font-semibold text-ink sm:inline">
            {count === 0 ? (
              <span className="text-ink-soft">🛒 Empty cart</span>
            ) : (
              <span className="text-primary-dark">{formatCurrency(subtotal)}</span>
            )}
          </span>
          <span className="app-cart-arrow hidden text-ink-soft transition-transform group-hover:translate-x-1 sm:inline">
            →
          </span>
        </Link>
      </div>
    </header>
  );
}