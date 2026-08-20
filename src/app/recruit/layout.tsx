import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruit Us — Hire GCES CSE 2027 | Campus Drive Trichy",
  description:
    "Hire 60 CSE engineers — GCES Trichy Batch 2027. Schedule a campus drive, internships, or PPO. Contact the GCES placement desk. Government College of Engineering Srirangam.",
  alternates: { canonical: "/recruit" },
  openGraph: {
    title: "Recruit GCES CSE 2027 — Schedule a Campus Drive",
    description: "Hire 60 engineers across 6 domains. GCES Trichy — placement open 2027. Book a drive today.",
    url: "/recruit",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
