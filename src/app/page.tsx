import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import SiteEntry from "@/components/SiteEntry";
import HeroSection from "@/components/HeroSection";
import StatStrip from "@/components/StatStrip";
import JsonLd, { collectionPageJsonLd } from "@/components/JsonLd";

const DomainSelection = dynamic(() => import("@/components/DomainSelection"), {
  ssr: true,
});

const AchievementSlider = dynamic(() => import("@/components/AchievementSlider"), {
  ssr: true,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
});

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col">
      <JsonLd data={collectionPageJsonLd} />
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <SiteEntry>
        <main className="flex-grow">
          {/* Full-viewport 3D Hero — single focused animated node-graph scene */}
          <HeroSection />

          {/* Animated Counting-Up Stat Strip */}
          <StatStrip />

          {/* Spatial Domain Capability Matrix */}
          <DomainSelection />

          {/* Horizontal Scrolling Student Achievements */}
          <AchievementSlider />

          <Footer />
        </main>
      </SiteEntry>
    </div>
  );
}
