import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Profiles — The GCES CSE 2027 Roster",
  description:
    "Browse the GCES CSE Batch 2027 roster. Each profile lists the portfolio, GitHub, and LeetCode links that student chose to make public. Government College of Engineering Srirangam, Trichy.",
  alternates: { canonical: "/students" },
  openGraph: {
    title: "Student Profiles — GCES CSE 2027 Collective",
    description:
      "Portfolio, GitHub, and LeetCode profiles from the GCES CSE Batch 2027 collective — where the work lives.",
    url: "/students",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
