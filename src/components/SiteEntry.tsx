"use client";

import React, { useEffect, useState } from "react";
import WaterLogoEntry from "@/components/WaterLogoEntry";
import { setMotionPaused } from "@/lib/motion-pause";

export default function SiteEntry({ children }: { children: React.ReactNode }) {
  const [isEntered, setIsEntered] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("devsync_site_entered") === "true";
    }
    return false;
  });

  // The entry overlay is opaque. Freeze the page animations until it lifts so
  // the 25px blur below only re-rasterises a static frame.
  useEffect(() => {
    setMotionPaused(!isEntered);
    return () => setMotionPaused(false);
  }, [isEntered]);

  const handleEnter = () => {
    setIsEntered(true);
    try {
      sessionStorage.setItem("devsync_site_entered", "true");
    } catch {}
  };

  return (
    <>
      <WaterLogoEntry isEntered={isEntered} onEnter={handleEnter} />
      <div
        className={`flex flex-col flex-grow transition-all duration-1000 ease-out ${
          isEntered
            ? "opacity-100"
            : "filter blur-[25px] scale-[0.97] opacity-20 pointer-events-none"
        }`}
      >
        {children}
      </div>
    </>
  );
}
