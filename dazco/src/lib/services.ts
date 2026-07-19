export type Service = {
  slug: string;
  title: string;
  description: string;
  body: string[];
  image: string;
  imageAlt: string;
};

export const SERVICES: Service[] = [
  {
    slug: "properties-facilities-management",
    title: "Properties & Facilities Management",
    description:
      "End-to-end facilities operations that keep properties safe, efficient, and ready for daily use.",
    body: [
      "Dazco delivers end-to-end properties and facilities management designed to keep your sites safe, efficient, and ready for everyday use. From day-to-day operations to planned maintenance programmes, we coordinate the people, processes, and vendors that keep buildings performing.",
      "Our teams support commercial, residential, and industrial properties with disciplined reporting, clear accountability, and a local presence in Al Ain — backed by the reach to scale across the UAE when you need us.",
    ],
    image: "/images/properties-facilities-management.jpg",
    imageAlt: "Modern commercial building exterior",
  },
  {
    slug: "warehousing-stores-operation",
    title: "Warehousing & Stores Operation",
    description:
      "Reliable warehouse and store operations with disciplined processes for storage and logistics.",
    body: [
      "We run warehousing and stores operations with the discipline logistics environments demand — accurate inventory handling, controlled access, and processes built for throughput and accountability.",
      "Whether you need ongoing store management or operational support for a busy facility, Dazco helps keep materials organised, traceable, and moving when they need to.",
    ],
    image: "/images/warehousing-stores-operation.jpg",
    imageAlt: "Warehouse aisle with pallet racking",
  },
  {
    slug: "building-general-maintenance",
    title: "Building General Maintenance",
    description:
      "Preventive and corrective maintenance to protect assets and extend building lifespan.",
    body: [
      "Protecting building assets starts with consistent preventive and corrective maintenance. Our teams handle general building upkeep so small issues do not become costly downtime.",
      "From routine inspections to responsive repairs, we help extend asset life, maintain compliance readiness, and keep your property presentation and performance up to standard.",
    ],
    image: "/images/building-general-maintenance.jpg",
    imageAlt: "Construction and building maintenance work",
  },
  {
    slug: "it-networking",
    title: "IT Networking",
    description:
      "Network infrastructure and connectivity solutions tailored to offices and facilities.",
    body: [
      "Reliable connectivity is foundational to modern offices and facilities. Dazco supports IT networking setups that match the operational needs of your site — from structured cabling foundations to practical connectivity solutions.",
      "We work with your stakeholders to deliver infrastructure that is clear, maintainable, and ready to support daily business operations.",
    ],
    image: "/images/it-networking.jpg",
    imageAlt: "Server room network infrastructure",
  },
  {
    slug: "cctv-smart-homes-offices",
    title: "CCTV & Smart Homes / Offices",
    description:
      "Security systems and smart building technology for safer, more connected spaces.",
    body: [
      "Security and smart building technology help create safer, more connected spaces. We support CCTV and smart home/office solutions that give property owners and operators better visibility and control.",
      "From surveillance coverage to integrated smart systems, our approach focuses on practical installations that improve safety without unnecessary complexity.",
    ],
    image: "/images/cctv-smart-homes-offices.jpg",
    imageAlt: "Security camera monitoring system",
  },
  {
    slug: "supply-chain-management",
    title: "Supply Chain Management",
    description:
      "Coordinated supply chain support that keeps materials and operations moving smoothly.",
    body: [
      "Supply chain support keeps materials and operations moving with fewer interruptions. Dazco helps coordinate the handoffs between procurement, storage, and site delivery so your teams can stay focused on core work.",
      "With clear processes and local operational oversight, we help reduce friction across the chain — from inbound materials to on-site readiness.",
    ],
    image: "/images/supply-chain-management.jpg",
    imageAlt: "Supply chain logistics and cargo containers",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
