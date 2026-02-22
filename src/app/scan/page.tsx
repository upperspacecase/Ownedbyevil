"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  lookupBarcode,
  getCorporation,
  getAlternativesForBrand,
  getRatingLabel,
  Brand,
} from "@/data/brands";
import {
  fetchProductByBarcode,
  OpenFoodFactsProduct,
} from "@/lib/api";
import { RatingCircle } from "@/components/RatingBadge";
import AlternativeCard from "@/components/AlternativeCard";
import OwnershipTree from "@/components/OwnershipTree";

type ScanState =
  | "idle"
  | "scanning"
  | "searching"
  | "found"
  | "found-external"
  | "not-found"
  | "manual";

export default function ScanPage() {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [scannedBrand, setScannedBrand] = useState<Brand | null>(null);
  const [externalProduct, setExternalProduct] =
    useState<OpenFoodFactsProduct | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const startScanning = useCallback(async () => {
    setScanState("scanning");
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      setCameraError(
        "Camera access denied or unavailable. Use manual entry below."
      );
      setScanState("manual");
    }
  }, []);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  /** Look up barcode: local first, then Open Food Facts */
  const doLookup = useCallback(
    async (code: string) => {
      // 1. Check local database
      const brand = lookupBarcode(code);
      if (brand) {
        setScannedBrand(brand);
        setExternalProduct(null);
        setScanState("found");
        stopCamera();
        return;
      }

      // 2. Try Open Food Facts API
      setScanState("searching");
      try {
        const product = await fetchProductByBarcode(code);
        if (product && (product.product_name || product.brands)) {
          setExternalProduct(product);
          setScannedBrand(null);
          setScanState("found-external");
          stopCamera();
        } else {
          setScanState("not-found");
        }
      } catch {
        setScanState("not-found");
      }
    },
    [stopCamera]
  );

  const handleManualLookup = () => {
    const code = manualCode.trim();
    if (!code) return;
    doLookup(code);
  };

  const handleSimulatedScan = (code: string) => {
    doLookup(code);
  };

  const reset = () => {
    setScanState("idle");
    setScannedBrand(null);
    setExternalProduct(null);
    setManualCode("");
    stopCamera();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24">
      {/* Back */}
      <div className="py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-red-600"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Link>
      </div>

      <h2 className="text-2xl font-black tracking-tight text-stone-900">
        Scan. Reveal. <span className="text-red-600">Switch.</span>
      </h2>
      <p className="mt-2 text-sm text-stone-500">
        Point your camera at any product barcode to reveal who really owns it.
      </p>

      {/* ═══ SCANNER AREA ═══ */}
      {(scanState === "idle" ||
        scanState === "scanning" ||
        scanState === "manual") && (
        <div className="mt-6">
          {scanState === "scanning" && (
            <div className="relative overflow-hidden rounded-xl bg-black">
              <video
                ref={videoRef}
                className="h-64 w-full object-cover"
                playsInline
                muted
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-52 rounded border-2 border-red-500/80" />
              </div>
              <div className="absolute bottom-3 left-0 right-0 text-center text-xs text-white/70">
                Position barcode inside the box
              </div>
            </div>
          )}

          {cameraError && (
            <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
              {cameraError}
            </div>
          )}

          {scanState === "idle" && (
            <div className="flex flex-col gap-3">
              <button
                onClick={startScanning}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-4 text-sm font-bold text-white transition-all hover:bg-red-700 active:scale-[0.97]"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M3 17v2a2 2 0 002 2h2M17 21h2a2 2 0 002-2v-2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 12h10"
                  />
                </svg>
                Open camera scanner
              </button>
              <button
                onClick={() => setScanState("manual")}
                className="text-xs font-semibold text-stone-500 hover:text-red-600"
              >
                Or enter a barcode manually
              </button>
            </div>
          )}

          {/* Manual entry */}
          {(scanState === "manual" || scanState === "scanning") && (
            <div className="mt-4 rounded-xl border border-stone-200 bg-white p-4">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Enter barcode number
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. 5449000000996"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleManualLookup()}
                  className="search-input flex-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-mono"
                />
                <button
                  onClick={handleManualLookup}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                >
                  Look up
                </button>
              </div>
            </div>
          )}

          {/* Demo barcodes */}
          <div className="mt-4 rounded-xl border border-stone-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Try a demo scan
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { code: "5449000000996", label: "Coca-Cola" },
                { code: "7613036271134", label: "KitKat" },
                { code: "5000159459228", label: "Mars Bar" },
                { code: "7622210713780", label: "Cadbury" },
                { code: "8712561650786", label: "Dove" },
                { code: "5010453000052", label: "Dettol" },
              ].map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => handleSimulatedScan(code)}
                  className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-600 transition-all hover:border-red-300 hover:text-red-600"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ SEARCHING (Open Food Facts) ═══ */}
      {scanState === "searching" && (
        <div className="mt-6 rounded-xl border border-stone-200 bg-white p-6 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-red-200 border-t-red-500" />
          <p className="mt-3 text-sm font-bold text-stone-700">
            Searching Open Food Facts...
          </p>
          <p className="mt-1 text-xs text-stone-400">
            Not in our local database — checking the global open product
            database
          </p>
        </div>
      )}

      {/* ═══ NOT FOUND ═══ */}
      {scanState === "not-found" && (
        <div className="mt-6 rounded-xl border border-stone-200 bg-white p-6 text-center">
          <p className="text-3xl font-black text-stone-400">?</p>
          <h3 className="mt-3 text-lg font-bold text-stone-900">
            Product not found
          </h3>
          <p className="mt-2 text-sm text-stone-500">
            Not in our database or Open Food Facts. Help us by contributing this
            product.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/contribute"
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
            >
              Contribute this product
            </Link>
            <button
              onClick={reset}
              className="text-xs font-semibold text-stone-500 hover:text-red-600"
            >
              Scan another
            </button>
          </div>
        </div>
      )}

      {/* ═══ FOUND — LOCAL BRAND ═══ */}
      {scanState === "found" && scannedBrand && (
        <ScanResult brand={scannedBrand} onReset={reset} />
      )}

      {/* ═══ FOUND — EXTERNAL (Open Food Facts) ═══ */}
      {scanState === "found-external" && externalProduct && (
        <ExternalScanResult product={externalProduct} onReset={reset} />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// Local brand result (existing, now with OwnershipTree)
// ═══════════════════════════════════════════════════════

function ScanResult({
  brand,
  onReset,
}: {
  brand: Brand;
  onReset: () => void;
}) {
  const parent = brand.parentSlug ? getCorporation(brand.parentSlug) : null;
  const alternatives = getAlternativesForBrand(brand.slug);

  return (
    <div className="mt-6 space-y-4">
      {/* The reveal */}
      <div className="reveal-up rounded-xl border-2 border-red-200 bg-red-50 p-5">
        <div className="flex items-center gap-4">
          <RatingCircle rating={brand.ethicalRating} size="lg" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-red-600">
              This product is owned by
            </p>
            <h3 className="mt-0.5 text-xl font-black text-stone-900">
              {brand.name}
            </h3>
            {parent && (
              <Link
                href={`/corporation/${parent.slug}`}
                className="mt-0.5 inline-block text-sm font-bold text-red-600 hover:underline"
              >
                A {parent.name} brand &rarr;
              </Link>
            )}
          </div>
        </div>
        <p className="mt-3 text-xs text-stone-600">
          Rating: <strong>{getRatingLabel(brand.ethicalRating)}</strong> —{" "}
          {brand.description}
        </p>
      </div>

      {/* ═══ OWNERSHIP TREE ═══ */}
      {parent && (
        <div className="reveal-up reveal-delay-1">
          <OwnershipTree
            productName={brand.name}
            brandName={brand.name}
            corporation={parent}
          />
        </div>
      )}

      {/* Known issues */}
      {parent && parent.issues.length > 0 && (
        <div className="reveal-up reveal-delay-2 rounded-xl border border-stone-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Known issues — {parent.name}
          </p>
          <div className="mt-3 space-y-2">
            {parent.issues.slice(0, 3).map((issue, i) => (
              <div key={i} className="rounded-lg bg-stone-50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-black uppercase ${
                      issue.severity === "high"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {issue.severity}
                  </span>
                  <span className="text-xs font-bold text-stone-700">
                    {issue.category}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-stone-500">
                  {issue.description}
                </p>
                {issue.source && (
                  <p className="mt-0.5 text-[9px] italic text-stone-400">
                    Source: {issue.source}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* THE SWITCH — alternatives */}
      {alternatives.length > 0 && (
        <div className="reveal-up reveal-delay-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
            Make the switch
          </p>
          <div className="space-y-2">
            {alternatives.map((alt) => (
              <AlternativeCard key={alt.slug} alt={alt} />
            ))}
          </div>
        </div>
      )}

      {/* Where to find */}
      {brand.supermarkets.length > 0 && (
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
            This product is sold at
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {brand.supermarkets.map((store) => (
              <span
                key={store}
                className="rounded bg-stone-100 px-2 py-1 text-xs text-stone-600"
              >
                {store}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onReset}
        className="w-full rounded-lg border-2 border-stone-300 py-3 text-sm font-bold text-stone-700 transition-all hover:border-red-500 hover:text-red-600 active:scale-[0.97]"
      >
        Scan another product
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// External product result (from Open Food Facts)
// ═══════════════════════════════════════════════════════

function ExternalScanResult({
  product,
  onReset,
}: {
  product: OpenFoodFactsProduct;
  onReset: () => void;
}) {
  const displayName = product.product_name || product.brands || "Unknown product";
  const brandOwner = product.brand_owner || product.brands || "";

  return (
    <div className="mt-6 space-y-4">
      {/* The reveal */}
      <div className="reveal-up rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
        <div className="flex items-start gap-4">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={displayName}
              className="h-16 w-16 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-2xl">
              ?
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Found via Open Food Facts
              </p>
              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[8px] font-bold text-amber-600">
                LIVE API
              </span>
            </div>
            <h3 className="mt-0.5 text-xl font-black text-stone-900">
              {displayName}
            </h3>
            {brandOwner && (
              <p className="mt-0.5 text-sm text-stone-600">
                Owned by:{" "}
                <strong className="text-red-600">{brandOwner}</strong>
              </p>
            )}
          </div>
        </div>
        {product.categories_tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {product.categories_tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] text-amber-700"
              >
                {tag.replace("en:", "")}
              </span>
            ))}
          </div>
        )}
        <p className="mt-2 text-[10px] text-amber-600/60">
          Barcode: {product.code}
        </p>
      </div>

      {/* ═══ OWNERSHIP TREE (Wikidata lookup by brand owner name) ═══ */}
      {brandOwner && (
        <div className="reveal-up reveal-delay-1">
          <OwnershipTree
            productName={displayName}
            brandName={product.brands}
            externalBrandOwner={brandOwner}
          />
        </div>
      )}

      {/* Not rated yet notice */}
      <div className="rounded-xl border border-stone-200 bg-white p-4 text-center">
        <p className="text-xs font-bold text-stone-500">
          This product isn&apos;t in our ethical ratings database yet.
        </p>
        <p className="mt-1 text-[11px] text-stone-400">
          The ownership data above is pulled live from open databases.
        </p>
        <Link
          href="/contribute"
          className="mt-3 inline-block rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
        >
          Help us rate this product
        </Link>
      </div>

      <button
        onClick={onReset}
        className="w-full rounded-lg border-2 border-stone-300 py-3 text-sm font-bold text-stone-700 transition-all hover:border-red-500 hover:text-red-600 active:scale-[0.97]"
      >
        Scan another product
      </button>
    </div>
  );
}
