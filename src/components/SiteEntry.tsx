"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import WaterLogoEntry from "@/components/WaterLogoEntry";
import { setMotionPaused } from "@/lib/motion-pause";

export default function SiteEntry({ children }: { children: React.ReactNode }) {
  // Start with the server value so hydration matches, then restore the saved
  // visit before the first paint. Reading sessionStorage in the initializer made
  // returning visitors hit a hydration mismatch and a full client re-render.
  const [isEntered, setIsEntered] = useState(false);

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem("devsync_site_entered") === "true") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsEntered(true);
      }
    } catch {}
  }, []);

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
