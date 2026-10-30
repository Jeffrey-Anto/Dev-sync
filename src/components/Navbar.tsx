"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import GooeyNav from "@/components/GooeyNav";
import FontSelector from "@/components/FontSelector";

const getTabFromPath = (path: string) => {
  if (path === "/tech-stack") return 2;
  if (path.startsWith("/students")) return 3;
  if (path === "/achievements") return 4;
  if (path === "/recruit") return 5;
  return 0;
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(() => getTabFromPath(pathname));

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Domains", href: "/#domains" },
    { label: "Tech Stack", href: "/tech-stack" },
    { label: "Students", href: "/students" },
    { label: "Achievements", href: "/achievements" },
    { label: "Recruit Us", href: "/recruit" },
  ];

  // Sync scroll and pathname
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname === "/") {
        const domainsEl = document.getElementById("domains");
        if (domainsEl) {
          const rect = domainsEl.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveTab(1);
          } else if (window.scrollY < 300) {
            setActiveTab(0);
          }
        }
      }
    };

    if (pathname === "/") {
      if (typeof window !== "undefined" && window.location.hash === "#domains") {
        setActiveTab(1);
      } else if (window.scrollY < 300) {
        setActiveTab(0);
      }
    } else {
      setActiveTab(getTabFromPath(pathname));
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (pathname.startsWith("/domain/")) {
    return null;
  }

  const handleItemClick = (item: { label: string; href: string }, index: number) => {
    setActiveTab(index);
    if (item.href === "/#domains" || item.href === "#domains") {
      if (pathname === "/") {
        const el = document.getElementById("domains");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-[#050608]/85 backdrop-blur-2xl border-b border-white/[0.08] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-gradient-to-b from-[#050608]/90 via-[#050608]/40 to-transparent backdrop-blur-sm py-3.5 border-b border-white/[0.04]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3.5 group">
          {/* Refined Geometric Monogram */}
          <div data-logo-slot className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 via-cyan-500/10 to-transparent border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:border-indigo-400/60 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.35)]">
            <span className="font-mono text-sm font-black text-indigo-300 group-hover:text-cyan-300 transition-colors">
              //
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-[#050608] animate-pulse" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black tracking-tight text-white font-sans group-hover:text-slate-100 transition-colors">
                COLLECTIVE<span className="text-indigo-400">.CSE</span>
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 tracking-wider">
                &apos;27
              </span>
            </div>
            <span className="text-xs sm:text-[13px] text-slate-300 font-sans tracking-normal hidden sm:block">
              GCE Srirangam · Placement Showcase
            </span>
          </div>
        </Link>

        {/* React Bits <GooeyNav /> Navigation Effect */}
        <div className="hidden xl:block">
          <GooeyNav
            items={navLinks}
            activeIndex={activeTab}
            particleCount={14}
            particleDistances={[75, 10]}
            particleR={90}
            animationTime={550}
            timeVariance={250}
            colors={[1, 2, 3, 4]}
            onItemClick={handleItemClick}
          />
        </div>

        {/* Sleek Right Action CTA & Font Dropdown (Desktop Only) */}
        <div className="hidden xl:flex items-center gap-3">
          <FontSelector />

          <Link
            href="/recruit"
            className="group relative inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
          >
            {/* Rotating Conic Glowing Green Border Beam */}
            <span className="absolute inset-[-150%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_200deg,#059669_270deg,#10b981_320deg,#34d399_350deg,#10b981_360deg)]" />

            {/* Ambient Rotating Green Glow behind the border */}
            <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_240deg,#10b981_320deg,#34d399_360deg)] blur-md opacity-75" />

            {/* Inner Pill Body */}
            <span className="relative z-10 flex items-center gap-3 pl-3.5 pr-2 py-1.5 rounded-full bg-[#070a12] text-xs sm:text-sm font-medium text-white transition-colors duration-300 group-hover:bg-[#0b101c]">
              {/* Live Emerald Radar Beacon */}
              <span className="relative flex h-2.5 w-2.5 items-center justify-center flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </span>

              {/* Button Label */}
              <span className="font-semibold tracking-wide text-slate-100 group-hover:text-white transition-colors">
                Placement Desk
              </span>

              {/* Circular Arrow Chip */}
              <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-emerald-400 group-hover:text-black group-hover:border-emerald-400 transition-all duration-300 flex-shrink-0">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button (Mobile Top Bar) */}
        <div className="flex xl:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden px-4 pt-4 pb-6 space-y-2 border-t border-white/[0.08] bg-[#050608]/98 backdrop-blur-2xl animate-in fade-in duration-200">
          {navLinks.map((link, idx) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleItemClick(link, idx);
              }}
              className="block px-4 py-3 rounded-xl text-sm sm:text-base font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-3">
            <div className="px-1">
              <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
                Select Font Trio
              </label>
              <FontSelector isMobileFullWidth align="left" />
            </div>

            {/* Full-width Glowing Conic Beam Placement Desk CTA in Mobile Drawer */}
            <Link
              href="/recruit"
              onClick={() => setMobileMenuOpen(false)}
              className="group relative w-full inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)]"
            >
              {/* Rotating Conic Glowing Green Border Beam */}
              <span className="absolute inset-[-150%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_200deg,#059669_270deg,#10b981_320deg,#34d399_350deg,#10b981_360deg)]" />

              {/* Ambient Rotating Green Glow behind the border */}
              <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_240deg,#10b981_320deg,#34d399_360deg)] blur-md opacity-75" />

              {/* Inner Pill Body */}
              <span className="relative z-10 w-full flex items-center justify-between px-4 py-2.5 rounded-full bg-[#070a12] text-xs sm:text-sm font-medium text-white transition-colors duration-300 group-hover:bg-[#0b101c]">
                <div className="flex items-center gap-2.5">
                  {/* Live Emerald Radar Beacon */}
                  <span className="relative flex h-2.5 w-2.5 items-center justify-center flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  </span>

                  {/* Button Label */}
                  <span className="font-semibold tracking-wide text-slate-100 group-hover:text-white transition-colors">
                    Placement Desk &amp; Schedule Drive
                  </span>
                </div>

                {/* Circular Arrow Chip */}
                <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-emerald-400 group-hover:text-black group-hover:border-emerald-400 transition-all duration-300 flex-shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
