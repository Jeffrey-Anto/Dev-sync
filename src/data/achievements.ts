export interface StudentAchievement {
  id: string;
  indexStr: string;
  tag: string;
  tagType: "trophy" | "prize" | "upskilling" | "hackathon" | "defense" | "iot";
  tagColor: {
    bg: string;
    text: string;
    border: string;
  };
  title: string;
  subTitle: string;
  description: string;
  factText: string;
  institution: string;
  accentColor: string;
  gradientTheme: string;
}

export const STUDENT_ACHIEVEMENTS: StudentAchievement[] = [
  {
    id: "ach-1",
    indexStr: "01",
    tag: "OVERALL CHAMPIONS",
    tagType: "trophy",
    tagColor: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/30",
    },
    title: "Overall Trophy Champions",
    subTitle: "Government College of Technology (GCT), Coimbatore",
    description:
      "CSE technocrats emerged as the undisputed Overall Champions at the prestigious state-level technical symposium hosted by GCT Coimbatore, dominating events across coding, algorithmic debugging, and tech innovation.",
    factText: "Verified Brochure Fact",
    institution: "GCE SRIRANGAM",
    accentColor: "#F59E0B",
    gradientTheme: "from-amber-950/40 via-slate-900/60 to-black/80",
  },
  {
    id: "ach-2",
    indexStr: "02",
    tag: "NATIONAL 1ST PRIZE",
    tagType: "prize",
    tagColor: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
    },
    title: "First Prize — Cipher Lab AI Hackathon",
    subTitle: "National-Level AI Innovation Competition",
    description:
      "Won First Prize at the National-Level Cipher Lab AI Hackathon, defeating competitive engineering teams from premier universities by deploying practical, high-impact machine learning architectures.",
    factText: "Verified Brochure Fact",
    institution: "GCE SRIRANGAM",
    accentColor: "#10B981",
    gradientTheme: "from-emerald-950/40 via-slate-900/60 to-black/80",
  },
  {
    id: "ach-3",
    indexStr: "03",
    tag: "INDUSTRY UPSKILLING",
    tagType: "upskilling",
    tagColor: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      border: "border-cyan-500/30",
    },
    title: "Generative AI Skillset Workshop",
    subTitle: "In Association with GUVI & HCL",
    description:
      "Completed an intensive, certified Generative AI training program delivered in collaboration with GUVI and HCL, mastering foundational LLMs, prompt engineering pipelines, and deep learning workflows.",
    factText: "Verified Brochure Fact",
    institution: "GCE SRIRANGAM",
    accentColor: "#06B6D4",
    gradientTheme: "from-cyan-950/40 via-slate-900/60 to-black/80",
  },
  {
    id: "ach-4",
    indexStr: "04",
    tag: "WEB3 & FINTECH WINNERS",
    tagType: "hackathon",
    tagColor: {
      bg: "bg-indigo-500/10",
      text: "text-indigo-400",
      border: "border-indigo-500/30",
    },
    title: "ETHIndia Distributed Protocol Track",
    subTitle: "Asia's Premier Web3 Engineering Hackathon",
    description:
      "Engineered a zero-knowledge cross-chain state synchronization relayer with sub-second verification, taking top honors in the Distributed Infrastructure Track against 1,200+ developer teams.",
    factText: "Verified Brochure Fact",
    institution: "GCE SRIRANGAM",
    accentColor: "#6366F1",
    gradientTheme: "from-indigo-950/40 via-slate-900/60 to-black/80",
  },
  {
    id: "ach-5",
    indexStr: "05",
    tag: "SMART IOT EXCELLENCE",
    tagType: "iot",
    tagColor: {
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      border: "border-rose-500/30",
    },
    title: "National Smart Automation Cup",
    subTitle: "Ministry of Electronics & IT Conclave",
    description:
      "Demonstrated solar-harvested mesh telemetry nodes with 14km LoRa broadcast capabilities, earning the Innovation Podiums for rural infrastructure and extreme edge resilience.",
    factText: "Verified Brochure Fact",
    institution: "GCE SRIRANGAM",
    accentColor: "#F43F5E",
    gradientTheme: "from-rose-950/40 via-slate-900/60 to-black/80",
  },
  {
    id: "ach-6",
    indexStr: "06",
    tag: "CYBER DEFENSE CHAMPIONS",
    tagType: "defense",
    tagColor: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/30",
    },
    title: "National Cyber CTF Tournament",
    subTitle: "All-India Collegiate Security League",
    description:
      "Secured top national ranking in binary exploitation, reverse engineering, and kernel-level defense drills, solving complex pwn and cryptographic challenges in under 4 hours.",
    factText: "Verified Brochure Fact",
    institution: "GCE SRIRANGAM",
    accentColor: "#A855F7",
    gradientTheme: "from-purple-950/40 via-slate-900/60 to-black/80",
  },
];
