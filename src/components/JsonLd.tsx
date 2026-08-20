export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ponytail: one shared SITE_URL constant — keep in sync with layout.tsx/sitemap/robots.ts
const SITE = "https://gces.net.in";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "@id": `${SITE}/#college`,
  name: "Government College of Engineering Srirangam",
  alternateName: ["GCE Srirangam", "GCES", "GCES Trichy"],
  url: SITE,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Srirangam",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  department: {
    "@type": "Organization",
    name: "Department of Computer Science and Engineering",
    url: `${SITE}/#domains`,
  },
  sameAs: ["https://github.com/Jeffrey-Anto/Dev-sync"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  name: "COLLECTIVE.CSE — GCES CSE Batch 2027",
  url: SITE,
  publisher: { "@id": `${SITE}/#college` },
  inLanguage: "en-IN",
};

export const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "GCES CSE Batch 2027 — 60 Engineers Collective Showcase",
  description:
    "Showcase of 60 CSE undergrads at Government College of Engineering Srirangam, Trichy (2023–2027) across 6 core domains and 18+ live projects. Open for campus recruitment.",
  url: SITE,
  isPartOf: { "@id": `${SITE}/#website` },
  about: { "@id": `${SITE}/#college` },
  mainEntity: {
    "@type": "ItemList",
    name: "Core Domains",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Web Development & Distributed Systems", url: `${SITE}/domain/web-dev` },
      { "@type": "ListItem", position: 2, name: "Artificial Intelligence & Machine Learning", url: `${SITE}/domain/ai-ml` },
      { "@type": "ListItem", position: 3, name: "Cloud Architecture & DevOps", url: `${SITE}/domain/cloud-devops` },
      { "@type": "ListItem", position: 4, name: "Embedded Systems & IoT", url: `${SITE}/domain/embedded-iot` },
      { "@type": "ListItem", position: 5, name: "Mobile Development", url: `${SITE}/domain/mobile-dev` },
      { "@type": "ListItem", position: 6, name: "Cybersecurity", url: `${SITE}/domain/cybersecurity` },
    ],
  },
};
