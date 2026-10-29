import { DOMAINS, type Domain } from "./domains";

export interface StudentLinks {
  portfolio?: string;
  github?: string;
  leetcode?: string;
}

export interface Student {
  slug: string;
  name: string;
  role: string;
  domainId: string;
  year: string;
  tagline: string;
  bio: string;
  skills: string[];
  links: StudentLinks;
  stats?: { label: string; value: string }[];
}

export const STUDENTS: Student[] = [
  {
    slug: "aravind-kumar",
    name: "Aravind Kumar",
    role: "Full-Stack Engineer",
    domainId: "web-dev",
    year: "2023 – 2027",
    tagline: "Builds fast interfaces and the systems behind them.",
    bio: "Works across the Next.js and FastAPI boundary. Ships internal tools for campus teams, then hardens them until they survive a full semester of real traffic.",
    skills: ["Next.js 16", "TypeScript", "FastAPI", "PostgreSQL", "Tailwind CSS v4", "Docker"],
    links: {
      portfolio: "https://aravind.dev",
      github: "https://github.com/aravindkumar",
      leetcode: "https://leetcode.com/u/aravindkumar",
    },
    stats: [
      { label: "Projects shipped", value: "9" },
      { label: "LeetCode solved", value: "420" },
      { label: "Public repos", value: "23" },
    ],
  },
  {
    slug: "meenakshi-sundaram",
    name: "Meenakshi Sundaram",
    role: "ML Engineer",
    domainId: "ai-ml",
    year: "2023 – 2027",
    tagline: "Turns model experiments into pipelines that hold up.",
    bio: "Fine-tunes small language models and builds retrieval pipelines with LangGraph. Careful about evaluation before anything reaches a demo.",
    skills: ["PyTorch", "Transformers", "LangGraph", "FastAPI", "Vector Search", "Python"],
    links: {
      github: "https://github.com/meenakshis",
      leetcode: "https://leetcode.com/u/meenakshis",
    },
    stats: [
      { label: "LeetCode solved", value: "310" },
      { label: "Public repos", value: "14" },
    ],
  },
  {
    slug: "priyadharshini-r",
    name: "Priyadharshini R",
    role: "Cloud & Platform Engineer",
    domainId: "cloud-devops",
    year: "2023 – 2027",
    tagline: "Keeps deployments boring, which is the goal.",
    bio: "Builds multi-region Kubernetes setups and CI pipelines that fail early. Writes runbooks before writing dashboards.",
    skills: ["Kubernetes", "Terraform", "AWS", "GitHub Actions", "Prometheus", "Go"],
    links: {
      portfolio: "https://priyadharshini.is-a.dev",
    },
  },
  {
    slug: "karthik-raja",
    name: "Karthik Raja",
    role: "Embedded Systems Engineer",
    domainId: "cybersecurity",
    year: "2023 – 2027",
    tagline: "Firmware, radios, and the odd packet capture.",
    bio: "Works on low-power sensor nodes and the firmware that keeps them alive. Prefers a logic analyser over a debugger when things get strange.",
    skills: ["ESP32", "Embedded C", "MQTT", "RTOS", "Wireshark", "PCB Design"],
    links: {},
  },
  {
    slug: "divya-bharathi",
    name: "Divya Bharathi",
    role: "Mobile Engineer",
    domainId: "mobile-dev",
    year: "2023 – 2027",
    tagline: "Ships Android apps that feel native, not ported.",
    bio: "Compose-first Android developer. Builds offline-first flows, then measures frame time until the jank is gone.",
    skills: ["Kotlin", "Jetpack Compose", "Room", "Coroutines", "Material 3", "Flutter"],
    links: {
      github: "https://github.com/divyabharathi",
      portfolio: "https://divya.dev",
    },
    stats: [
      { label: "Apps published", value: "4" },
      { label: "Public repos", value: "11" },
    ],
  },
  {
    slug: "sathish-kumar",
    name: "Sathish Kumar",
    role: "Security Analyst",
    domainId: "cybersecurity",
    year: "2023 – 2027",
    tagline: "Thinks about the request nobody else sent.",
    bio: "Runs CTFs, writes small exploit tools, and audits campus deployments for the boring mistakes that break them.",
    skills: ["Burp Suite", "Linux", "Python", "Nmap", "Cryptography", "OWASP"],
    links: {
      leetcode: "https://leetcode.com/u/sathishkumar",
    },
    stats: [{ label: "LeetCode solved", value: "260" }],
  },
  {
    slug: "nandhini-v",
    name: "Nandhini V",
    role: "Product Designer",
    domainId: "ui-ux",
    year: "2023 – 2027",
    tagline: "Designs the screen, then argues with the spacing.",
    bio: "Interface design with a bias toward systems: type scales, spacing tokens, and motion that explains rather than decorates.",
    skills: ["Figma", "Design Tokens", "Motion Design", "Accessibility", "Prototyping"],
    links: {
      portfolio: "https://nandhini.design",
      github: "https://github.com/nandhiniv",
    },
  },
  {
    slug: "jeevan-anand",
    name: "Jeevan Anand",
    role: "Distributed Systems Engineer",
    domainId: "web-dev",
    year: "2023 – 2027",
    tagline: "Interested in what happens when the second node arrives.",
    bio: "Builds service meshes, event streams, and the observability around them. Wants the failure mode documented before the feature ships.",
    skills: ["Spring Boot", "Kafka", "Redis", "gRPC", "Netflix Eureka", "Docker"],
    links: {
      portfolio: "https://jeevan.dev",
      github: "https://github.com/jeevananand",
      leetcode: "https://leetcode.com/u/jeevananand",
    },
    stats: [
      { label: "Projects shipped", value: "12" },
      { label: "LeetCode solved", value: "540" },
      { label: "Public repos", value: "31" },
    ],
  },
];

export function getStudent(slug: string): Student | undefined {
  return STUDENTS.find((student) => student.slug === slug);
}

export function getStudentDomain(student: Student): Domain | undefined {
  return DOMAINS.find((domain) => domain.id === student.domainId);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function getLinkHandle(url: string): string {
  const trimmed = url.replace(/\/+$/, "");
  const segments = trimmed.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  if (segments.length > 1 && lastSegment && !lastSegment.startsWith("www.")) {
    return lastSegment;
  }
  return trimmed.includes("//") ? new URL(trimmed).hostname.replace(/^www\./, "") : trimmed;
}
