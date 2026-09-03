

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

function getPageNumbers(current, total) {
  // Always show first, last, current, and one neighbour on each side;
  // collapse the rest behind an ellipsis.
  const pages = new Set([1, total, current, current - 1, current + 1]);
  return Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Product pages" className="pagination-nav mt-10 flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="pagination-prev flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-slate-200/80 bg-white/80 text-slate-500 shadow-sm transition-all duration-200 enabled:hover:border-indigo-400 enabled:hover:bg-indigo-50 enabled:hover:text-indigo-600 enabled:hover:shadow-md enabled:hover:shadow-indigo-100/50 disabled:cursor-not-allowed disabled:opacity-40 disabled:grayscale"
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, idx) => {
        const prevPage = pageNumbers[idx - 1];
        const showEllipsis = prevPage && page - prevPage > 1;
        return (
          <span key={page} className="pagination-group flex items-center gap-2">
            {showEllipsis && (
              <span className="pagination-ellipsis flex h-10 w-10 items-center justify-center text-sm font-medium text-slate-400">
                …
              </span>
            )}
            <button
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`pagination-page flex h-10 min-w-10 items-center justify-center rounded-2xl px-3 text-sm font-bold transition-all duration-200 ${
                page === currentPage
                  ? "pagination-page-active bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200/50 scale-105"
                  : "pagination-page-inactive border-2 border-slate-200/80 bg-white/80 text-slate-600 shadow-sm hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md hover:shadow-indigo-100/50 hover:scale-105"
              }`}
            >
              {page}
            </button>
          </span>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="pagination-next flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-slate-200/80 bg-white/80 text-slate-500 shadow-sm transition-all duration-200 enabled:hover:border-indigo-400 enabled:hover:bg-indigo-50 enabled:hover:text-indigo-600 enabled:hover:shadow-md enabled:hover:shadow-indigo-100/50 disabled:cursor-not-allowed disabled:opacity-40 disabled:grayscale"
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>
    </nav>
  );
}