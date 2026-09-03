
"use client";

import { useDispatch } from "react-redux";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { decrementQty, incrementQty, removeItem } from "@/store/slices/cartSlice";
import { formatCurrency } from "@/lib/pricing";
import Swal from 'sweetalert2';
export default function CartItem({ item }) {
  const dispatch = useDispatch();



const handleRemove = () => {
  Swal.fire({
    title: 'Remove item?',
    text: `Are you sure you want to remove "${item.title}" from your basket?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, remove it',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(removeItem(item.id));
      
      
      // Optional success toast after removal
      Swal.fire({
        title: 'Removed!',
        text: `"${item.title}" has been removed from your basket.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};

  return (
    <div className="cart-item-wrapper flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:bg-white hover:shadow-md">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.thumbnail}
        alt={item.title}
        className="cart-item-image h-20 w-20 shrink-0 rounded-2xl border-2 border-slate-100 object-cover transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-300"
      />

      <div className="cart-item-details min-w-0 flex-1">
        <p className="cart-item-title truncate text-base font-bold text-slate-800" title={item.title}>
          {item.title}
        </p>
        <div className="cart-item-pricing mt-1 flex items-center gap-2">
          <span className="cart-item-price text-lg font-extrabold text-violet-600">
            {formatCurrency(item.price)}
          </span>
          <span className="cart-item-per-unit text-xs font-medium text-slate-400">/ unit</span>
        </div>
      </div>

      <div className="cart-item-controls flex items-center gap-3">
        <div className="cart-item-quantity-group flex items-center gap-1 rounded-full bg-slate-200/70 px-1.5 py-1.5 backdrop-blur-sm transition-all hover:bg-slate-200">
          <button
            type="button"
            aria-label={`Decrease quantity of ${item.title}`}
            onClick={() => dispatch(decrementQty(item.id))}
            className="cart-item-qty-btn flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-all duration-200 hover:bg-violet-500 hover:text-white hover:shadow-violet-200 active:scale-90"
          >
            <Minus size={15} strokeWidth={2.5} />
          </button>
          <span className="cart-item-qty-number w-7 text-center text-base font-bold text-slate-700">
            {item.quantity}
          </span>
          <button
            type="button"
            aria-label={`Increase quantity of ${item.title}`}
            onClick={() => dispatch(incrementQty(item.id))}
            className="cart-item-qty-btn flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-all duration-200 hover:bg-violet-500 hover:text-white hover:shadow-violet-200 active:scale-90"
          >
            <Plus size={15} strokeWidth={2.5} />
          </button>
        </div>

        <button
          type="button"
          aria-label={`Remove ${item.title} from cart`}
          onClick={handleRemove}
          className="cart-item-remove-btn shrink-0 rounded-full bg-white p-2 text-slate-400 shadow-sm transition-all duration-200 hover:bg-rose-50 hover:text-rose-500 hover:shadow-rose-100 active:scale-90"
        >
          <Trash2 size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}