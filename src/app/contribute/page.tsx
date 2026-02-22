"use client";

import { useState } from "react";
import Link from "next/link";

interface ContributionForm {
  type: "brand" | "correction" | "barcode";
  brandName: string;
  parentCompany: string;
  barcode: string;
  category: string;
  details: string;
  source: string;
  email: string;
}

export default function ContributePage() {
  const [form, setForm] = useState<ContributionForm>({
    type: "brand",
    brandName: "",
    parentCompany: "",
    barcode: "",
    category: "",
    details: "",
    source: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [contributions, setContributions] = useState<ContributionForm[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store locally (in production this would go to a database)
    const stored = JSON.parse(localStorage.getItem("obe-contributions") || "[]");
    stored.push({ ...form, timestamp: new Date().toISOString() });
    localStorage.setItem("obe-contributions", JSON.stringify(stored));
    setContributions((prev) => [...prev, form]);
    setSubmitted(true);
    setForm({
      type: "brand",
      brandName: "",
      parentCompany: "",
      barcode: "",
      category: "",
      details: "",
      source: "",
      email: "",
    });
  };

  const update = (field: keyof ContributionForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24">
      <div className="py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-red-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      <h2 className="text-2xl font-black tracking-tight text-stone-900">
        Help us <span className="text-red-600">expose</span> more.
      </h2>
      <p className="mt-2 max-w-lg text-sm text-stone-500">
        This database is built by people like you. Report a missing brand,
        correct an error, or add a barcode. Every contribution makes the
        picture clearer.
      </p>

      {submitted && (
        <div className="mt-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-bold text-emerald-700">
            Thank you. Your contribution has been recorded.
          </p>
          <p className="mt-1 text-xs text-emerald-600">
            Contributions are stored locally for now. In a future update they&apos;ll
            sync to a shared database for community review.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-2 text-xs font-bold text-emerald-700 hover:underline"
          >
            Submit another &rarr;
          </button>
        </div>
      )}

      {!submitted && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Type */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
              What are you reporting?
            </label>
            <div className="mt-2 flex gap-2">
              {[
                { value: "brand", label: "New brand" },
                { value: "correction", label: "Correction" },
                { value: "barcode", label: "Barcode" },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => update("type", value)}
                  className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                    form.type === value
                      ? "bg-red-600 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Brand name */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Brand name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ribena, Horlicks, Frijj..."
              value={form.brandName}
              onChange={(e) => update("brandName", e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
            />
          </div>

          {/* Parent company */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Parent company (if known)
            </label>
            <input
              type="text"
              placeholder="e.g. Suntory, GSK, Müller..."
              value={form.parentCompany}
              onChange={(e) => update("parentCompany", e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
            />
          </div>

          {/* Barcode */}
          {(form.type === "barcode" || form.type === "brand") && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Barcode number (EAN-13)
              </label>
              <input
                type="text"
                placeholder="e.g. 5449000000996"
                value={form.barcode}
                onChange={(e) => update("barcode", e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-mono"
              />
            </div>
          )}

          {/* Category */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
            >
              <option value="">Select a category</option>
              {["Confectionery", "Beverages", "Coffee", "Snacks", "Cereal", "Food", "Dairy", "Dairy Alternatives", "Personal Care", "Household", "Baby Care", "Oral Care", "Health", "Pet Food", "Tea", "Clothing & Retail", "Ice Cream", "Biscuits", "Bakery", "Condiments"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Details */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Details / what should we know? *
            </label>
            <textarea
              required
              rows={3}
              placeholder={
                form.type === "correction"
                  ? "What's wrong and what's the correct information?"
                  : "Tell us about this brand, its ownership, any ethical issues..."
              }
              value={form.details}
              onChange={(e) => update("details", e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
            />
          </div>

          {/* Source */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Source (link or reference)
            </label>
            <input
              type="text"
              placeholder="URL, article, or reference..."
              value={form.source}
              onChange={(e) => update("source", e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Your email (optional — for follow-up)
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-red-600 py-3 text-sm font-bold text-white transition-all hover:bg-red-700 active:scale-[0.97]"
          >
            Submit contribution
          </button>
        </form>
      )}

      {/* Previous contributions */}
      {contributions.length > 0 && (
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Your contributions this session
          </p>
          <div className="mt-2 space-y-2">
            {contributions.map((c, i) => (
              <div
                key={i}
                className="rounded-lg border border-stone-200 bg-white px-4 py-3"
              >
                <p className="text-xs font-bold text-stone-900">
                  {c.brandName}
                  <span className="ml-2 rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-semibold text-stone-500">
                    {c.type}
                  </span>
                </p>
                <p className="mt-1 text-[11px] text-stone-500">
                  {c.details.slice(0, 100)}{c.details.length > 100 ? "..." : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
