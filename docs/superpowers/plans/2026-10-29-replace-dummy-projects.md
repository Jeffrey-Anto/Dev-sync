# Replace Dummy Project Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace 7 dummy project slots across Web Development, AI/ML, Cloud/DevOps, and Mobile Systems with real verified projects (GCES Hostel Management System, OpenAccess, AD-NCM, Aztrox Release CLI, ConnectLnx KMP, Smart Expense Tracker, ExtraCam).

**Architecture:** Update `PROJECTS` in `src/data/domains.ts` as the single source of truth for the project catalog, modal views, and domain grids. Update in-device header labels in `MobileStickyProjectShowcase.tsx` to match the real mobile projects while preserving all existing animations, layouts, and component structures.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide React.

**Spec:** User instruction specifying verbatim project data mappings from `Documents/Automation/ResumeLoop/data/projects/*.md` (gceshostel.md, extracam.md, ncm.md, smet.md, aztrox-release.md, connectlnx.md) and `/home/barath/Documents/ExperimentalLab/OpenAccess`.

## Global Constraints
- Only replace the 7 targeted dummy project entries: `web-p1` (SyncMatrix), `web-p2` (HyperFlow), `ai-p2` (VigilEye), `cloud-p1` (KubePulse), `mob-p1` (FleetNav), `mob-p2` (CineSync), and `mob-p3` (PulsePay).
- Preserve existing project cards, modal layouts, badges, stat boxes, numbered problem/solution/outcome sections, architectural highlights, and tech chips.
- Ensure all replaced projects provide: `id`, `displayId`, `domainId`, `categoryBadge`, `title`, `oneLiner`, `description`, `problem`, `solution`, `outcome`, `architectureHighlights`, `metrics`, `techStack`, `repoLink`, and `liveLink`.
- Do not alter global layout, styling, animations, or component structures.
- Confirm zero references remain to the replaced dummy project titles.

## Review Focus
1. `displayId` and `categoryBadge` present on all 7 projects to match `ProjectDetailModal.tsx` requirements.
2. `metrics` array formatted with exactly 3 telemetry items per project to populate the stat telemetry grid.
3. `architectureHighlights` containing 3 key architectural pillars per project.
4. `techStack` accurately reflecting the actual technologies from the repository readmes.
5. Next.js build and TypeScript type-check passing cleanly.

---

### Task 1: Replace Web Development Dummy Projects (`web-p1` and `web-p2`)

**Files:**
- Modify: `src/data/domains.ts`

**Interfaces:**
- Updates `PROJECTS[0]` (`web-p1`) to **GCES Hostel Management System**
- Updates `PROJECTS[1]` (`web-p2`) to **OpenAccess Multimodal Bridge**

- [ ] **Step 1: Replace `web-p1` ("SyncMatrix Distributed Cache") with GCES Hostel Management System**
  - `id: "web-p1"`, `displayId: "WEB-P1"`, `domainId: "web-dev"`
  - `categoryBadge: "FULLSTACK WEB & BACKEND"`
  - `title: "GCES Hostel Management System"`
  - `oneLiner: "Hostel operations platform for Government College of Engineering, Srirangam managing token planning, daily attendance, and mess reconciliation."`
  - `repoLink: "https://github.com/3DBarath/GCESHostel"`
  - `liveLink: "https://play.google.com/store/apps/details?id=com.barath.gceshostel"`
  - Exact problem, solution, outcome, 3 metrics, 3 architectureHighlights, and full techStack.

- [ ] **Step 2: Replace `web-p2` ("HyperFlow Real-time Collaborative Canvas") with OpenAccess Multimodal Bridge**
  - `id: "web-p2"`, `displayId: "WEB-P2"`, `domainId: "web-dev"`
  - `categoryBadge: "ACCESSIBLE WEB & AI"`
  - `title: "OpenAccess Multimodal Bridge"`
  - `oneLiner: "Unified web accessibility platform delivering 3D avatar sign translation, real-time scene audio narration, and gesture-to-text AAC."`
  - `repoLink: "https://github.com/Benjamin23-B/OpenAccess"`
  - Exact problem, solution, outcome, 3 metrics, 3 architectureHighlights, and full techStack.

- [ ] **Step 3: Verification**
  - Run `npx tsc --noEmit` to verify type safety.

---

### Task 2: Replace AI / ML Dummy Project (`ai-p2`)

**Files:**
- Modify: `src/data/domains.ts`

**Interfaces:**
- Updates `PROJECTS` entry for `ai-p2` to **Adaptive-Depth Next-Concept Modeling (AD-NCM)**

- [ ] **Step 1: Replace `ai-p2` ("VigilEye Edge Computer Vision Guard") with AD-NCM**
  - `id: "ai-p2"`, `displayId: "AI-P2"`, `domainId: "ai-ml"`
  - `categoryBadge: "AI & MACHINE LEARNING RESEARCH"`
  - `title: "Adaptive-Depth Next-Concept Modeling (AD-NCM)"`
  - `oneLiner: "Coarse-to-fine hierarchical Transformer generation replacing autoregressive token length with fixed depth evaluations."`
  - `repoLink: "https://github.com/3DBarath/AD-NCM"`
  - `liveLink: "https://arxiv.org/abs/2610.14162"`
  - Exact problem, solution, outcome, 3 metrics (NFE, speedup, research paper), 3 architectureHighlights, and full techStack.

- [ ] **Step 2: Verification**
  - Run `npx tsc --noEmit` to verify type safety.

---

### Task 3: Replace Cloud & DevOps Dummy Project (`cloud-p1`)

**Files:**
- Modify: `src/data/domains.ts`

**Interfaces:**
- Updates `PROJECTS` entry for `cloud-p1` to **Aztrox Release CLI & CI/CD Engine**

- [ ] **Step 1: Replace `cloud-p1` ("KubePulse Ephemeral Cluster Orchestrator") with Aztrox Release CLI**
  - `id: "cloud-p1"`, `displayId: "CLOUD-P1"`, `domainId: "cloud-devops"`
  - `categoryBadge: "DEVOPS & RELEASE ENGINEERING"`
  - `title: "Aztrox Release CLI & CI/CD Engine"`
  - `oneLiner: "Unified local CI/CD engine managing building, cryptographic signing, rollback, and multi-target distribution across 6 channels."`
  - `repoLink: "https://github.com/3DBarath/aztrox-release"`
  - Exact problem, solution, outcome, 3 metrics, 3 architectureHighlights, and full techStack.

- [ ] **Step 2: Verification**
  - Run `npx tsc --noEmit` to verify type safety.

---

### Task 4: Replace Mobile Systems Dummy Projects (`mob-p1`, `mob-p2`, `mob-p3`)

**Files:**
- Modify: `src/data/domains.ts`

**Interfaces:**
- Updates `mob-p1` to **ConnectLnx KMP**
- Updates `mob-p2` to **Smart Expense Tracker (SMET)**
- Updates `mob-p3` to **ExtraCam Wireless Virtual Camera**

- [ ] **Step 1: Replace `mob-p1` ("FleetNav Offline Logistics Assistant") with ConnectLnx KMP**
  - `id: "mob-p1"`, `displayId: "MOB-P1"`, `domainId: "mobile-dev"`
  - `categoryBadge: "SYSTEMS, NETWORKING & KMP"`
  - `title: "ConnectLnx KMP"`
  - `oneLiner: "High-throughput peer-to-peer LAN file and clipboard sharing between Android and Desktop via Kotlin Multiplatform."`
  - `repoLink: "https://github.com/3DBarath/ConnectLnxKMP"`

- [ ] **Step 2: Replace `mob-p2` ("CineSync Remote Audio Monitor") with Smart Expense Tracker (SMET)**
  - `id: "mob-p2"`, `displayId: "MOB-P2"`, `domainId: "mobile-dev"`
  - `categoryBadge: "ANDROID & LOCAL-FIRST"`
  - `title: "Smart Expense Tracker (SMET)"`
  - `oneLiner: "Local-first Android personal finance and visual analytics app with proactive WorkManager budget alerts and biometric security."`
  - `repoLink: "https://github.com/3DBarath/Smart-Expense-Tracker"`

- [ ] **Step 3: Replace `mob-p3` ("PulsePay Offline Biometric POS") with ExtraCam Wireless Virtual Camera**
  - `id: "mob-p3"`, `displayId: "MOB-P3"`, `domainId: "mobile-dev"`
  - `categoryBadge: "MEDIA STREAMING & EMBEDDED SYSTEMS"`
  - `title: "ExtraCam Wireless Virtual Camera"`
  - `oneLiner: "Low-latency wireless audio and video streaming system turning Android devices into high-definition PC webcams and microphones."`
  - `repoLink: "https://github.com/3DBarath/ExtraCam"`

- [ ] **Step 4: Verification**
  - Run `npx tsc --noEmit` to verify type safety.

---

### Task 5: Align In-Device Headers in `MobileStickyProjectShowcase.tsx`

**Files:**
- Modify: `src/components/domain-themes/MobileStickyProjectShowcase.tsx`

**Interfaces:**
- Synchronize simulated in-phone header badges:
  - Phone Screen 1: ConnectLnx P2P Transfer banner (`P2P LAN TRANSFER`, `SocketChannel`)
  - Phone Screen 2: SMET Expense & Budget visual analytics (`SMET Analytics`, `Local Room DB`)
  - Phone Screen 3: ExtraCam AV streaming monitor (`ExtraCam Stream`, `1080p H.264 / AAC`)

- [ ] **Step 1: Update in-device mockup component text to match ConnectLnx, SMET, and ExtraCam**
- [ ] **Step 2: Ensure all existing animations and layouts remain completely intact**

---

### Task 6: Final Verification & Audit

**Files:**
- Check: `src/data/domains.ts`
- Check: `src/components/domain-themes/MobileStickyProjectShowcase.tsx`

- [ ] **Step 1: Check for remaining dummy names with `git grep`**
  - Verify that `SyncMatrix`, `HyperFlow`, `VigilEye`, `KubePulse`, `FleetNav`, `CineSync`, `PulsePay` are completely removed.
- [ ] **Step 2: Run production build**
  - `npm run build`
