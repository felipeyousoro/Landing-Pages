import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Analytics, CookieConsent } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { SkipToContent } from "@/components/skip-to-content";
import { localBusinessJsonLd } from "@/lib/json-ld";
import { SITE } from "@/lib/site";
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
  metadataBase: new URL(SITE.url),
  title: {
    default: "Dazco LLC | Facilities Management",
    template: "%s | Dazco LLC",
  },
  description: SITE.description,
  icons: {
    icon: "/brand/dazco-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: SITE.name,
    title: "Dazco LLC | Facilities Management",
    description: SITE.description,
    url: SITE.url,
    images: [
      {
        url: SITE.defaultOgImage,
        width: 1200,
        height: 630,
        alt: SITE.defaultOgImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dazco LLC | Facilities Management",
    description: SITE.description,
    images: [SITE.defaultOgImage],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SkipToContent />
        <JsonLd data={localBusinessJsonLd()} />
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
