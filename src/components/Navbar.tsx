"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
          ? "bg-[#050608]/85 backdrop-blur-2xl border-b border-white/[0.08] py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-gradient-to-b from-[#050608]/90 via-[#050608]/40 to-transparent backdrop-blur-sm py-4 border-b border-white/[0.04]"
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

        {/* Clean Modern Nav Links (Larger font size) */}
        <nav className="hidden md:flex items-center gap-1.5">
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
                className={`relative px-4 py-2 text-sm sm:text-[15px] font-medium tracking-wide transition-all rounded-xl ${
                  isActive
                    ? "text-white bg-white/[0.1] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sleek Right Action CTA (Larger font size) */}
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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm sm:text-base font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              {link.name}
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
