import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "COLLECTIVE.CS // Class of 60 Engineers · Recruiter Showcase 2026",
  description:
    "A collective engineering showcase of 60 Computer Science undergraduates across 6 core domains: Web Systems, AI/ML, Cloud DevOps, Embedded IoT, Mobile, and Cybersecurity.",
  keywords: [
    "Computer Science Placement",
    "Campus Recruitment",
    "Engineering Showcase",
    "Full-Stack Web",
    "AI/ML",
    "Cloud Architecture",
    "DevOps",
    "Cybersecurity",
    "Embedded Systems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#050608] text-slate-100 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
