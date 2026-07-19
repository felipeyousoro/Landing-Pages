import { db } from "./index";
import { posts } from "./schema";

const now = Date.now();
const day = 24 * 60 * 60 * 1000;

const seedPosts = [
  {
    slug: "preventive-maintenance-uae-facilities",
    title: "Preventive Maintenance That Keeps UAE Facilities Performing",
    excerpt:
      "How a disciplined preventive maintenance programme reduces downtime, extends asset life, and keeps commercial buildings ready for daily use across the UAE.",
    body: `## Why preventive maintenance matters

Reactive repairs cost more than planned care. In UAE facilities — from commercial towers to industrial sites — heat, usage intensity, and continuous operations put constant pressure on HVAC, electrical systems, and building fabric.

A structured preventive maintenance programme catches small issues before they become costly failures. Scheduled inspections, clear work orders, and accountable vendor coordination keep systems reliable and compliance-ready.

## What good looks like

Start with an asset register, set inspection intervals by criticality, and track completion with simple reporting. Dazco's facilities teams in Al Ain and across the UAE help property owners stay ahead of breakdowns so buildings remain safe, efficient, and ready for everyday use.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Commercial building exterior under clear sky",
    status: "published" as const,
    publishedAt: now - 14 * day,
    createdAt: now - 14 * day,
    updatedAt: now - 14 * day,
  },
  {
    slug: "warehouse-operations-checklist-al-ain",
    title: "A Practical Warehouse Operations Checklist for Al Ain Sites",
    excerpt:
      "Inventory accuracy, controlled access, and clear handoffs — a practical checklist for running disciplined warehouse and stores operations in Al Ain.",
    body: `## Operations that scale with demand

Warehousing and stores environments demand accuracy and throughput. Whether you support a single facility or a multi-site supply chain, the fundamentals stay the same: know what you have, control who accesses it, and move materials when they are needed.

## Checklist essentials

- Maintain accurate inventory records with regular cycle counts
- Enforce controlled access and clear receiving procedures
- Document handoffs between procurement, storage, and site delivery
- Keep aisles, racking, and safety zones inspection-ready

Local operational oversight in Al Ain helps reduce friction across the chain — from inbound materials to on-site readiness — so your teams can focus on core work.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Warehouse aisle with pallet racking and stored goods",
    status: "published" as const,
    publishedAt: now - 7 * day,
    createdAt: now - 7 * day,
    updatedAt: now - 7 * day,
  },
  {
    slug: "smart-security-for-commercial-properties",
    title: "Smart Security for Commercial Properties Without the Complexity",
    excerpt:
      "CCTV and smart building technology that give property operators better visibility and control — practical installations focused on safety, not gadgetry.",
    body: `## Visibility that supports operations

Security and smart building technology help create safer, more connected commercial spaces. The goal is practical coverage: cameras where they matter, systems your teams can monitor, and integrations that improve response without unnecessary complexity.

## A practical approach

Map risk zones first — entrances, loading bays, parking, and common areas. Choose CCTV layouts that support both deterrence and incident review. Layer smart controls only where they clearly reduce operational friction.

From surveillance coverage to integrated smart office solutions, Dazco focuses on installations that improve safety and give owners clearer control of their properties across the UAE.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Security camera mounted on a commercial building",
    status: "published" as const,
    publishedAt: now - 2 * day,
    createdAt: now - 2 * day,
    updatedAt: now - 2 * day,
  },
];

async function seed() {
  for (const post of seedPosts) {
    await db
      .insert(posts)
      .values(post)
      .onConflictDoUpdate({
        target: posts.slug,
        set: {
          title: post.title,
          excerpt: post.excerpt,
          body: post.body,
          coverImageUrl: post.coverImageUrl,
          coverImageAlt: post.coverImageAlt,
          status: post.status,
          publishedAt: post.publishedAt,
          updatedAt: Date.now(),
        },
      });
  }

  console.log(`Seeded ${seedPosts.length} posts.`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
