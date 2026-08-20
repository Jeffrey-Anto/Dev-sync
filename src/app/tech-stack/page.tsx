"use client";

import React, { useMemo } from "react";
import Navbar from "@/components/Navbar";
import { IconCloud } from "@/components/magicui/icon-cloud";

const allSlugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "python",
  "rust",
  "go",
  "cplusplus",
  "c",
  "html5",
  "css3",
  "react",
  "flutter",
  "android",
  "nodedotjs",
  "express",
  "nextdotjs",
  "fastapi",
  "tailwindcss",
  "framer",
  "graphql",
  "docker",
  "kubernetes",
  "terraform",
  "amazonaws",
  "helm",
  "prometheus",
  "grafana",
  "nginx",
  "vercel",
  "firebase",
  "postgresql",
  "mongodb",
  "redis",
  "prisma",
  "pytorch",
  "huggingface",
  "opencv",
  "testinglibrary",
  "jest",
  "cypress",
  "sonarqube",
  "postman",
  "git",
  "github",
  "gitlab",
  "jira",
  "visualstudiocode",
  "androidstudio",
  "figma",
  "storybook",
  "kalilinux",
  "wireshark",
  "raspberrypi",
  "espressif",
];

const stackGroups = [
  { label: "Languages", slugs: ["typescript", "javascript", "dart", "java", "python", "rust", "go", "cplusplus", "c", "html5", "css3"] },
  { label: "Frameworks & Web", slugs: ["react", "flutter", "android", "nodedotjs", "express", "nextdotjs", "fastapi", "tailwindcss", "framer", "graphql"] },
  { label: "Cloud & DevOps", slugs: ["docker", "kubernetes", "terraform", "amazonaws", "helm", "prometheus", "grafana", "nginx", "vercel", "firebase"] },
  { label: "Databases", slugs: ["postgresql", "mongodb", "redis", "prisma"] },
  { label: "AI & ML", slugs: ["pytorch", "huggingface", "opencv"] },
  { label: "QA & Testing", slugs: ["testinglibrary", "jest", "cypress", "sonarqube", "postman"] },
  { label: "Version Control", slugs: ["git", "github", "gitlab", "jira", "visualstudiocode", "androidstudio"] },
  { label: "Design & Security", slugs: ["figma", "storybook", "kalilinux", "wireshark", "raspberrypi", "espressif"] },
];

export default function TechStackPage() {
  const images = useMemo(
    () => allSlugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`),
    []
  );

  return (
    <div className="relative w-full h-screen bg-[#040508] text-white overflow-hidden flex flex-col">
      <Navbar />

      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 flex-grow flex items-center justify-center w-full p-4 sm:p-8">
        <div className="relative flex size-full items-center justify-center overflow-hidden">
          <IconCloud images={images} groups={stackGroups} />
        </div>
      </div>
    </div>
  );
}