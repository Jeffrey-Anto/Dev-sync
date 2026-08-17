import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatStrip from "@/components/StatStrip";
import DomainSelection from "@/components/DomainSelection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#050608] text-slate-100 flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Full-viewport 3D Hero */}
        <HeroSection />

        {/* Animated Counting-Up Stat Strip */}
        <StatStrip />

        {/* Spatial Domain Capability Matrix */}
        <DomainSelection />
      </main>

      {/* Footer with Recruiter Placement Desk */}
      <Footer />
    </div>
  );
}
