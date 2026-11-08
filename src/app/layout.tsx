import type { Metadata, Viewport } from "next";
import Script from "next/script";
import JsonLd, { organizationJsonLd, websiteJsonLd } from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import {
  Outfit,
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
  DM_Sans,
  Space_Mono,
  Sora,
  Manrope,
  IBM_Plex_Mono,
  Geist,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";

/* Font Group 1: Hyper-Tech (Outfit + Inter + JetBrains Mono) */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

/* Groups 2-4 only apply after the user picks them in FontSelector, so they
   are not preloaded on every page; the browser fetches them on first use. */

/* Font Group 2: Cyber-Futuristic (Space Grotesk + DM Sans + Space Mono) */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

/* Font Group 3: Modern Editorial (Sora + Manrope + IBM Plex Mono) */
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

/* Baseline Font Group 4: Geist */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const fontVariables = [
  outfit.variable,
  inter.variable,
  jetbrainsMono.variable,
  spaceGrotesk.variable,
  dmSans.variable,
  spaceMono.variable,
  sora.variable,
  manrope.variable,
  ibmPlexMono.variable,
  geistSans.variable,
  geistMono.variable,
].join(" ");

const SITE_URL = "https://gces.net.in"; // ponytail: set NEXT_PUBLIC_SITE_URL or replace with real deploy URL
const SITE_NAME = "COLLECTIVE.CSE — GCES Trichy";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GCES CSE Batch 2027 — 60 Engineers | Government College of Engineering Srirangam, Trichy",
    template: "%s | GCES CSE Collective 2027",
  },
  description:
    "Hire 60 CSE undergrads — Government College of Engineering Srirangam (GCES), Trichy, Batch 2023–2027. 6 domains: Web & Distributed Systems, AI/ML, Cloud & DevOps, Embedded IoT, Mobile, Cybersecurity. 18+ live projects, hackathon champions, campus recruitment open.",
  keywords: [
    "Government College of Engineering Srirangam",
    "GCE Srirangam",
    "GCES Trichy",
    "GCES CSE",
    "CSE Batch 2027",
    "Computer Science batch 2027 Trichy",
    "hire CSE students Trichy",
    "campus recruitment GCE Srirangam",
    "GCES placement cell",
    "Trichy engineering college CSE",
    "collective CSE",
    "Web Development students",
    "AI ML students",
    "Cloud DevOps students",
  ],
  authors: [{ name: "GCES CSE Batch 2027 Collective", url: SITE_URL }],
  creator: "GCES CSE Batch 2027",
  publisher: "Government College of Engineering Srirangam — Dept. of CSE",
  category: "education",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "GCES CSE Batch 2027 — 60 Engineers · Government College of Engineering Srirangam",
    description:
      "60 CSE undergrads, 6 core domains, 18+ production projects. Government College of Engineering Srirangam, Trichy — Batch 2023–2027. Open for campus recruitment.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "GCES CSE Collective 2027 — 60 Minds, One Technical Collective" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GCES CSE Batch 2027 — 60 Engineers | GCES Trichy",
    description: "Hire GCES CSE 2027 — 60 engineers across Web, AI/ML, Cloud, IoT, Mobile, Cybersecurity. Trichy. Open for recruitment.",
    images: ["/opengraph-image"],
    creator: "@gces_cse",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    // add when you have Search Console: google: "YOUR_CODE", other: { "msvalidate.01": "BING_CODE" }
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fontVariables} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://cdn.simpleicons.org" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.simpleicons.org" />
        <Script
          id="devsync-font-group-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('devsync_font_group');
                  if (saved) {
                    document.documentElement.setAttribute('data-font-group', saved);
                  } else {
                    document.documentElement.setAttribute('data-font-group', 'hyper-tech');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#050608] text-slate-100 selection:bg-indigo-500 selection:text-white">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
