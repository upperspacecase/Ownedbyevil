import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "OwnedByEvil -- Who really owns your brands",
  description:
    "Scan any product barcode to reveal its corporate parent, the humans who profit, their ethical track record, and find alternatives that deserve your money.",
  keywords: [
    "ethical brands",
    "corporate ownership",
    "who owns what",
    "brand tracker",
    "barcode scanner",
    "ethical shopping",
    "Nestle",
    "Unilever",
    "Coca-Cola",
    "Mars",
    "P&G",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#fafaf9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 font-sans antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
