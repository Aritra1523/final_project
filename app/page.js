// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Leaf } from "lucide-react";
// import {
//   loadProducts,
//   selectCategories,
//   selectProductError,
//   selectProductItems,
//   selectProductStatus,
// } from "@/store/slices/productsSlice";
// import Header from "@/components/Header";
// import SearchAndFilters from "@/components/SearchAndFilters";
// import ProductGrid from "@/components/ProductGrid";
// import Pagination from "@/components/Pagination";


// const ITEMS_PER_PAGE = 12;

// export default function Home() {
//   const dispatch = useDispatch();
//   const status = useSelector(selectProductStatus);
//   const error = useSelector(selectProductError);
//   const products = useSelector(selectProductItems);
//   const categories = useSelector(selectCategories);

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");
//   const [sortBy, setSortBy] = useState("default");
//   const [currentPage, setCurrentPage] = useState(1);
//   // Tracks the last filter combination we reset the page for - lets us
//   // detect a filter change and reset synchronously during render, which
//   // React recommends over calling setState inside an effect.
//   const [lastFilterKey, setLastFilterKey] = useState(`${search}|${category}|${sortBy}`);

//   useEffect(() => {
//     dispatch(loadProducts());
//   }, [dispatch]);

//   const filtered = useMemo(() => {
//     let list = products;

//     if (category !== "all") {
//       list = list.filter((p) => p.category === category);
//     }

//     if (search.trim()) {
//       const q = search.trim().toLowerCase();
//       list = list.filter((p) => p.title.toLowerCase().includes(q));
//     }

//     if (sortBy === "price-asc") {
//       list = [...list].sort((a, b) => a.price - b.price);
//     } else if (sortBy === "price-desc") {
//       list = [...list].sort((a, b) => b.price - a.price);
//     }

//     return list;
//   }, [products, category, search, sortBy]);

//   const filterKey = `${search}|${category}|${sortBy}`;
//   if (filterKey !== lastFilterKey) {
//     setLastFilterKey(filterKey);
//     setCurrentPage(1);
//   }

//   const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

//   const paginated = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filtered.slice(start, start + ITEMS_PER_PAGE);
//   }, [filtered, currentPage]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     document.getElementById("catalog-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Header />

//      <section className="hero-section border-b-2 border-indigo-100/60 bg-gradient-to-br from-indigo-50/90 via-white to-purple-50/60 backdrop-blur-sm">
//   <div className="hero-container mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-16">
    
//     {/* Left Content */}
//     <div className="hero-content">
//       <span className="hero-badge inline-flex items-center gap-2 rounded-2xl border-2 border-emerald-200/60 bg-gradient-to-r from-emerald-50/90 to-teal-50/90 px-4 py-1.5 text-xs font-extrabold text-emerald-700 shadow-sm shadow-emerald-100/30 backdrop-blur-sm">
//         <Leaf size={14} strokeWidth={2.5} className="text-emerald-500" />
//         Restocked Daily
//       </span>
//       <h1 className="hero-title mt-4 max-w-xl font-serif text-4xl font-bold leading-tight text-slate-800 sm:text-5xl lg:text-6xl">
//         This week's <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-size-200 animate-gradient">fresh picks</span>
//       </h1>
//       <p className="hero-description mt-3 max-w-lg text-sm font-medium leading-relaxed text-slate-600">
//         Search the shelves, build your basket, and watch the discount unlock as your total grows.
//       </p>
//     </div>

//     {/* Right Stats */}
//     <div className="hero-stats flex items-center gap-8 border-t-2 border-indigo-100/60 pt-5 lg:border-t-0 lg:pt-0">
//       <div className="hero-stat">
//         <p className="hero-stat-number font-serif text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent lg:text-4xl">
//           {products.length}
//         </p>
//         <p className="hero-stat-label mt-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
//           items in stock
//         </p>
//       </div>
      
//       <div className="hero-stat-divider hidden h-12 w-px bg-indigo-200/60 lg:block" />
      
//       <div className="hero-stat">
//         <p className="hero-stat-number font-serif text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent lg:text-4xl">
//           {categories.length}
//         </p>
//         <p className="hero-stat-label mt-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
//           categories
//         </p>
//       </div>
//     </div>
//   </div>
// </section>

//       <main id="catalog-top" className="mx-auto w-full max-w-7xl flex-1 scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8">
//         <div className="flex flex-col gap-6">
//           <SearchAndFilters
//             search={search}
//             onSearchChange={setSearch}
//             categories={categories}
//             category={category}
//             onCategoryChange={setCategory}
//             sortBy={sortBy}
//             onSortChange={setSortBy}
//             resultCount={filtered.length}
//           />

//           <div>
//             <ProductGrid
//               status={status}
//               error={error}
//               products={paginated}
//               onRetry={() => dispatch(loadProducts())}
//             />
//             <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//           </div>
//         </div>
//       </main>

     
//     </div>
//   );
// }
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