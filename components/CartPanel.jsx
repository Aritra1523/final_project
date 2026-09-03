// "use client";

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Undo2, ShoppingBasket } from "lucide-react";
// import { toast } from "react-toastify";
// import {
//   clearCart,
//   selectCanUndo,
//   selectCartItems,
//   selectLastActionLabel,
//   selectSubtotal,
//   undoLast,
// } from "@/store/slices/cartSlice";
// import { computePricing, formatCurrency } from "@/lib/pricing";
// import CartItem from "./CartItem";
// import CouponBox from "./CouponBox";
// import DiscountProgress from "./DiscountProgress";

// export default function CartPanel() {
//   const dispatch = useDispatch();
//   const items = useSelector(selectCartItems);
//   const subtotal = useSelector(selectSubtotal);
//   const canUndo = useSelector(selectCanUndo);
//   const lastActionLabel = useSelector(selectLastActionLabel);
//   const appliedCoupon = useSelector((state) => state.cart.appliedCoupon);
//   const [checkedOut, setCheckedOut] = useState(false);

//   const pricing = computePricing(subtotal, appliedCoupon);

//   const handleUndo = () => {
//     if (lastActionLabel) {
//       toast.info(`Undone: ${lastActionLabel}`);
//     }
//     dispatch(undoLast());
//   };

//   const handleClear = () => {
//     dispatch(clearCart());
//     toast.info("Basket cleared");
//   };

//   const handleCheckout = () => {
//     setCheckedOut(true);
//     toast.success("Order is placed");
//   };

//   return (
//     <section id="basket" className="cart-panel-wrapper lg:sticky lg:top-28 lg:self-start">
//       <div className="cart-panel-container flex max-h-[calc(100vh-8rem)] flex-col rounded-3xl border-2 border-indigo-100/60 bg-gradient-to-br from-white to-indigo-50/30 shadow-xl shadow-indigo-100/40 backdrop-blur-sm">
        
//         {/* Header */}
//         <div className="cart-panel-header flex items-center justify-between border-b-2 border-indigo-100/60 px-6 py-5">
//           <div className="cart-panel-title flex items-center gap-3">
//             <div className="cart-panel-icon rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-2 shadow-md shadow-indigo-200/50">
//               <ShoppingBasket size={18} className="text-white" strokeWidth={2} />
//             </div>
//             <h2 className="cart-panel-heading font-serif text-xl font-bold text-slate-800">
//               Your Cart
//             </h2>
//             {items.length > 0 && (
//               <span className="cart-item-count ml-1 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-600">
//                 {items.length}
//               </span>
//             )}
//           </div>
//           <button
//             type="button"
//             disabled={!canUndo}
//             onClick={handleUndo}
//             title={lastActionLabel ? `Undo: ${lastActionLabel}` : "Nothing to undo"}
//             className="cart-undo-btn flex items-center gap-1.5 rounded-xl bg-white/80 px-3.5 py-2 text-xs font-semibold text-indigo-600 shadow-sm ring-1 ring-indigo-200/50 transition-all duration-200 enabled:hover:bg-indigo-50 enabled:hover:shadow-md enabled:hover:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:grayscale"
//           >
//             <Undo2 size={15} strokeWidth={2.5} />
//             Undo
//           </button>
//         </div>

//         {/* Empty State */}
//         {items.length === 0 ? (
//           <div className="cart-empty-state flex flex-1 flex-col items-center justify-center gap-2 px-6 py-16 text-center">
//             <div className="cart-empty-icon rounded-full bg-indigo-50 p-4">
//               <ShoppingBasket size={40} className="text-indigo-300" strokeWidth={1.5} />
//             </div>
//             <p className="cart-empty-title text-base font-semibold text-slate-700">
//               Your cart is empty
//             </p>
//             <p className="cart-empty-desc text-sm text-slate-400">
//               Browse our catalog and add items you love
//             </p>
//           </div>
//         ) : (
//           <div className="cart-items-scroll flex-1 divide-y divide-indigo-100/60 overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">
//             {items.map((item) => (
//               <CartItem key={item.id} item={item} />
//             ))}
//           </div>
//         )}

//         {/* Footer */}
//         <div className="cart-panel-footer space-y-4 rounded-b-3xl border-t-2 border-indigo-100/60 bg-gradient-to-b from-transparent to-indigo-50/30 px-6 py-5">
//           <DiscountProgress subtotal={subtotal} />

//           <CouponBox />

//           {/* Pricing Summary */}
//           <dl className="cart-pricing space-y-2 text-sm">
//             <div className="cart-subtotal flex justify-between text-slate-500">
//               <dt className="font-medium">Subtotal</dt>
//               <dd className="font-semibold text-slate-700">{formatCurrency(subtotal)}</dd>
//             </div>
//             {pricing.totalDiscount > 0 && (
//               <div className="cart-discount flex justify-between text-emerald-600">
//                 <dt className="font-medium">
//                   Savings
//                   {pricing.effectivePercent > 0 ? ` (${pricing.effectivePercent}% off)` : ""}
//                 </dt>
//                 <dd className="font-bold">-{formatCurrency(pricing.totalDiscount)}</dd>
//               </div>
//             )}
//             <div className="cart-total flex justify-between border-t-2 border-indigo-100/60 pt-3 text-base">
//               <dt className="font-bold text-slate-800">Total</dt>
//               <dd className="font-extrabold text-indigo-700">{formatCurrency(pricing.total)}</dd>
//             </div>
//           </dl>

//           {/* Action Buttons */}
//           <div className="cart-actions flex gap-3">
//             <button
//               type="button"
//               disabled={items.length === 0}
//               onClick={handleClear}
//               className="cart-clear-btn rounded-xl border-2 border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-500 transition-all duration-200 enabled:hover:border-rose-300 enabled:hover:bg-rose-50 enabled:hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-40"
//             >
//               Clear All
//             </button>
//             <button
//               type="button"
//               disabled={items.length === 0}
//               onClick={handleCheckout}
//               className="cart-checkout-btn flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200/50 transition-all duration-200 enabled:hover:shadow-lg enabled:hover:shadow-indigo-300/50 enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:grayscale"
//             >
//               🛒 Proceed to Checkout
//             </button>
//           </div>

//           {/* Checkout Notice */}
//           {checkedOut && (
//             <div className="cart-checkout-notice rounded-xl border-2 border-emerald-200/80 bg-emerald-50/80 px-4 py-3 text-center backdrop-blur-sm">
//               <p className="text-sm font-medium text-emerald-700">
//                 ✨ Demo — no real order was placed
//               </p>
//               <button 
//                 type="button" 
//                 className="cart-dismiss-btn mt-1 text-xs font-semibold text-emerald-500 underline underline-offset-2 transition hover:text-emerald-700"
//                 onClick={() => setCheckedOut(false)}
//               >
//                 Dismiss
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
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
    dispatch(clearCart());
    toast.info("Basket cleared");
  };

  const handleCheckout = () => {
    setCheckedOut(true);
    toast.success("Demo checkout complete — no real order was placed");
  };

  return (
    <section
      id="basket"
      className={isFullPage ? "cart-panel-wrapper" : "cart-panel-wrapper lg:sticky lg:top-28 lg:self-start"}
    >
      <div
        className={
          isFullPage
            ? "cart-panel-container flex flex-col rounded-3xl border-2 border-indigo-100/60 bg-gradient-to-br from-white to-indigo-50/30 shadow-xl shadow-indigo-100/40 backdrop-blur-sm"
            : "cart-panel-container flex max-h-[calc(100vh-8rem)] flex-col rounded-3xl border-2 border-indigo-100/60 bg-gradient-to-br from-white to-indigo-50/30 shadow-xl shadow-indigo-100/40 backdrop-blur-sm"
        }
      >
        
        {/* Header */}
        <div className="cart-panel-header flex items-center justify-between border-b-2 border-indigo-100/60 px-6 py-5">
          <div className="cart-panel-title flex items-center gap-3">
            <div className="cart-panel-icon rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-2 shadow-md shadow-indigo-200/50">
              <ShoppingBasket size={18} className="text-white" strokeWidth={2} />
            </div>
            <h2 className="cart-panel-heading font-serif text-xl font-bold text-slate-800">
              Your Cart
            </h2>
            {items.length > 0 && (
              <span className="cart-item-count ml-1 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-600">
                {items.length}
              </span>
            )}
          </div>
          <button
            type="button"
            disabled={!canUndo}
            onClick={handleUndo}
            title={lastActionLabel ? `Undo: ${lastActionLabel}` : "Nothing to undo"}
            className="cart-undo-btn flex items-center gap-1.5 rounded-xl bg-white/80 px-3.5 py-2 text-xs font-semibold text-indigo-600 shadow-sm ring-1 ring-indigo-200/50 transition-all duration-200 enabled:hover:bg-indigo-50 enabled:hover:shadow-md enabled:hover:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:grayscale"
          >
            <Undo2 size={15} strokeWidth={2.5} />
            Undo
          </button>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="cart-empty-state flex flex-1 flex-col items-center justify-center gap-2 px-6 py-16 text-center">
            <div className="cart-empty-icon rounded-full bg-indigo-50 p-4">
              <ShoppingBasket size={40} className="text-indigo-300" strokeWidth={1.5} />
            </div>
            <p className="cart-empty-title text-base font-semibold text-slate-700">
              Your cart is empty
            </p>
            <p className="cart-empty-desc text-sm text-slate-400">
              Browse our catalog and add items you love
            </p>
          </div>
        ) : (
          <div
            className={
              isFullPage
                ? "cart-items-scroll flex-1 divide-y divide-indigo-100/60 px-4 py-2"
                : "cart-items-scroll flex-1 divide-y divide-indigo-100/60 overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent"
            }
          >
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="cart-panel-footer space-y-4 rounded-b-3xl border-t-2 border-indigo-100/60 bg-gradient-to-b from-transparent to-indigo-50/30 px-6 py-5">
          <DiscountProgress subtotal={subtotal} />

          <CouponBox />

          {/* Pricing Summary */}
          <dl className="cart-pricing space-y-2 text-sm">
            <div className="cart-subtotal flex justify-between text-slate-500">
              <dt className="font-medium">Subtotal</dt>
              <dd className="font-semibold text-slate-700">{formatCurrency(subtotal)}</dd>
            </div>
            {pricing.totalDiscount > 0 && (
              <div className="cart-discount flex justify-between text-emerald-600">
                <dt className="font-medium">
                  Savings
                  {pricing.effectivePercent > 0 ? ` (${pricing.effectivePercent}% off)` : ""}
                </dt>
                <dd className="font-bold">-{formatCurrency(pricing.totalDiscount)}</dd>
              </div>
            )}
            <div className="cart-total flex justify-between border-t-2 border-indigo-100/60 pt-3 text-base">
              <dt className="font-bold text-slate-800">Total</dt>
              <dd className="font-extrabold text-indigo-700">{formatCurrency(pricing.total)}</dd>
            </div>
          </dl>

          {/* Action Buttons */}
          <div className="cart-actions flex gap-3">
            <button
              type="button"
              disabled={items.length === 0}
              onClick={handleClear}
              className="cart-clear-btn rounded-xl border-2 border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-500 transition-all duration-200 enabled:hover:border-rose-300 enabled:hover:bg-rose-50 enabled:hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear All
            </button>
            <button
              type="button"
              disabled={items.length === 0}
              onClick={handleCheckout}
              className="cart-checkout-btn flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200/50 transition-all duration-200 enabled:hover:shadow-lg enabled:hover:shadow-indigo-300/50 enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:grayscale"
            >
              🛒 Proceed to Checkout
            </button>
          </div>

          {/* Checkout Notice */}
          {checkedOut && (
            <div className="cart-checkout-notice rounded-xl border-2 border-emerald-200/80 bg-emerald-50/80 px-4 py-3 text-center backdrop-blur-sm">
              <p className="text-sm font-medium text-emerald-700">
                ✨ Demo — no real order was placed
              </p>
              <button 
                type="button" 
                className="cart-dismiss-btn mt-1 text-xs font-semibold text-emerald-500 underline underline-offset-2 transition hover:text-emerald-700"
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