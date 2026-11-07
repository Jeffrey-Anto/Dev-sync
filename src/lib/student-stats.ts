import { cache } from "react";
import { unstable_cache } from "next/cache";
import { STUDENTS } from "@/data/students";
import fallback from "@/data/student-stats.json";

export type StudentStatsEntry = {
  githubContributions?: number;
  githubContributionsByYear?: Record<string, number>;
  leetcodeSolved?: number;
  leetcodeSubmissions?: number;
};

export type StudentStats = Record<string, StudentStatsEntry>;

const LEETCODE_QUERY = `query userStats($u: String!) {
  matchedUser(username: $u) {
    submitStatsGlobal {
      acSubmissionNum { difficulty count }
      totalSubmissionNum { difficulty count }
    }
  }
}`;

const FALLBACK = (fallback.students ?? {}) as StudentStats;

async function fetchOne(slug: string, githubUrl?: string, leetcodeUrl?: string): Promise<StudentStatsEntry> {
  const prev = FALLBACK[slug] ?? {};
  const entry: StudentStatsEntry = {
    githubContributions: prev.githubContributions ?? 0,
    githubContributionsByYear: prev.githubContributionsByYear ?? {},
    leetcodeSolved: prev.leetcodeSolved ?? 0,
    leetcodeSubmissions: prev.leetcodeSubmissions ?? 0,
  };

  const jobs: Promise<void>[] = [];

  if (githubUrl) {
    jobs.push((async () => {
      try {
        const username = new URL(githubUrl).pathname.split("/").filter(Boolean)[0];
        if (!username) return;
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}`,
          { next: { revalidate: 86400 }, signal: AbortSignal.timeout(10000) }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data?.total && typeof data.total === "object") {
          const keys = Object.keys(data.total).filter((k) => !Number.isNaN(Number(k)));
          const total = keys.reduce((acc, y) => acc + (Number(data.total[y]) || 0), 0);
          entry.githubContributions = total;
          entry.githubContributionsByYear = data.total;
        }
      } catch {
        /* keep stale */
      }
    })());
  }

  if (leetcodeUrl) {
    jobs.push((async () => {
      try {
        const username = leetcodeUrl.replace(/\/+$/, "").split("/").pop();
        if (!username) return;
        const res = await fetch("https://leetcode.com/graphql", {
          method: "POST",
          headers: { "content-type": "application/json", "user-agent": "Mozilla/5.0" },
          body: JSON.stringify({ query: LEETCODE_QUERY, variables: { u: username } }),
          next: { revalidate: 86400 },
          signal: AbortSignal.timeout(10000),
        });
        if (!res.ok) return;
        const data = await res.json();
        const progress = data?.data?.matchedUser?.submitStatsGlobal;
        const solved = progress?.acSubmissionNum?.find((row: { difficulty: string }) => row.difficulty === "All")?.count;
        const submissions = progress?.totalSubmissionNum?.find((row: { difficulty: string }) => row.difficulty === "All")?.count;
        if (typeof solved === "number") entry.leetcodeSolved = solved;
        if (typeof submissions === "number") entry.leetcodeSubmissions = submissions;
      } catch {
        /* keep stale */
      }
    })());
  }

  await Promise.all(jobs);
  return entry;
}

async function fetchAll(): Promise<StudentStats> {
  const entries = await Promise.allSettled(
    STUDENTS.map((s) => fetchOne(s.slug, s.links?.github, s.links?.leetcode))
  );
  const out: StudentStats = {};
  STUDENTS.forEach((s, i) => {
    const r = entries[i];
    out[s.slug] = r.status === "fulfilled" ? r.value : (FALLBACK[s.slug] ?? {});
  });
  return out;
}

const cachedFetchAll = unstable_cache(fetchAll, ["student-stats"], {
  revalidate: 86400,
  tags: ["student-stats"],
});

export const getStudentStats = cache(async (): Promise<StudentStats> => {
  try {
    return await cachedFetchAll();
  } catch {
    return FALLBACK;
  }
});
