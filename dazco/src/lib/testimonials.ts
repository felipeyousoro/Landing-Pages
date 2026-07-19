export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Dazco has looked after our properties for years, and their reliability is what keeps us with them. Whenever an issue comes up, their team responds quickly and closes it out properly the first time.",
    name: "Ahmed Al Mansoori",
    role: "Facilities Director",
    company: "Al Ain Property Group",
  },
  {
    quote:
      "Having one partner handle maintenance, security systems, and IT across our sites has made our operations dramatically simpler. The reporting is clear and we always know where things stand.",
    name: "Sarah Thompson",
    role: "Operations Manager",
    company: "Gulf Retail Holdings",
  },
  {
    quote:
      "Their warehousing and stores team runs our facility with real discipline. Inventory is accurate, access is controlled, and materials move exactly when they should. A genuinely dependable partner.",
    name: "Mohammed Rashid",
    role: "General Manager",
    company: "Emirates Logistics Co.",
  },
];
