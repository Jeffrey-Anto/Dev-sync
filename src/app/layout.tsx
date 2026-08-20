import type { Metadata } from "next";
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

/* Font Group 2: Cyber-Futuristic (Space Grotesk + DM Sans + Space Mono) */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

/* Font Group 3: Modern Editorial (Sora + Manrope + IBM Plex Mono) */
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Baseline Font Group 4: Geist */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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

export const metadata: Metadata = {
  title: "COLLECTIVE.CSE",
  description:
    "A collective engineering showcase of 60 Computer Science undergraduates across 6 core domains: Web Systems, AI/ML, Cloud DevOps, Embedded IoT, Mobile, and Cybersecurity.",
  keywords: [
    "Computer Science Placement",
    "Campus Recruitment",
    "Engineering Showcase",
    "Full-Stack Web",
    "AI/ML",
    "Cloud Architecture",
    "DevOps",
    "Cybersecurity",
    "Embedded Systems",
  ],
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
        <script
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
        {children}
      </body>
    </html>
  );
}
