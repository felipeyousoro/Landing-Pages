export const SITE = {
  name: "Dazco LLC",
  legalName: "Dazco LLC",
  tagline: "A place of Trust",
  description:
    "Dazco LLC — a place of Trust. Facilities, properties, warehousing, and maintenance services in Al Ain, Abu Dhabi since 2001.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dazco.ae",
  foundingDate: "2001",
  telephone: "+971-3-735-3369",
  telephoneHref: "tel:+97137353369",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  defaultOgImage: "/images/dubai-skyline.jpg",
  defaultOgImageAlt: "Dubai skyline at dusk",
  address: {
    streetAddress: "AL Shimmari Building, Office no. 111",
    addressLocality: "Al Ain",
    addressRegion: "Abu Dhabi",
    postalCode: "14488",
    addressCountry: "AE",
  },
  sameAs: [
    "https://www.linkedin.com/company/dazcogroup",
    "https://www.instagram.com/dazcogroup",
  ],
} as const;

export function absoluteUrl(path = "/"): string {
  const base = SITE.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
