import { DOMAINS, PROJECTS, Domain, Project } from "@/data/domains";

export interface AggregatedTech {
  name: string;
  category: "Language" | "Framework" | "Cloud & DevOps" | "AI & ML" | "Systems & Embedded" | "Security & Data";
  studentCount: number;
  projectCount: number;
  domainIds: string[];
  domainNames: string[];
  color: string;
  size: number;
}

export function getAggregatedTechStack(): AggregatedTech[] {
  const techMap = new Map<
    string,
    {
      name: string;
      category: AggregatedTech["category"];
      studentCount: number;
      projectCount: number;
      domainIds: Set<string>;
      color: string;
    }
  >();

  // Helper to categorize tech
  const categorizeTech = (name: string): AggregatedTech["category"] => {
    const lower = name.toLowerCase();
    if (["python", "typescript", "rust", "go", "c/c++", "c", "c++", "kotlin", "swift", "dart"].includes(lower)) {
      return "Language";
    }
    if (["next.js", "react native", "flutter", "fastapi", "graphql", "tailwind css", "jetpack compose", "yjs"].includes(lower)) {
      return "Framework";
    }
    if (["kubernetes", "docker", "terraform", "aws", "github actions", "prometheus", "grafana", "argocd", "helm", "aws eks"].includes(lower)) {
      return "Cloud & DevOps";
    }
    if (["pytorch", "hugging face", "langchain", "vector dbs", "onnx", "cuda", "scikit-learn", "qdrant", "llama-3", "yolov9", "tensorrt", "whisper-medium", "fastspeech2"].includes(lower)) {
      return "AI & ML";
    }
    if (["freertos", "esp32", "mqtt", "can bus", "raspberry pi", "platformio", "stm32f4", "nrf52840", "ble 5.0", "arm cmsis-dsp"].includes(lower)) {
      return "Systems & Embedded";
    }
    return "Security & Data";
  };

  // 1. Ingest from Domains
  DOMAINS.forEach((domain) => {
    domain.techStack.forEach((tech) => {
      const existing = techMap.get(tech) || {
        name: tech,
        category: categorizeTech(tech),
        studentCount: 0,
        projectCount: 0,
        domainIds: new Set<string>(),
        color: domain.colorTheme.primary,
      };

      existing.studentCount += Math.round(domain.studentCount * 0.85);
      existing.domainIds.add(domain.id);
      techMap.set(tech, existing);
    });
  });

  // 2. Ingest from Projects
  PROJECTS.forEach((project) => {
    const domain = DOMAINS.find((d) => d.id === project.domainId);
    project.techStack.forEach((tech) => {
      const existing = techMap.get(tech) || {
        name: tech,
        category: categorizeTech(tech),
        studentCount: domain ? Math.round(domain.studentCount * 0.6) : 6,
        projectCount: 0,
        domainIds: new Set<string>(),
        color: domain ? domain.colorTheme.primary : "#6366F1",
      };

      existing.projectCount += 1;
      if (domain) {
        existing.domainIds.add(domain.id);
      }
      techMap.set(tech, existing);
    });
  });

  // Calculate proportional 3D node size
  const list: AggregatedTech[] = Array.from(techMap.values()).map((item) => {
    const domainNames = Array.from(item.domainIds).map(
      (id) => DOMAINS.find((d) => d.id === id)?.shortName || id
    );

    // Normalize student count between 6 and 60
    const clampedStudents = Math.min(Math.max(item.studentCount, 8), 56);
    // Size between 0.35 and 1.15
    const size = 0.35 + (clampedStudents / 60) * 0.85;

    return {
      name: item.name,
      category: item.category,
      studentCount: clampedStudents,
      projectCount: Math.max(item.projectCount, 1),
      domainIds: Array.from(item.domainIds),
      domainNames,
      color: item.color,
      size,
    };
  });

  return list.sort((a, b) => b.studentCount - a.studentCount);
}
