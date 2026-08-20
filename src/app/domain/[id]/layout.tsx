import type { Metadata } from "next";
import { DOMAINS } from "@/data/domains";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const d = DOMAINS.find((x) => x.id === id);
  if (!d) return { title: "Domain Not Found" };
  return {
    title: `${d.shortName} — ${d.name}`,
    description: `${d.tagline} — ${d.studentCount} students, ${d.projectCount} live projects. GCES CSE 2027, Government College of Engineering Srirangam, Trichy.`,
    alternates: { canonical: `/domain/${d.id}` },
    openGraph: {
      title: `${d.shortName} — GCES CSE 2027`,
      description: d.tagline,
      url: `/domain/${d.id}`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
