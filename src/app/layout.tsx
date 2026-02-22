import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "OwnedByEvil — Ethical Brand Tracker",
  description:
    "Discover who really owns your favourite brands. Search any product to reveal its corporate parent, ethical track record, and find better alternatives.",
  keywords: [
    "ethical brands",
    "corporate ownership",
    "brand tracker",
    "ethical shopping",
    "who owns",
    "Nestlé",
    "Unilever",
    "P&G",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 font-sans antialiased dark:bg-slate-950">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
