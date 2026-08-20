import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achievements — Hackathon Champions & Awards",
  description:
    "Two-time overall champions at GCT Coimbatore, national hackathon winners — achievements of GCES CSE Batch 2027, Government College of Engineering Srirangam, Trichy.",
  alternates: { canonical: "/achievements" },
  openGraph: {
    title: "Achievements — GCES CSE 2027",
    description: "Hackathon champions, competitive coding, certifications — GCES CSE 2027 track record.",
    url: "/achievements",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
