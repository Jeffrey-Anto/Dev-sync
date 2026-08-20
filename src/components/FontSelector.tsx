"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Type, Check, ChevronDown } from "lucide-react";

export interface FontGroup {
  id: string;
  name: string;
  badge: string;
  displayFont: string;
  bodyFont: string;
  monoFont: string;
  headingFamilyCss: string;
}

export const FONT_GROUPS: FontGroup[] = [
  {
    id: "hyper-tech",
    name: "Hyper-Tech",
    badge: "Linear / Vercel",
    displayFont: "Outfit",
    bodyFont: "Inter",
    monoFont: "JetBrains Mono",
    headingFamilyCss: "var(--font-outfit), sans-serif",
  },
  {
    id: "cyber-futuristic",
    name: "Cyber-Futuristic",
    badge: "Space & Tech",
    displayFont: "Space Grotesk",
    bodyFont: "DM Sans",
    monoFont: "Space Mono",
    headingFamilyCss: "var(--font-space-grotesk), sans-serif",
  },
  {
    id: "modern-editorial",
    name: "Modern Editorial",
    badge: "Sora & Product",
    displayFont: "Sora",
    bodyFont: "Manrope",
    monoFont: "IBM Plex Mono",
    headingFamilyCss: "var(--font-sora), sans-serif",
  },
  {
    id: "geist",
    name: "Geist Minimal",
    badge: "Default System",
    displayFont: "Geist Sans",
    bodyFont: "Geist Sans",
    monoFont: "Geist Mono",
    headingFamilyCss: "var(--font-geist-sans), sans-serif",
  },
];

interface FontSelectorProps {
  className?: string;
  align?: "left" | "right";
  isMobileFullWidth?: boolean;
}

export default function FontSelector({
  className = "",
  align = "right",
  isMobileFullWidth = false,
}: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string>("hyper-tech");
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize from document or localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("devsync_font_group");
    const initial =
      saved || document.documentElement.getAttribute("data-font-group") || "hyper-tech";
    setActiveGroup(initial);
    document.documentElement.setAttribute("data-font-group", initial);
  }, []);

  // Handle outside click & escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const selectFontGroup = (groupId: string) => {
    setActiveGroup(groupId);
    document.documentElement.setAttribute("data-font-group", groupId);
    try {
      localStorage.setItem("devsync_font_group", groupId);
    } catch (e) {
      console.warn("Could not write to localStorage", e);
    }

    // Trigger canvas & layout re-renders
    window.dispatchEvent(
      new CustomEvent("devsync:fontchange", { detail: { group: groupId } })
    );
    window.dispatchEvent(new Event("resize"));
    setIsOpen(false);
  };

  const currentGroupObj =
    FONT_GROUPS.find((g) => g.id === activeGroup) || FONT_GROUPS[0];

  if (!mounted) {
    return (
      <div className={`h-9 w-28 rounded-xl bg-slate-900/60 animate-pulse ${className}`} />
    );
  }

  return (
    <div ref={dropdownRef} className={`relative ${isMobileFullWidth ? "w-full" : "inline-block"} ${className}`}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`group flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-400/50 text-slate-200 hover:text-white transition-all text-xs font-mono cursor-pointer shadow-sm ${
          isMobileFullWidth ? "w-full" : ""
        } ${isOpen ? "border-cyan-400/60 ring-1 ring-cyan-400/30" : ""}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Type className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span className="font-semibold truncate">
            {currentGroupObj.name}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-cyan-400" : "group-hover:text-slate-200"
          }`}
        />
      </button>

      {/* Dropdown Menu Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute ${
              align === "left" ? "left-0" : "right-0"
            } top-full mt-2 w-72 sm:w-80 rounded-2xl bg-[#090d16]/98 border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl p-1.5 z-50 overflow-hidden`}
          >
            {/* Header */}
            <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                Choose Font System
              </span>
              <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Live Preview
              </span>
            </div>

            {/* Options List */}
            <div className="py-1 space-y-1">
              {FONT_GROUPS.map((group) => {
                const isSelected = activeGroup === group.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => selectFontGroup(group.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? "bg-cyan-500/15 border border-cyan-500/30 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                        : "hover:bg-white/[0.06] text-slate-300 hover:text-white border border-transparent"
                    }`}
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span
                          style={{ fontFamily: group.headingFamilyCss }}
                          className="text-sm font-bold text-white tracking-tight truncate"
                        >
                          {group.name}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300 flex-shrink-0">
                          {group.badge}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">
                        {group.displayFont} · {group.bodyFont} · {group.monoFont}
                      </span>
                    </div>

                    {isSelected ? (
                      <Check className="w-4 h-4 text-cyan-400 stroke-[2.5] flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-white/20 group-hover:border-white/40 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
