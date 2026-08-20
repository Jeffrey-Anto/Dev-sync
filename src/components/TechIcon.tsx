"use client";

import React, { useState } from "react";
import Image from "next/image";

interface TechIconProps {
  slug: string;
  cdnSlug?: string;
  name: string;
  color?: string;
  size?: number;
  className?: string;
}

const CDN_ALIAS: Record<string, string> = {
  java: "openjdk",
  css3: "css",
  cplusplus: "cplusplus",
  visualstudiocode: "visualstudiocode",
  androidstudio: "androidstudio",
  nextdotjs: "nextdotjs",
  nodedotjs: "nodedotjs",
};

export default function TechIcon({
  slug,
  cdnSlug,
  name,
  color = "#6366F1",
  size = 28,
  className = "",
}: TechIconProps) {
  const [hasError, setHasError] = useState(false);
  const [useFallbackCdn, setUseFallbackCdn] = useState(false);

  const resolvedSlug = cdnSlug || CDN_ALIAS[slug] || slug;

  const primaryUrl = `https://cdn.simpleicons.org/${resolvedSlug}`;
  const fallbackUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${resolvedSlug}.svg`;
  const currentUrl = useFallbackCdn ? fallbackUrl : primaryUrl;

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg font-mono font-bold text-xs uppercase select-none transition-all ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: `${color}18`,
          color: color,
          border: `1px solid ${color}40`,
        }}
        title={name}
      >
        {name.slice(0, 2)}
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center rounded-lg shrink-0 overflow-hidden transition-all ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        src={currentUrl}
        alt={name}
        width={size}
        height={size}
        className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-200 group-hover:scale-110"
        loading="lazy"
        onError={() => {
          if (!useFallbackCdn) {
            setUseFallbackCdn(true);
          } else {
            setHasError(true);
          }
        }}
      />
    </div>
  );
}
