import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatStrip from "@/components/StatStrip";
import DomainSelection from "@/components/DomainSelection";
import AchievementSlider from "@/components/AchievementSlider";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
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
    </div>
  );
}