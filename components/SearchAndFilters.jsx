
// "use client";

// import { Search } from "lucide-react";

// export default function SearchAndFilters({
//   search,
//   onSearchChange,
//   categories,
//   category,
//   onCategoryChange,
//   sortBy,
//   onSortChange,
//   resultCount,
// }) {
//   return (
//     <aside className="search-filters-wrapper lg:sticky lg:top-28 lg:self-start">
//       <div className="search-filters-container rounded-3xl border-2 border-indigo-100/60 bg-gradient-to-br from-white to-indigo-50/30 p-6 shadow-xl shadow-indigo-100/40 backdrop-blur-sm">
        
//         {/* Search */}
//         <div className="search-field">
//           <label className="search-label block text-sm font-bold text-slate-700" htmlFor="search">
//             🔍 Find an item
//           </label>
//           <div className="search-input-wrapper relative mt-2.5">
//             <Search 
//               size={18} 
//               className="search-icon pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" 
//               strokeWidth={2.5} 
//             />
//             <input
//               id="search"
//               type="text"
//               value={search}
//               onChange={(e) => onSearchChange(e.target.value)}
//               placeholder="Try 'bread' or 'apples'..."
//               className="search-input w-full rounded-2xl border-2 border-slate-200/80 bg-white/80 py-2.5 pl-11 pr-4 text-sm font-medium text-slate-700 placeholder:text-slate-400/70 transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:shadow-md focus:shadow-indigo-100/50 focus:outline-none"
//             />
//           </div>
//         </div>

//         {/* Category */}
//         <div className="category-field mt-5">
//           <label className="category-label block text-sm font-bold text-slate-700" htmlFor="category">
//             📂 Category
//           </label>
//           <select
//             id="category"
//             value={category}
//             onChange={(e) => onCategoryChange(e.target.value)}
//             className="category-select mt-2.5 w-full rounded-2xl border-2 border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:shadow-md focus:shadow-indigo-100/50 focus:outline-none"
//           >
//             <option value="all">All categories</option>
//             {categories.map((c) => (
//               <option key={c} value={c}>
//                 {c.replace(/-/g, " ")}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Sort */}
//         <div className="sort-field mt-5">
//           <label className="sort-label block text-sm font-bold text-slate-700" htmlFor="sort">
//             ⚡ Sort by
//           </label>
//           <select
//             id="sort"
//             value={sortBy}
//             onChange={(e) => onSortChange(e.target.value)}
//             className="sort-select mt-2.5 w-full rounded-2xl border-2 border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:shadow-md focus:shadow-indigo-100/50 focus:outline-none"
//           >
//             <option value="default">✨ Featured</option>
//             <option value="price-asc">💰 Price: low to high</option>
//             <option value="price-desc">💰 Price: high to low</option>
//           </select>
//         </div>

//         {/* Results Count */}
//         <div className="results-count mt-6 flex items-center justify-between border-t-2 border-indigo-100/60 pt-4">
//           <p className="results-text text-sm font-semibold text-slate-600">
//             {resultCount} item{resultCount === 1 ? "" : "s"} found
//           </p>
//           <span className="results-badge rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-bold text-indigo-600">
//             {resultCount}
//           </span>
//         </div>
//       </div>
//     </aside>
//   );
// }

"use client";

import { Search } from "lucide-react";

export default function SearchAndFilters({
  search,
  onSearchChange,
  categories,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  resultCount,
}) {
  return (
    <div className="search-filters-wrapper w-full">
      <div className="search-filters-container flex flex-col gap-4 rounded-3xl border-2 border-indigo-100/60 bg-gradient-to-br from-white to-indigo-50/30 p-5 shadow-xl shadow-indigo-100/40 backdrop-blur-sm sm:flex-row sm:items-end sm:gap-4">

        {/* Search */}
        <div className="search-field flex-1">
          <label className="search-label block text-sm font-bold text-slate-700" htmlFor="search">
            🔍 Find an item
          </label>
          <div className="search-input-wrapper relative mt-2.5">
            <Search
              size={18}
              className="search-icon pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"
              strokeWidth={2.5}
            />
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Try 'bread' or 'apples'..."
              className="search-input w-full rounded-2xl border-2 border-slate-200/80 bg-white/80 py-2.5 pl-11 pr-4 text-sm font-medium text-slate-700 placeholder:text-slate-400/70 transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:shadow-md focus:shadow-indigo-100/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Category */}
        <div className="category-field sm:w-52">
          <label className="category-label block text-sm font-bold text-slate-700" htmlFor="category">
            📂 Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="category-select mt-2.5 w-full rounded-2xl border-2 border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:shadow-md focus:shadow-indigo-100/50 focus:outline-none"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.replace(/-/g, " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="sort-field sm:w-52">
          <label className="sort-label block text-sm font-bold text-slate-700" htmlFor="sort">
            ⚡ Sort by
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select mt-2.5 w-full rounded-2xl border-2 border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:shadow-md focus:shadow-indigo-100/50 focus:outline-none"
          >
            <option value="default">✨ Featured</option>
            <option value="price-asc">💰 Price: low to high</option>
            <option value="price-desc">💰 Price: high to low</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="results-count flex items-center justify-between gap-2 border-t-2 border-indigo-100/60 pt-4 sm:border-t-0 sm:pt-0">
          <span className="results-badge whitespace-nowrap rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-bold text-indigo-600">
            {resultCount} item{resultCount === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    </div>
  );
}