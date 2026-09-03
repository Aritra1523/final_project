"use client";

import { getNextTier, getTierDiscountPercent, formatCurrency } from "@/lib/pricing";

export default function DiscountProgress({ subtotal }) {
  const currentPercent = getTierDiscountPercent(subtotal);
  const next = getNextTier(subtotal);

  if (!next) {
    return (
      <div className="discount-maxed rounded-2xl border-2 border-emerald-200/80 bg-gradient-to-r from-emerald-50/90 to-teal-50/90 px-4 py-3 shadow-sm shadow-emerald-100/30">
        <p className="discount-maxed-text flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <span className="discount-maxed-icon text-lg">🎉</span>
          {currentPercent}% basket discount unlocked — nice haul!
        </p>
      </div>
    );
  }

  const progress = Math.min(100, Math.round((subtotal / next.threshold) * 100));
  const remaining = Math.max(0, next.threshold - subtotal);

  return (
    <div className="discount-progress-wrapper rounded-2xl border-2 border-indigo-100/60 bg-gradient-to-br from-white to-indigo-50/40 px-4 py-3.5 shadow-sm shadow-indigo-100/30">
      <p className="discount-progress-text text-xs font-medium text-slate-600 leading-relaxed">
        {subtotal === 0 ? (
          <span className="discount-empty-state">
            🚀 Spend <span className="font-bold text-indigo-600">{formatCurrency(next.threshold)}</span> to unlock <span className="font-bold text-indigo-600">{next.percent}% off</span>
          </span>
        ) : (
          <span className="discount-progress-active">
            💰 Add <span className="font-bold text-indigo-600">{formatCurrency(remaining)}</span> more to unlock <span className="font-bold text-indigo-600">{next.percent}% off</span>
            {currentPercent && (
              <span className="discount-current text-slate-400"> (up from {currentPercent}%)</span>
            )}
          </span>
        )}
      </p>
      <div className="discount-progress-bar mt-3 h-2 w-full overflow-hidden rounded-full bg-indigo-100/60">
        <div
          className="discount-progress-fill h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out shadow-sm shadow-indigo-300/30"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="discount-progress-meta mt-1.5 flex justify-between text-[10px] font-medium text-slate-400">
        <span>{subtotal === 0 ? "0%" : `${currentPercent}%`} current</span>
        <span>{progress}% towards {next.percent}%</span>
      </div>
    </div>
  );
}