import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = await readFile(path.join(root, "src/data/students.ts"), "utf8");
const blocks = source.split(/ {2}\{\n {4}slug: /).slice(1);

const roster = [];
for (const block of blocks) {
  const slug = block.match(/^"([^"]+)"/)?.[1];
  if (!slug) continue;
  const github = block.match(/github:\s*"([^"]+)"/)?.[1];
  const leetcode = block.match(/leetcode:\s*"([^"]+)"/)?.[1];
  roster.push({
    slug,
    github: github ? new URL(github).pathname.split("/").filter(Boolean)[0] : null,
    leetcode: leetcode ? leetcode.replace(/\/+$/, "").split("/").pop() : null,
  });
}

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let previous = {};
try {
  const existing = await readFile(path.join(root, "src/data/student-stats.json"), "utf8");
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

for (const student of roster) {
  const entry = { ...(previous[student.slug] ?? {}) };

  if (student.github) {
    try {
      const response = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(student.github)}?y=last`
      );
      if (response.ok) {
        const data = await response.json();
        if (typeof data?.total?.lastYear === "number") {
          entry.githubContributions = data.total.lastYear;
        }
      }
    } catch {
      console.warn(`github failed, kept previous: ${student.slug}`);
    }
    await pause(400);
  }

  if (student.leetcode) {
    try {
      const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "content-type": "application/json", "user-agent": "Mozilla/5.0" },
        body: JSON.stringify({ query: LEETCODE_QUERY, variables: { u: student.leetcode } }),
      });
      const data = await response.json();
      const progress = data?.data?.matchedUser?.submitStatsGlobal;
      const solved = progress?.acSubmissionNum?.find((row) => row.difficulty === "All")?.count;
      const submissions = progress?.totalSubmissionNum?.find((row) => row.difficulty === "All")?.count;
      if (typeof solved === "number") entry.leetcodeSolved = solved;
      if (typeof submissions === "number") entry.leetcodeSubmissions = submissions;
    } catch {
      console.warn(`leetcode failed, kept previous: ${student.slug}`);
    }
    await pause(900);
  }

  stats[student.slug] = entry;
  console.log(
    student.slug.padEnd(22),
    String(entry.githubContributions ?? "-").padStart(6),
    String(entry.leetcodeSolved ?? "-").padStart(6),
    String(entry.leetcodeSubmissions ?? "-").padStart(6)
  );
}

const output = {
  generatedAt: new Date().toISOString(),
  students: stats,
};

await writeFile(
  path.join(root, "src/data/student-stats.json"),
  `${JSON.stringify(output, null, 2)}\n`
);

console.log(`wrote ${Object.keys(stats).length} entries to src/data/student-stats.json`);
