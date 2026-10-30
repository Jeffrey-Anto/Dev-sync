"use client";

import React, { useState } from "react";
import WaterLogoEntry from "@/components/WaterLogoEntry";

export default function SiteEntry({ children }: { children: React.ReactNode }) {
  const [isEntered, setIsEntered] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("devsync_site_entered") === "true";
    }
    return false;
  });

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
