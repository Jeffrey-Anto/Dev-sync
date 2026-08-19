"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Terminal,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  Layers,
  Trophy,
  Briefcase,
  Globe,
} from "lucide-react";
import { COHORT_STATS } from "@/data/domains";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Domains", href: "/#domains" },
    { name: "Tech Stack", href: "/tech-stack" },
    { name: "Achievements", href: "/achievements" },
    { name: "Recruit Us", href: "/recruit" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-[#050608]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/70"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 via-cyan-500/10 to-transparent border border-indigo-500/30 flex items-center justify-center transition-all duration-300 group-hover:border-indigo-400 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            <Terminal className="w-5 h-5 text-indigo-400 group-hover:text-cyan-300 transition-colors" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm tracking-widest uppercase font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                COLLECTIVE<span className="text-indigo-400">.CS</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                CSE · 2027
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
              Technical Showcase · Placement Drive 2027
            </p>
          </div>
        </Link>

        {/* Desktop Global Nav Links */}
        <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : link.href.startsWith("/#")
                ? false
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                  isActive
                    ? "bg-indigo-600/30 text-white border border-indigo-500/40 shadow-[0_0_12px_rgba(99,102,241,0.3)] font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/recruit"
            className="group relative overflow-hidden px-4 py-2 rounded-xl text-xs font-mono font-semibold text-white border border-indigo-500/40 bg-gradient-to-r from-indigo-600/30 to-cyan-600/30 hover:from-indigo-600/40 hover:to-cyan-600/40 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Placement Desk</span>
            <ChevronRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 space-y-2 border-t border-white/10 bg-[#050608]/95 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/recruit"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl text-xs font-mono text-center font-semibold text-white bg-indigo-600 flex items-center justify-center gap-2"
            >
              <span>Schedule Drive / Contact</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
