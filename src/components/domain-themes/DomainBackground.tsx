"use client";

import React, { Suspense, lazy } from "react";

const WebDevTheme = lazy(() => import("./WebDevTheme"));
const AiMlTheme = lazy(() => import("./AiMlTheme"));
const CloudDevOpsTheme = lazy(() => import("./CloudDevOpsTheme"));
const EmbeddedIotTheme = lazy(() => import("./EmbeddedIotTheme"));
const UiUxTheme = lazy(() => import("./UiUxTheme"));
const MobileDevTheme = lazy(() => import("./MobileDevTheme"));
const CybersecurityTheme = lazy(() => import("./CybersecurityTheme"));

interface DomainBackgroundProps {
  domainId: string;
}

export default function DomainBackground({ domainId }: DomainBackgroundProps) {
  const renderTheme = () => {
    switch (domainId) {
      case "web-dev":
        return <WebDevTheme />;
      case "ai-ml":
        return <AiMlTheme />;
      case "cloud-devops":
        return <CloudDevOpsTheme />;
      case "ui-ux":
        return <UiUxTheme />;
      case "embedded-iot":
        return <EmbeddedIotTheme />;
      case "mobile-dev":
        return <MobileDevTheme />;
      case "cybersecurity":
        return <CybersecurityTheme />;
      default:
        return <WebDevTheme />;
    }
  };

  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 bg-[#050608] pointer-events-none" />
      }
    >
      {renderTheme()}
    </Suspense>
  );
}
