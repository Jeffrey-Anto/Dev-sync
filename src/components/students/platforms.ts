import { Binary, Briefcase, Code2, GitBranch, Globe } from "lucide-react";
import type { StudentLinks } from "@/data/students";

export type PlatformKey = keyof StudentLinks;

export const PLATFORMS: Record<
  PlatformKey,
  {
    label: string;
    blurb: string;
    cta: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  portfolio: {
    label: "Portfolio",
    blurb: "Case studies, writing, and the work shipped end to end.",
    cta: "Open portfolio",
    icon: Globe,
  },
  github: {
    label: "GitHub",
    blurb: "Source, commit history, and open-source contributions.",
    cta: "Open GitHub",
    icon: GitBranch,
  },
  leetcode: {
    label: "LeetCode",
    blurb: "Problem-solving record and contest consistency.",
    cta: "Open LeetCode",
    icon: Code2,
  },
  linkedin: {
    label: "LinkedIn",
    blurb: "Professional profile, internships, and the working network.",
    cta: "Open LinkedIn",
    icon: Briefcase,
  },
  hackerrank: {
    label: "HackerRank",
    blurb: "Practice tracks, certifications, and challenge results.",
    cta: "Open HackerRank",
    icon: Binary,
  },
};

export const PLATFORM_ORDER: PlatformKey[] = [
  "portfolio",
  "github",
  "leetcode",
  "linkedin",
  "hackerrank",
];
