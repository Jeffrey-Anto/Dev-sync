import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Stack — 60 Engineers, 40+ Technologies",
  description:
    "Explore the GCES CSE 2027 tech stack — Next.js, Python, PyTorch, Kubernetes, Flutter, and 40+ tools mastered across 6 domains. Government College of Engineering Srirangam, Trichy.",
  alternates: { canonical: "/tech-stack" },
  openGraph: {
    title: "Tech Stack — GCES CSE 2027 Collective",
    description: "40+ technologies across Web, AI/ML, Cloud, IoT, Mobile, Cybersecurity — GCES Trichy CSE 2027.",
    url: "/tech-stack",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
