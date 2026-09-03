"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <section className="hero-section bg-[#FAF7F0]">
        <div className="hero-container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16 lg:px-8 lg:py-24">

          {/* Left Content */}
          <div className="hero-content max-w-xl">
            <h1 className="hero-title text-[2.75rem] font-normal leading-[1.08] tracking-tight text-[#1C1B18] sm:text-6xl">
              What's in stock, laid out plainly
            </h1>
            <p className="hero-description mt-4 max-w-sm text-base leading-relaxed text-[#5B5747]">
              No sales tricks, no clutter. Search, filter by category, sort by price — find what you came for.
            </p>
          </div>

          {/* Right: receipt-style tally */}
          <div className="hero-tally w-full max-w-[220px] border-t border-[#DDD3BE] pt-4 lg:w-[220px]">
            <div className="flex items-baseline justify-between py-2">
              <span className="text-sm text-[#5B5747]">Products</span>
              <span className="font-serif text-2xl text-[#1C1B18]">{products.length}</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-[#DDD3BE] py-2">
              <span className="text-sm text-[#5B5747]">Categories</span>
              <span className="font-serif text-2xl text-[#1C1B18]">{categories.length}</span>
            </div>
            <div className="mt-1 border-t border-[#3F5233]/30 pt-2 text-xs text-[#3F5233]">
              Restocked every morning
            </div>
          </div>
        </div>
      </section>

      <main id="catalog-top" className="mx-auto w-full max-w-7xl flex-1 scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
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
        </div>
      </main>

    </div>
  );
}