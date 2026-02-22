import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/60 bg-stone-50/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-2.5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-red-600 text-[10px] font-black tracking-tighter text-white">
            OBE
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-tight text-stone-900">
              Owned<span className="text-red-600">By</span>Evil
            </h1>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/scan"
            className="flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-red-700 active:scale-95"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M3 17v2a2 2 0 002 2h2M17 21h2a2 2 0 002-2v-2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10" />
            </svg>
            Scan
          </Link>
        </div>
      </div>
    </header>
  );
}
