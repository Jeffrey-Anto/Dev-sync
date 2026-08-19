"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import GooeyNav from "@/components/GooeyNav";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Domains", href: "/#domains" },
    { label: "Tech Stack", href: "/tech-stack" },
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

    if (pathname === "/tech-stack") {
      setActiveTab(2);
    } else if (pathname === "/achievements") {
      setActiveTab(3);
    } else if (pathname === "/recruit") {
      setActiveTab(4);
    } else if (pathname === "/") {
      if (typeof window !== "undefined" && window.location.hash === "#domains") {
        setActiveTab(1);
      } else if (window.scrollY < 300) {
        setActiveTab(0);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

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
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 via-cyan-500/10 to-transparent border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:border-indigo-400/60 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.35)]">
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
        <div className="hidden md:block">
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

        {/* Sleek Right Action CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/recruit"
            className="group relative px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600/25 hover:bg-indigo-600/35 border border-indigo-500/40 hover:border-indigo-400/70 shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all duration-300 flex items-center gap-2.5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Placement Desk</span>
            <ArrowRight className="w-4 h-4 text-indigo-300 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center">
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
        <div className="md:hidden px-4 pt-4 pb-6 space-y-2 border-t border-white/[0.08] bg-[#050608]/98 backdrop-blur-2xl animate-in fade-in duration-200">
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
          <div className="pt-2">
            <Link
              href="/recruit"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl text-sm text-center font-semibold text-white bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <span>Placement Desk &amp; Schedule Drive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
