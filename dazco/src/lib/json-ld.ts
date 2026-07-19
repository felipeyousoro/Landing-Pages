import type { FaqItem } from "@/lib/faq";
import type { Service } from "@/lib/services";
import { absoluteUrl, SITE } from "@/lib/site";

const LOCAL_BUSINESS_ID = `${SITE.url}/#localbusiness`;

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": LOCAL_BUSINESS_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.telephone,
    ...(SITE.email ? { email: SITE.email } : {}),
    image: absoluteUrl(SITE.defaultOgImage),
    logo: absoluteUrl("/brand/dazco-logo.png"),
    foundingDate: SITE.foundingDate,
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.addressLocality,
      addressRegion: SITE.address.addressRegion,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.addressCountry,
    },
    sameAs: [...SITE.sameAs],
  };
}

export function serviceJsonLd(service: Service) {
  const url = absoluteUrl(`/services/${service.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url,
    image: absoluteUrl(service.image),
    provider: {
      "@id": LOCAL_BUSINESS_ID,
    },
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
