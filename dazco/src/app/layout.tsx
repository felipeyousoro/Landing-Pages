import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

// Jost is used as a free, geometric-sans stand-in for Futura (the brand
// manual's supplementary typeface, which is a commercial font). Swap this
// out for an official Futura webfont license if/when one is available.
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dazco LLC | Facilities Management",
  description:
    "Dazco LLC — a place of Trust. Facilities, properties, warehousing, and maintenance services in Al Ain, Abu Dhabi since 2001.",
  icons: {
    icon: "/brand/dazco-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
