import StarsBackground from "@/ui/components/stars-background";
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
      <body
        className={`${interVariable.className} antialiased h-screen bg-zinc-900`}
      >
        {children}

        <StarsBackground
          starColor="#facc15"
          className="fixed bottom-0 inset-x-0 h-[95vh] mask-radial mask-radial-from-0%"
        />
      </body>
    </html>
  );
}
