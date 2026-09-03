"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import {
  applyCoupon,
  clearCoupon,
  selectAppliedCoupon,
  selectCouponInput,
  selectCouponMessage,
  setCouponInput,
} from "@/store/slices/cartSlice";

export default function CouponBox() {
  const dispatch = useDispatch();
  const couponInput = useSelector(selectCouponInput);
  const appliedCoupon = useSelector(selectAppliedCoupon);
  const message = useSelector(selectCouponMessage);
  const lastToasted = useRef(null);

  // Toast whenever a *new* coupon message shows up (skips the initial null).
  useEffect(() => {
    if (!message || message === lastToasted.current) return;
    lastToasted.current = message;
    if (message.type === "success") {
      toast.success(message.text);
    } else {
      toast.error(message.text);
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(applyCoupon());
  };

  return (
    <div className="coupon-box-wrapper">
      {appliedCoupon ? (
        <div className="coupon-active flex items-center justify-between rounded-2xl border-2 border-indigo-300/60 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 px-4 py-3 shadow-sm shadow-indigo-100/30">
          <div className="coupon-active-info flex items-center gap-3">
            <div className="coupon-active-badge rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-2.5 py-1">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                {appliedCoupon.code}
              </span>
            </div>
            <p className="coupon-active-label text-sm font-medium text-slate-700">
              {appliedCoupon.label}
            </p>
          </div>
          <button
            type="button"
            onClick={() => dispatch(clearCoupon())}
            aria-label="Remove coupon"
            className="coupon-remove-btn rounded-full bg-white/80 p-1.5 text-slate-400 shadow-sm transition-all duration-200 hover:bg-rose-50 hover:text-rose-500 hover:shadow-rose-100/50"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="coupon-form flex gap-2.5">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => dispatch(setCouponInput(e.target.value))}
            placeholder="Enter promo code"
            className="coupon-input min-w-0 flex-1 rounded-2xl border-2 border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm font-medium uppercase tracking-wider text-slate-700 placeholder:normal-case placeholder:text-slate-400/70 transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:shadow-md focus:shadow-indigo-100/50 focus:outline-none"
          />
          <button
            type="submit"
            className="coupon-apply-btn shrink-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-300/50 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!couponInput.trim()}
          >
            Apply
          </button>
        </form>
      )}

      {message && (
        <div className={`coupon-message mt-2.5 rounded-xl px-3.5 py-2 text-xs font-medium ${
          message.type === "success" 
            ? "border-2 border-emerald-200/80 bg-emerald-50/80 text-emerald-700" 
            : "border-2 border-rose-200/80 bg-rose-50/80 text-rose-600"
        }`}>
          <span className="flex items-center gap-1.5">
            {message.type === "success" ? "✅" : "⚠️"}
            {message.text}
          </span>
        </div>
      )}
    </div>
  );
}