"use client";

import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Star } from "lucide-react";
import { toast } from "react-toastify";
import { addItem, decrementQty, incrementQty, selectCartItems } from "@/store/slices/cartSlice";
import { formatCurrency } from "@/lib/pricing";
  import Swal from 'sweetalert2';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const inCart = items.find((i) => i.id === product.id);


const handleAdd = () => {
  dispatch(addItem(product));
  
  Swal.fire({
    icon: 'success',
    title: 'Added to Basket!',
    text: `"${product.title}" has been added to your basket.`,
    timer: 2000,
    showConfirmButton: false,
    position: 'top-end',
    toast: true,
    background: '#ffffff',
    iconColor: '#8b5cf6',
  });
};

  return (
    <div className="product-card group flex flex-col overflow-hidden rounded-3xl border-2 border-indigo-100/60 bg-gradient-to-br from-white to-indigo-50/30 shadow-md shadow-indigo-100/30 transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-300/80 hover:shadow-xl hover:shadow-indigo-200/40">
      
      {/* Image Container */}
      <div className="product-image-wrapper relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="product-image h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {typeof product.rating === "number" && (
          <span className="product-rating-badge absolute left-3 top-3 flex items-center gap-1.5 rounded-2xl bg-slate-900/80 px-2.5 py-1.5 text-[11px] font-bold text-white backdrop-blur-md ring-1 ring-white/20">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            {product.rating.toFixed(1)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="product-content flex flex-1 flex-col gap-2 p-4">
        <p className="product-category text-[10px] font-extrabold uppercase tracking-widest text-indigo-500/80">
          {product.category.replace(/-/g, " ")}
        </p>
        <h3 className="product-title line-clamp-2 text-sm font-bold text-slate-800 transition-colors group-hover:text-indigo-700" title={product.title}>
          {product.title}
        </h3>

        {/* Actions */}
        <div className="product-actions mt-auto flex flex-col gap-2 pt-3 border-t-2 border-indigo-100/40">
          <span className="product-price w-fit rounded-2xl bg-gradient-to-r from-indigo-100/80 to-purple-100/80 px-3.5 py-1.5 text-sm font-extrabold text-indigo-700 shadow-sm shadow-indigo-100/30">
            {formatCurrency(product.price)}
          </span>

          {!inCart ? (
            <button
              type="button"
              onClick={handleAdd}
              className="product-add-btn w-full whitespace-nowrap rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-300/50 hover:scale-105 active:scale-95"
            >
              Add to Cart
            </button>
          ) : (
            <div className="product-qty-controls flex w-full items-center justify-center gap-1.5 rounded-2xl border-2 border-indigo-200/60 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 px-1.5 py-1.5 shadow-sm shadow-indigo-100/30">
              <button
                type="button"
                aria-label={`Remove one ${product.title}`}
                onClick={() => dispatch(decrementQty(product.id))}
                className="product-qty-btn flex h-7 w-7 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm transition-all duration-200 hover:bg-indigo-600 hover:text-white hover:shadow-md hover:shadow-indigo-200/50 active:scale-90"
              >
                <Minus size={14} strokeWidth={2.5} />
              </button>
              <span className="product-qty-number w-6 text-center text-sm font-extrabold text-slate-700">
                {inCart.quantity}
              </span>
              <button
                type="button"
                aria-label={`Add one more ${product.title}`}
                onClick={() => dispatch(incrementQty(product.id))}
                className="product-qty-btn flex h-7 w-7 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm transition-all duration-200 hover:bg-indigo-600 hover:text-white hover:shadow-md hover:shadow-indigo-200/50 active:scale-90"
              >
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;