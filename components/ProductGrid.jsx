


"use client";

import ProductCard from "./ProductCard";

function SkeletonCard() {
  return (
    <div className="skeleton-card animate-pulse overflow-hidden rounded-3xl border-2 border-indigo-100/60 bg-gradient-to-br from-white to-indigo-50/30 shadow-md shadow-indigo-100/30">
      <div className="skeleton-image aspect-[4/3] w-full bg-gradient-to-r from-indigo-100/60 to-purple-100/60" />
      <div className="skeleton-content space-y-3 p-4">
        <div className="skeleton-text-short h-3 w-3/4 rounded-full bg-gradient-to-r from-indigo-100/80 to-purple-100/80" />
        <div className="skeleton-text-medium h-3 w-1/2 rounded-full bg-gradient-to-r from-indigo-100/60 to-purple-100/60" />
        <div className="skeleton-text-long h-3 w-full rounded-full bg-gradient-to-r from-indigo-100/40 to-purple-100/40" />
        <div className="skeleton-button mt-3 h-9 w-full rounded-2xl bg-gradient-to-r from-indigo-100/50 to-purple-100/50" />
      </div>
    </div>
  );
}

export default function ProductGrid({ status, error, products, onRetry }) {
  if (status === "loading" || status === "idle") {
    return (
      <div className="product-grid-loading grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="product-grid-error flex flex-col items-center gap-4 rounded-3xl border-2 border-rose-200/60 bg-gradient-to-br from-rose-50/80 to-white p-12 text-center shadow-lg shadow-rose-100/30">
        <div className="product-error-icon text-5xl">😕</div>
        <p className="product-error-text text-sm font-medium text-slate-700">
          Couldn&apos;t load the catalog
        </p>
        <p className="product-error-detail text-xs text-slate-500">Error: {error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="product-retry-btn rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-300/50 hover:scale-105 active:scale-95"
        >
          🔄 Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-grid-empty rounded-3xl border-2 border-indigo-100/60 bg-gradient-to-br from-indigo-50/40 to-white p-12 text-center shadow-md shadow-indigo-100/30">
        <div className="product-empty-icon mb-3 text-4xl">🔍</div>
        <p className="product-empty-title text-base font-bold text-slate-700">
          No items found
        </p>
        <p className="product-empty-desc mt-1 text-sm text-slate-500">
          Try a different keyword or category
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}