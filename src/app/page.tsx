"use client";

import { useState } from "react";
import Link from "next/link";
import { ethicalAlternatives, brands, corporations } from "@/data/brands";
import AlternativeCard from "@/components/AlternativeCard";

export default function Home() {
  const [showExplore, setShowExplore] = useState(false);

  if (showExplore) {
    return <ExplorePage onBack={() => setShowExplore(false)} />;
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      {/* ═══ MANIFESTO HERO ═══ */}
      <section className="pb-8 pt-12 sm:pt-20">
        <h2 className="mt-4 text-3xl font-black leading-[1.15] tracking-tight text-stone-900 sm:text-5xl">
          The act of <span className="text-red-600">buying is a vote</span> for the kind of world you want to live in.
        </h2>
        <div className="mt-6 max-w-lg space-y-4 text-base leading-relaxed text-stone-600">
          <p>
            12 corporations own almost everything on your supermarket shelf.
            They spend billions making you believe you have a choice.
          </p>
          <p className="font-semibold text-stone-900">
            We&apos;re here to show you the humans behind the logos —
            and the alternatives that actually deserve your money.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/scan"
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-red-700 active:scale-[0.97]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M3 17v2a2 2 0 002 2h2M17 21h2a2 2 0 002-2v-2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10" />
            </svg>
            Scan a barcode
          </Link>
          <button
            onClick={() => setShowExplore(true)}
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-stone-300 px-6 py-3 text-sm font-bold text-stone-700 transition-all hover:border-stone-400 active:scale-[0.97]"
          >
            Search brands
          </button>
          <Link
            href="/contribute"
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-stone-300 px-6 py-3 text-sm font-bold text-stone-700 transition-all hover:border-stone-400 active:scale-[0.97]"
          >
            Contribute data
          </Link>
        </div>
      </section>

      {/* ═══ THE SWITCH — Alternatives Hero ═══ */}
      <section className="border-t border-stone-200 py-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
          The switch
        </p>
        <h3 className="mt-3 text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">
          Every purchase is a vote.
        </h3>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-stone-600">
          These companies are independently owned, worker-run, Fairtrade certified,
          or B Corp verified. They exist because people like you decided to switch.
          Here&apos;s where to find them.
        </p>

        {/* Alternatives by Category */}
        {["Confectionery", "Coffee", "Household", "Personal Care", "Tea", "Beverages", "Baby Care", "Oral Care", "Dairy Alternatives"].map((cat) => {
          const alts = ethicalAlternatives.filter((a) => a.category === cat);
          if (alts.length === 0) return null;
          return (
            <div key={cat} className="mt-6">
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-stone-400">
                {cat}
              </h4>
              <div className="flex flex-col gap-2">
                {alts.map((alt) => (
                  <AlternativeCard key={alt.slug} alt={alt} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* ═══ THE NUMBERS ═══ */}
      <section className="border-t border-stone-200 py-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
          The numbers
        </p>
        <h3 className="mt-3 text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">
          Follow the money.
        </h3>
        <p className="mt-3 max-w-lg text-sm text-stone-600">
          Three asset managers — BlackRock, Vanguard, and State Street — are
          the top shareholders in almost every corporation on this list.
          They manage over <strong className="text-stone-900">$20 trillion</strong> in assets.
          The same money. The same people. Everywhere you look.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-stone-200 bg-white p-4 text-center">
            <p className="text-2xl font-black text-red-600">{corporations.length}</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-stone-500">Corporations tracked</p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-4 text-center">
            <p className="text-2xl font-black text-red-600">{brands.length}</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-stone-500">Brands exposed</p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-4 text-center">
            <p className="text-2xl font-black text-emerald-600">{ethicalAlternatives.length}</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-stone-500">Alternatives</p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-4 text-center">
            <p className="text-2xl font-black text-stone-900">$1T+</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-stone-500">Combined revenue</p>
          </div>
        </div>

        {/* Quick list of corporations */}
        <div className="mt-6 flex flex-col gap-2">
          {corporations.slice(0, 6).map((corp) => {
            const topOwner = corp.owners.find((o) => o.type === "family" || o.type === "individual");
            return (
              <Link
                key={corp.slug}
                href={`/corporation/${corp.slug}`}
                className="group flex items-center justify-between rounded-lg border border-stone-200 bg-white px-4 py-3 transition-all hover:border-red-300"
              >
                <div>
                  <span className="text-sm font-bold text-stone-900">{corp.name}</span>
                  <span className="ml-2 text-xs text-stone-400">{corp.revenue}</span>
                </div>
                <div className="text-right text-xs text-stone-500">
                  {topOwner ? (
                    <span>{topOwner.name.split(" /")[0]} — {topOwner.ownershipPercent}%</span>
                  ) : (
                    <span>Institutional ownership</span>
                  )}
                </div>
              </Link>
            );
          })}
          <button
            onClick={() => setShowExplore(true)}
            className="mt-1 text-center text-xs font-semibold text-red-600 hover:underline"
          >
            View all {corporations.length} corporations &rarr;
          </button>
        </div>
      </section>

      {/* ═══ MANIFESTO FOOTER ═══ */}
      <section className="border-t border-stone-200 py-10">
        <blockquote className="text-lg font-bold italic leading-relaxed text-stone-700">
          &ldquo;The act of buying is a vote for the kind of world you want to live in.&rdquo;
        </blockquote>
        <p className="mt-6 text-xs text-stone-400">
          OwnedByEvil is open data. Ratings are based on publicly documented issues
          (lawsuits, regulatory actions, investigative journalism, NGO reports).
          Sources are cited per issue. This is not legal advice — it&apos;s a torch in a dark room.
        </p>
      </section>

      <footer className="border-t border-stone-200 py-6 text-center">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">
          Made by people who read the label
        </p>
      </footer>
    </div>
  );
}

// ═══ EXPLORE PAGE (search brands/corps) ═══

function ExplorePage({ onBack }: { onBack: () => void }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"brands" | "corporations">("brands");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { brands: allBrands, corporations: allCorps, categories } = (() => {
    const { searchAll, brands: allB, corporations: allC, categories: cats } = require("@/data/brands");
    if (query.trim()) {
      const results = searchAll(query.trim());
      return { brands: results.brands, corporations: results.corporations, categories: cats };
    }
    return {
      brands: selectedCategory === "All" ? allB : allB.filter((b: { category: string }) => b.category === selectedCategory),
      corporations: allC,
      categories: cats,
    };
  })();

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24">
      <div className="py-4">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-red-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      <h2 className="text-xl font-black text-stone-900">
        Search everything
      </h2>

      <div className="relative mt-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Brand, product, or corporation..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelectedCategory("All"); }}
          className="search-input w-full rounded-lg border border-stone-300 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400"
        />
      </div>

      {/* Tabs */}
      <div className="mt-4 flex gap-4 border-b border-stone-200">
        {(["brands", "corporations"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 pb-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              tab === t
                ? "border-red-600 text-red-600"
                : "border-transparent text-stone-400 hover:text-stone-600"
            }`}
          >
            {t} ({t === "brands" ? allBrands.length : allCorps.length})
          </button>
        ))}
      </div>

      {/* Category pills */}
      {tab === "brands" && !query && (
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-500 hover:bg-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      <div className="mt-4 flex flex-col gap-2">
        {tab === "brands" ? (
          allBrands.length === 0 ? (
            <p className="py-8 text-center text-sm text-stone-400">No brands found</p>
          ) : (
            allBrands.map((brand: typeof brands[0]) => {
              const BrandCard = require("@/components/BrandCard").default;
              return <BrandCard key={brand.slug} brand={brand} />;
            })
          )
        ) : allCorps.length === 0 ? (
          <p className="py-8 text-center text-sm text-stone-400">No corporations found</p>
        ) : (
          allCorps.map((corp: typeof corporations[0]) => {
            const CorporationCard = require("@/components/CorporationCard").default;
            return <CorporationCard key={corp.slug} corp={corp} />;
          })
        )}
      </div>
    </div>
  );
}
