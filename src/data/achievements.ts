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
  institution: string;
  accentColor: string;
  gradientTheme: string;
}

export const STUDENT_ACHIEVEMENTS: StudentAchievement[] = [
  {
    id: "ach-1",
    indexStr: "01",
    tag: "OVERALL CHAMPIONS (2X)",
    tagType: "trophy",
    tagColor: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/30",
    },
    title: "Two-Time Overall Champions",
    subTitle: "Government College of Technology (GCT), Coimbatore",
    description:
      "Two-Time Overall Champions at Government College of Technology, Coimbatore, securing the championship title in two consecutive years.",
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
    title: "First Prize at Cipher Lab AI",
    subTitle: "National-Level AI Innovation Hackathon",
    description:
      "First Prize at Cipher Lab AI, a National-Level Hackathon, secured by CSE students.",
    institution: "GCE SRIRANGAM",
    accentColor: "#10B981",
    gradientTheme: "from-emerald-950/40 via-slate-900/60 to-black/80",
  },
  {
    id: "ach-3",
    indexStr: "03",
    tag: "TOP 500 NATIONWIDE",
    tagType: "hackathon",
    tagColor: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/30",
    },
    title: "Top 500 Finalists — Niral Thiruvizha 2026",
    subTitle: "Selected Out of 24,411 Registered Teams",
    description:
      "Two student teams selected among the Top 500 out of 24,411 registered teams at Niral Thiruvizha 2026.",
    institution: "GCE SRIRANGAM",
    accentColor: "#A855F7",
    gradientTheme: "from-purple-950/40 via-slate-900/60 to-black/80",
  },
  {
    id: "ach-4",
    indexStr: "04",
    tag: "100% INTERNSHIPS",
    tagType: "trophy",
    tagColor: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      border: "border-cyan-500/30",
    },
    title: "100% Internship Achievement",
    subTitle: "Full Eligible Cohort Industry Deployed",
    description:
      "100% Internship Achievement, with every eligible student successfully securing internship opportunities.",
    institution: "GCE SRIRANGAM",
    accentColor: "#06B6D4",
    gradientTheme: "from-cyan-950/40 via-slate-900/60 to-black/80",
  },
  {
    id: "ach-5",
    indexStr: "05",
    tag: "CAMPUS SOLUTIONS",
    tagType: "iot",
    tagColor: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/30",
    },
    title: "Student-Built Campus Solutions",
    subTitle: "Hostel App · BloodLine · Mess Reduction · No Due App",
    description:
      "Student-Built Campus Solutions — Our students have successfully designed, developed, and deployed innovative applications such as the Hostel App, BloodLine, Mess Reduction App, and No Due App, helping streamline and enhance campus operations.",
    institution: "GCE SRIRANGAM",
    accentColor: "#3B82F6",
    gradientTheme: "from-blue-950/40 via-slate-900/60 to-black/80",
  },
  {
    id: "ach-6",
    indexStr: "06",
    tag: "AI UPSKILLING",
    tagType: "upskilling",
    tagColor: {
      bg: "bg-pink-500/10",
      text: "text-pink-400",
      border: "border-pink-500/30",
    },
    title: "Generative AI Skillset Workshop",
    subTitle: "In Association with GUVI & HCL",
    description:
      "Generative AI Skillset Workshop conducted for department students in association with GUVI and HCL, strengthening their knowledge of emerging AI technologies.",
    institution: "GCE SRIRANGAM",
    accentColor: "#EC4899",
    gradientTheme: "from-pink-950/40 via-slate-900/60 to-black/80",
  },
  {
    id: "ach-7",
    indexStr: "07",
    tag: "ORACLE PROGRAM",
    tagType: "upskilling",
    tagColor: {
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      border: "border-rose-500/30",
    },
    title: "Oracle Java Learning Program",
    subTitle: "Online Learning Conducted by Oracle",
    description:
      "Oracle Java Learning Program — Department students successfully participated in an online Java learning program conducted by Oracle.",
    institution: "GCE SRIRANGAM",
    accentColor: "#F43F5E",
    gradientTheme: "from-rose-950/40 via-slate-900/60 to-black/80",
  },
];
