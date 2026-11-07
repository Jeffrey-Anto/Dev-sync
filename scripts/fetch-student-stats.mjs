import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { STUDENTS } from "../src/data/students.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const statsFilePath = path.join(root, "src/data/student-stats.json");

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let previous = {};
try {
  const existing = await readFile(statsFilePath, "utf8");
  previous = JSON.parse(existing)?.students ?? {};
} catch {
  previous = {};
}

const LEETCODE_QUERY = `query userStats($u: String!) {
  matchedUser(username: $u) {
    submitStatsGlobal {
      acSubmissionNum { difficulty count }
      totalSubmissionNum { difficulty count }
    }
  }
}`;

const stats = {};

console.log(`Processing ${STUDENTS.length} students...`);
console.log("Slug".padEnd(24), "GitHub (All)", "LeetCode Solved", "Submissions");
console.log("-".repeat(70));

for (const student of STUDENTS) {
  const prev = previous[student.slug] ?? {};
  const entry = {
    name: student.name,
    links: { ...student.links },
    githubContributions: prev.githubContributions ?? 0,
    githubContributionsByYear: prev.githubContributionsByYear ?? {},
    leetcodeSolved: prev.leetcodeSolved ?? 0,
    leetcodeSubmissions: prev.leetcodeSubmissions ?? 0,
  };

  // GitHub: fetch all-time contributions across all years
  if (student.links?.github) {
    try {
      const username = new URL(student.links.github).pathname.split("/").filter(Boolean)[0];
      if (username) {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data?.total && typeof data.total === "object") {
            const yearKeys = Object.keys(data.total).filter((k) => !isNaN(Number(k)));
            const allTimeTotal = yearKeys.reduce((acc, y) => acc + (Number(data.total[y]) || 0), 0);
            entry.githubContributions = allTimeTotal;
            entry.githubContributionsByYear = data.total;
          }
        }
      }
    } catch (err) {
      console.warn(`GitHub fetch failed for ${student.slug}:`, err.message);
    }
    await pause(300);
  }

  // LeetCode: fetch all-time submissions & solved counts
  if (student.links?.leetcode) {
    try {
      const username = student.links.leetcode.replace(/\/+$/, "").split("/").pop();
      if (username) {
        const response = await fetch("https://leetcode.com/graphql", {
          method: "POST",
          headers: { "content-type": "application/json", "user-agent": "Mozilla/5.0" },
          body: JSON.stringify({ query: LEETCODE_QUERY, variables: { u: username } }),
        });
        const data = await response.json();
        const progress = data?.data?.matchedUser?.submitStatsGlobal;
        const solved = progress?.acSubmissionNum?.find((row) => row.difficulty === "All")?.count;
        const submissions = progress?.totalSubmissionNum?.find((row) => row.difficulty === "All")?.count;
        if (typeof solved === "number") entry.leetcodeSolved = solved;
        if (typeof submissions === "number") entry.leetcodeSubmissions = submissions;
      }
    } catch (err) {
      console.warn(`LeetCode fetch failed for ${student.slug}:`, err.message);
    }
    await pause(400);
  }

  stats[student.slug] = entry;

  console.log(
    student.slug.padEnd(24),
    String(entry.githubContributions ?? "-").padStart(12),
    String(entry.leetcodeSolved ?? "-").padStart(15),
    String(entry.leetcodeSubmissions ?? "-").padStart(12)
  );
}

const output = {
  generatedAt: new Date().toISOString(),
  students: stats,
};

await writeFile(statsFilePath, `${JSON.stringify(output, null, 2)}\n`);

console.log("\nDone!");
console.log(`Updated ${Object.keys(stats).length} students in src/data/student-stats.json with all-time stats & links.`);
