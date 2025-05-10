import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interVariable = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter",
  display: "swap",
  style: "normal",
  weight: "100 900",
  fallback: ["system-ui", "sans-serif"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Search Demo",
  description: "Simple Typesense Search Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interVariable.className} antialiased bg-zinc-900`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
