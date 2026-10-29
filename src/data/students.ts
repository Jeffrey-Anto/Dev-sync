import { DOMAINS, type Domain } from "./domains";

export interface StudentLinks {
  portfolio?: string;
  github?: string;
  leetcode?: string;
  linkedin?: string;
  hackerrank?: string;
}

export interface Student {
  slug: string;
  name: string;
  year: string;
  role?: string;
  domainId?: string;
  tagline?: string;
  bio?: string;
  skills?: string[];
  links: StudentLinks;
  stats?: { label: string; value: string }[];
}

export const STUDENTS: Student[] = [
  {
    slug: "barath-b",
    name: "Barath B",
    year: "2023 – 2027",
    links: {
      github: "https://github.com/3DBarath",
      leetcode: "https://leetcode.com/u/LpkxOUY2H3/",
      linkedin: "https://www.linkedin.com/in/3dbarath/",
    },
  },
  {
    slug: "dhavaputhalvi-r",
    name: "Dhavaputhalvi R",
    year: "2023 – 2027",
    links: {
      portfolio:
        "https://portfolio-final-60064325153.development.catalystserverless.in/app/index.html",
      github: "https://github.com/Dhavaputhalvi",
      linkedin: "https://www.linkedin.com/in/dhavaputhalvi-r-2478512a6",
      hackerrank: "https://www.hackerrank.com/profile/dhavaputhalvira1",
    },
  },
  {
    slug: "dhanusha-baskaran",
    name: "Dhanusha Baskaran",
    year: "2023 – 2027",
    links: {
      portfolio: "https://dhanusha1909.github.io/Portfolio/",
      github: "https://github.com/Dhanusha1909/",
      leetcode: "https://leetcode.com/u/Dhanusha_Baskaran",
      linkedin: "https://www.linkedin.com/in/dhanusha-baskaran-6bb877297/",
    },
  },
  {
    slug: "harshavarthini-p",
    name: "Harshavarthini P",
    year: "2023 – 2027",
    links: {
      portfolio: "https://harshavarthini-p-portfolio.lovable.app/",
      github: "https://github.com/harshapalanivel5",
      leetcode: "https://leetcode.com/u/6TSGJIOdPa/",
      linkedin: "https://www.linkedin.com/in/harshavarthini-palanivel-a729662a5",
    },
  },
  {
    slug: "nisha-s",
    name: "Nisha S",
    year: "2023 – 2027",
    links: {
      linkedin: "https://www.linkedin.com/in/nisha-s-7b6b3b199",
    },
  },
  {
    slug: "lavanya-s-v",
    name: "Lavanya S V",
    year: "2023 – 2027",
    links: {
      github: "https://github.com/Lavanya2005-SV",
      linkedin: "https://www.linkedin.com/in/lavanya-s-v-30296a2a5",
    },
  },
  {
    slug: "avandika-b-n",
    name: "Avandika B N",
    year: "2023 – 2027",
    links: {
      portfolio: "https://avandika-dev.vercel.app/",
      github: "https://github.com/Avandika-07",
      linkedin: "https://www.linkedin.com/in/avandika-b-n-9b2151299",
    },
  },
  {
    slug: "k-sangameshwari",
    name: "K. Sangameshwari",
    year: "2023 – 2027",
    links: {
      portfolio: "https://sangameshwarik-protfolio.vercel.app/",
      github: "https://github.com/sangameshwarik",
      linkedin: "https://www.linkedin.com/in/sangameshwari-k-36aa4435a/",
    },
  },
  {
    slug: "suganya-m",
    name: "Suganya M",
    year: "2023 – 2027",
    links: {
      github: "https://github.com/suganya2307/Suganya-M",
      linkedin: "https://www.linkedin.com/in/suganya-m-b76059325",
    },
  },
  {
    slug: "saravanakumar-m",
    name: "Saravanakumar M",
    year: "2023 – 2027",
    domainId: "web-dev",
    links: {
      portfolio: "https://saravanawebdev.web.app",
      github: "https://github.com/Saravanaanandh",
      leetcode: "https://leetcode.com/u/SaravanaWebDev/",
      linkedin: "https://www.linkedin.com/in/saravanawebdev",
    },
  },
  {
    slug: "rifath-shifa-m",
    name: "Rifath Shifa M",
    year: "2023 – 2027",
    links: {
      portfolio: "https://shifagirl-portfolio.vercel.app",
      github: "https://github.com/rifathshifa",
      leetcode: "https://leetcode.com/u/LN9MepmyDn/",
      linkedin: "https://www.linkedin.com/in/rifathshifa/",
    },
  },
  {
    slug: "nanthana-s",
    name: "Nanthana S",
    year: "2023 – 2027",
    links: {
      portfolio: "https://nanthana2311.github.io/",
      github: "https://github.com/Nanthana2311",
      linkedin: "https://www.linkedin.com/in/nanthana-sengather-122a1b2a5",
    },
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
    return lastSegment === "index.html" ? segments[segments.length - 2] : lastSegment;
  }
  return trimmed.includes("//") ? new URL(trimmed).hostname.replace(/^www\./, "") : trimmed;
}

export function getLinkHost(url: string): string {
  const trimmed = url.replace(/^https?:\/\//, "").replace(/^www\./, "");
  return trimmed.split("/")[0];
}
