import StarsBackground from "@/ui/components/stars-background";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.className} ${geistMono.variable} antialiased h-screen bg-zinc-900`}
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
