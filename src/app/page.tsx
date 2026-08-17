import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatStrip from "@/components/StatStrip";
import DomainSelection from "@/components/DomainSelection";
import AchievementSlider from "@/components/AchievementSlider";
import Footer from "@/components/Footer";
import { DynamicBackground } from "@/components/backgrounds";

export default function HomePage() {
  return (
    <DynamicBackground variant="all" intensity="subtle" showGrid={true}>
      <div className="relative min-h-screen text-slate-100 flex flex-col">
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

          {/* Horizontal Scrolling Student Achievements Section */}
          <AchievementSlider />
        </main>

        {/* Footer with Recruiter Placement Desk */}
        <Footer />
      </div>
    </DynamicBackground>
  );
}
