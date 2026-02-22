"use client";

import { useState, useMemo } from "react";
import { brands, corporations, categories, searchAll } from "@/data/brands";
import BrandCard from "@/components/BrandCard";
import CorporationCard from "@/components/CorporationCard";

type Tab = "brands" | "corporations";

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("brands");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const results = useMemo(() => {
    if (query.trim()) {
      return searchAll(query.trim());
    }
    return {
      brands: selectedCategory === "All"
        ? brands
        : brands.filter((b) => b.category === selectedCategory),
      corporations,
    };
  }, [query, selectedCategory]);

  const filteredBrands = results.brands;
  const filteredCorporations = results.corporations;

  return (
    <div className="mx-auto max-w-lg px-4 pb-24">
      {/* Hero Section */}
      <div className="pb-4 pt-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Who really owns<br />your favourite brands?
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Search any product to reveal its corporate parent and ethical track record
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            className="h-5 w-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search brands, products, or corporations..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedCategory("All");
          }}
          className="search-input w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
        <button
          onClick={() => setActiveTab("brands")}
          className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
            activeTab === "brands"
              ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          }`}
        >
          Brands ({filteredBrands.length})
        </button>
        <button
          onClick={() => setActiveTab("corporations")}
          className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
            activeTab === "corporations"
              ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          }`}
        >
          Corporations ({filteredCorporations.length})
        </button>
      </div>

      {/* Category filter - only show for brands tab when not searching */}
      {activeTab === "brands" && !query && (
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {activeTab === "brands" && (
        <div className="flex flex-col gap-2">
          {filteredBrands.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-4xl">🔍</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                No brands found for &ldquo;{query}&rdquo;
              </p>
            </div>
          ) : (
            filteredBrands.map((brand) => (
              <BrandCard key={brand.slug} brand={brand} />
            ))
          )}
        </div>
      )}

      {activeTab === "corporations" && (
        <div className="flex flex-col gap-2">
          {filteredCorporations.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-4xl">🔍</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                No corporations found for &ldquo;{query}&rdquo;
              </p>
            </div>
          ) : (
            filteredCorporations.map((corp) => (
              <CorporationCard key={corp.slug} corp={corp} />
            ))
          )}
        </div>
      )}

      {/* Rating Legend */}
      <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Rating Guide
        </h3>
        <div className="flex items-center justify-between gap-1">
          {(["A", "B", "C", "D", "E"] as const).map((rating) => {
            const colors = {
              A: "bg-emerald-500",
              B: "bg-green-500",
              C: "bg-amber-500",
              D: "bg-orange-500",
              E: "bg-red-500",
            };
            const labels = {
              A: "Excellent",
              B: "Good",
              C: "Mediocre",
              D: "Poor",
              E: "Very Poor",
            };
            return (
              <div key={rating} className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${colors[rating]}`}
                >
                  {rating}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {labels[rating]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 pb-8 text-center">
        <p className="text-[10px] text-slate-400 dark:text-slate-600">
          Data sourced from public records. Ratings are editorial assessments.
        </p>
      </footer>
    </div>
  );
}
