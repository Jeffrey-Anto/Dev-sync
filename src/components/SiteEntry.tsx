"use client";

import React, { useState } from "react";
import WaterLogoEntry from "@/components/WaterLogoEntry";

export default function SiteEntry({ children }: { children: React.ReactNode }) {
  const [isEntered, setIsEntered] = useState(false);

  return (
    <>
      <WaterLogoEntry isEntered={isEntered} onEnter={() => setIsEntered(true)} />
      <div
        className={`flex flex-col flex-grow transition-all duration-1000 ease-out ${
          isEntered
            ? "filter blur-0 scale-100 opacity-100"
            : "filter blur-[25px] scale-[0.97] opacity-20 pointer-events-none"
        }`}
      >
        {children}
      </div>
    </>
  );
}
