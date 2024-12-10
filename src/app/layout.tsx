import React from "react";

import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={playfairDisplay.className}>
        <Header />
        <main className="pt-headerHeight">{children}</main>
      </body>
    </html>
  );
}
