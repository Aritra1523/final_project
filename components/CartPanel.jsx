"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Undo2, ShoppingBasket } from "lucide-react";
import { toast } from "react-toastify";
import {
  clearCart,
  selectCanUndo,
  selectCartItems,
  selectLastActionLabel,
  selectSubtotal,
  undoLast,
} from "@/store/slices/cartSlice";
import { computePricing, formatCurrency } from "@/lib/pricing";
import CartItem from "./CartItem";
import CouponBox from "./CouponBox";
import DiscountProgress from "./DiscountProgress";
import Swal from "sweetalert2";

export default function CartPanel({ variant = "sidebar" }) {
  const isFullPage = variant === "fullPage";
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);
  const canUndo = useSelector(selectCanUndo);
  const lastActionLabel = useSelector(selectLastActionLabel);
  const appliedCoupon = useSelector((state) => state.cart.appliedCoupon);
  const [checkedOut, setCheckedOut] = useState(false);

  const pricing = computePricing(subtotal, appliedCoupon);

  const handleUndo = () => {
    if (lastActionLabel) {
      toast.info(`Undone: ${lastActionLabel}`);
    }
    dispatch(undoLast());
  };

  const handleClear = () => {
    const itemCount = items.length;
    const totalAmount = formatCurrency(subtotal);

    Swal.fire({
      title: "⚠️ Clear your basket?",
      html: `
        <div class="flex flex-col items-center gap-2">
          <div class="text-4xl">🗑️</div>
          <p class="text-sm text-gray-600">You're about to clear your basket with:</p>
          <div class="rounded-2xl bg-indigo-50/80 p-3 w-full">
            <p class="text-sm font-bold text-slate-700">${itemCount} item${itemCount > 1 ? "s" : ""}</p>
            <p class="text-xs font-medium text-indigo-600">Total: ${totalAmount}</p>
          </div>
          <p class="text-xs font-semibold text-rose-500">⚠️ This action cannot be undone.</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "🗑️ Clear all items",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: "#ffffff",
      customClass: {
        popup: "rounded-3xl shadow-2xl max-w-md",
        confirmButton: "rounded-2xl px-6 py-2.5 font-bold",
        cancelButton: "rounded-2xl px-6 py-2.5 font-medium",
        title: "text-xl font-bold text-slate-800",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        Swal.fire({
          icon: "success",
          title: "🧹 Basket cleared!",
          text: `All ${itemCount} item${itemCount > 1 ? "s" : ""} have been removed.`,
          timer: 2500,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
          background: "#ffffff",
          iconColor: "#8b5cf6",
          customClass: {
            popup: "rounded-2xl shadow-2xl",
          },
        });
      }
    });
  };

  const handleCheckout = () => {
    setCheckedOut(true);
    toast.success("Demo checkout complete — no real order was placed");
  };

  return (
    <section
      id="basket"
      className={`
        cart-panel-wrapper 
        ${isFullPage ? "" : "lg:sticky lg:top-28 lg:self-start"}
        w-full
      `}
    >
      <div
        className={`
          cart-panel-container 
          flex flex-col 
          rounded-2xl sm:rounded-3xl 
          border-2 border-indigo-100/60 
          bg-gradient-to-br from-white to-indigo-50/30 
          shadow-lg sm:shadow-xl shadow-indigo-100/40 
          backdrop-blur-sm
          ${isFullPage ? "" : "max-h-[calc(100vh-8rem)]"}
          w-full
        `}
      >
        {/* Header */}
        <div className="cart-panel-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 border-b-2 border-indigo-100/60 px-4 sm:px-6 py-4 sm:py-5">
          <div className="cart-panel-title flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="cart-panel-icon rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 sm:p-2 shadow-md shadow-indigo-200/50 flex-shrink-0">
              <ShoppingBasket
                size={16}
                className="text-white sm:text-[18px]"
                strokeWidth={2}
              />
            </div>
            <h2 className="cart-panel-heading font-serif text-lg sm:text-xl font-bold text-slate-800">
              Your Cart
            </h2>
            {items.length > 0 && (
              <span className="cart-item-count ml-1 rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-indigo-600">
                {items.length}
              </span>
            )}
          </div>
          <button
            type="button"
            disabled={!canUndo}
            onClick={handleUndo}
            title={
              lastActionLabel ? `Undo: ${lastActionLabel}` : "Nothing to undo"
            }
            className="
              cart-undo-btn 
              flex items-center gap-1.5 
              rounded-xl 
              bg-white/80 
              px-3 sm:px-3.5 
              py-1.5 sm:py-2 
              text-[10px] sm:text-xs 
              font-semibold 
              text-indigo-600 
              shadow-sm 
              ring-1 ring-indigo-200/50 
              transition-all duration-200 
              enabled:hover:bg-indigo-50 enabled:hover:shadow-md enabled:hover:ring-indigo-300 
              disabled:cursor-not-allowed disabled:opacity-40 disabled:grayscale
              w-full sm:w-auto
              justify-center
            "
          >
            <Undo2 size={13} className="sm:text-[15px]" strokeWidth={2.5} />
            Undo
          </button>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="cart-empty-state flex flex-1 flex-col items-center justify-center gap-2 px-4 sm:px-6 py-12 sm:py-16 text-center">
            <div className="cart-empty-icon rounded-full bg-indigo-50 p-3 sm:p-4">
              <ShoppingBasket
                size={32}
                className="text-indigo-300 sm:text-[40px]"
                strokeWidth={1.5}
              />
            </div>
            <p className="cart-empty-title text-sm sm:text-base font-semibold text-slate-700">
              Your cart is empty
            </p>
            <p className="cart-empty-desc text-xs sm:text-sm text-slate-400">
              Browse our catalog and add items you love
            </p>
          </div>
        ) : (
          <div
            className={`
              cart-items-scroll 
              flex-1 
              divide-y divide-indigo-100/60 
              px-3 sm:px-4 
              py-2
              ${isFullPage ? "" : "overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent"}
            `}
          >
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="cart-panel-footer space-y-3 sm:space-y-4 rounded-b-2xl sm:rounded-b-3xl border-t-2 border-indigo-100/60 bg-gradient-to-b from-transparent to-indigo-50/30 px-4 sm:px-6 py-4 sm:py-5">
          <DiscountProgress subtotal={subtotal} />

          <CouponBox />

          {/* Pricing Summary */}
          <dl className="cart-pricing space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <div className="cart-subtotal flex justify-between text-slate-500">
              <dt className="font-medium">Subtotal</dt>
              <dd className="font-semibold text-slate-700">
                {formatCurrency(subtotal)}
              </dd>
            </div>
            {pricing.totalDiscount > 0 && (
              <div className="cart-discount flex justify-between text-emerald-600">
                <dt className="font-medium">
                  Savings
                  {pricing.effectivePercent > 0
                    ? ` (${pricing.effectivePercent}% off)`
                    : ""}
                </dt>
                <dd className="font-bold">
                  -{formatCurrency(pricing.totalDiscount)}
                </dd>
              </div>
            )}
            <div className="cart-total flex justify-between border-t-2 border-indigo-100/60 pt-2 sm:pt-3 text-sm sm:text-base">
              <dt className="font-bold text-slate-800">Total</dt>
              <dd className="font-extrabold text-indigo-700">
                {formatCurrency(pricing.total)}
              </dd>
            </div>
          </dl>

          {/* Action Buttons */}
          <div className="cart-actions flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              type="button"
              disabled={items.length === 0}
              onClick={handleClear}
              className="
                cart-clear-btn 
                rounded-xl 
                border-2 border-slate-200 
                bg-white/80 
                px-4 py-2.5 
                text-sm font-semibold 
                text-slate-500 
                transition-all duration-200 
                enabled:hover:border-rose-300 enabled:hover:bg-rose-50 enabled:hover:text-rose-500 
                disabled:cursor-not-allowed disabled:opacity-40
                w-full sm:w-auto
                order-2 sm:order-1
              "
            >
              Clear All
            </button>
            <button
              type="button"
              disabled={items.length === 0}
              onClick={handleCheckout}
              className="
                cart-checkout-btn 
                flex-1 
                rounded-xl 
                bg-gradient-to-r from-indigo-600 to-purple-600 
                py-2.5 
                text-sm font-bold 
                text-white 
                shadow-md shadow-indigo-200/50 
                transition-all duration-200 
                enabled:hover:shadow-lg enabled:hover:shadow-indigo-300/50 enabled:hover:scale-[1.02] 
                disabled:cursor-not-allowed disabled:opacity-40 disabled:grayscale
                w-full
                order-1 sm:order-2
              "
            >
              🛒 Proceed to Checkout
            </button>
          </div>

          {/* Checkout Notice */}
          {checkedOut && (
            <div className="cart-checkout-notice rounded-xl border-2 border-emerald-200/80 bg-emerald-50/80 px-3 sm:px-4 py-2.5 sm:py-3 text-center backdrop-blur-sm">
              <p className="text-xs sm:text-sm font-medium text-emerald-700">
                ✨ Demo — no real order was placed
              </p>
              <button
                type="button"
                className="cart-dismiss-btn mt-1 text-[10px] sm:text-xs font-semibold text-emerald-500 underline underline-offset-2 transition hover:text-emerald-700"
                onClick={() => setCheckedOut(false)}
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
