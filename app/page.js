"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Leaf } from "lucide-react";
import {
  loadProducts,
  selectCategories,
  selectProductError,
  selectProductItems,
  selectProductStatus,
} from "@/store/slices/productsSlice";
import Header from "@/components/Header";
import SearchAndFilters from "@/components/SearchAndFilters";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import CartPanel from "@/components/CartPanel";

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const dispatch = useDispatch();
  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);
  const products = useSelector(selectProductItems);
  const categories = useSelector(selectCategories);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  // Tracks the last filter combination we reset the page for - lets us
  // detect a filter change and reset synchronously during render, which
  // React recommends over calling setState inside an effect.
  const [lastFilterKey, setLastFilterKey] = useState(`${search}|${category}|${sortBy}`);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const filtered = useMemo(() => {
    let list = products;

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, category, search, sortBy]);

  const filterKey = `${search}|${category}|${sortBy}`;
  if (filterKey !== lastFilterKey) {
    setLastFilterKey(filterKey);
    setCurrentPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById("catalog-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <section className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-highlight/20 px-3 py-1 text-xs font-medium text-primary-dark">
              <Leaf size={12} />
              Restocked daily
            </span>
            <h1 className="mt-3 max-w-xl font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              This week&apos;s fresh picks
            </h1>
            <p className="mt-2 max-w-lg text-sm text-ink-soft">
              Search the shelves, build your basket, and watch the discount unlock as your total grows.
            </p>
          </div>
          <div className="flex gap-6 border-t border-line pt-4 lg:border-t-0 lg:pt-0">
            <div>
              <p className="font-serif text-2xl font-semibold text-primary-dark">{products.length}</p>
              <p className="text-xs text-ink-soft">items in stock</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-semibold text-primary-dark">{categories.length}</p>
              <p className="text-xs text-ink-soft">categories</p>
            </div>
          </div>
        </div>
      </section>

      <main id="catalog-top" className="mx-auto w-full max-w-7xl flex-1 scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr_320px]">
          <SearchAndFilters
            search={search}
            onSearchChange={setSearch}
            categories={categories}
            category={category}
            onCategoryChange={setCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            resultCount={filtered.length}
          />

          <div>
            <ProductGrid
              status={status}
              error={error}
              products={paginated}
              onRetry={() => dispatch(loadProducts())}
            />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>

          <CartPanel />
        </div>
      </main>

      <footer className="border-t border-line px-4 py-6 text-center text-xs text-ink-soft sm:px-6 lg:px-8">
        Try promo codes FRESH10, MEGA20 (min $100) or FLAT15 (min $40).
      </footer>
    </div>
  );
}
