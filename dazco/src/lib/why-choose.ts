export type Reason = {
  title: string;
  description: string;
  icon: "location" | "shield" | "layers" | "clock";
};

export const WHY_CHOOSE: Reason[] = [
  {
    title: "Local presence, UAE-wide reach",
    description:
      "Based in Al Ain, Abu Dhabi, with the people and processes to scale delivery across the Emirates whenever you need us.",
    icon: "location",
  },
  {
    title: "An approved, trusted vendor",
    description:
      "Approved by 120+ government, semi-government, and private entities who rely on us to keep their sites performing.",
    icon: "shield",
  },
  {
    title: "One accountable partner",
    description:
      "Facilities, maintenance, IT networking, CCTV, smart systems, and supply chain — coordinated by a single team.",
    icon: "layers",
  },
  {
    title: "Rapid, reliable response",
    description:
      "24/7 support with disciplined reporting and clear accountability, so small issues never become costly downtime.",
    icon: "clock",
  },
];
