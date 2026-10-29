export default function GcesAboutSection() {
  return (
    <section aria-labelledby="about-gces" className="relative bg-[#050608] border-t border-white/5 py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* crawlable keyword-rich heading — visible but subtle */}
        <h2 id="about-gces" className="text-xl sm:text-2xl font-black tracking-tight text-white">
          GCES — Government College of Engineering Srirangam, Trichy
        </h2>
        <p className="mt-1 text-[11px] font-mono tracking-widest text-indigo-300">
          GCES · GCE Srirangam · GCES Trichy — Anna University Affiliated Government College
        </p>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300">
          <p>
            <strong className="text-slate-100">GCES</strong> is <strong className="text-slate-100">Government College of Engineering Srirangam</strong>, the government engineering college at Sethurapatti, Srirangam, Tiruchirappalli (Trichy), Tamil Nadu — affiliated to Anna University, Chennai. Commonly searched as <strong className="text-slate-100">GCES</strong>, <strong className="text-slate-100">GCES Trichy</strong> or <strong className="text-slate-100">GCE Srirangam</strong>, GCES offers B.E. Computer Science and Engineering among other branches.
          </p>
          <p>
            This site is the official showcase of <strong className="text-slate-100">GCES CSE Batch 2027</strong> — 60 GCES Computer Science undergrads (2023–2027) building 18+ production-grade systems across Web & Distributed Systems, AI/ML, Cloud & DevOps, Embedded IoT, Mobile and Cybersecurity. Every project listed here is built by GCES students at GCES Trichy and is open for campus recruitment through the GCES placement desk at <a href="/recruit" className="underline decoration-indigo-400 text-indigo-300 hover:text-white">gces.net.in/recruit</a>.
          </p>
          <p className="text-xs text-slate-400">
            Looking for GCES? You are at the right place — <a href="/" className="underline decoration-slate-600 hover:text-slate-200">gces.net.in</a> is the GCES CSE collective home. Explore <a href="/#domains" className="underline decoration-slate-600 hover:text-slate-200">GCES CSE domains</a>, <a href="/tech-stack" className="underline decoration-slate-600 hover:text-slate-200">GCES tech stack</a>, <a href="/achievements" className="underline decoration-slate-600 hover:text-slate-200">GCES achievements</a> and <a href="/domain/web-dev" className="underline decoration-slate-600 hover:text-slate-200">GCES projects</a>. GCES address: Sethurapatti, Trichy - Madurai Highway, Sethurapatti Road, Tiruchirappalli — 620012, Tamil Nadu. Official college site: <a href="https://gces.edu.in" target="_blank" rel="noopener noreferrer" className="underline decoration-slate-600 hover:text-slate-200">gces.edu.in</a> · Map: <a href="https://maps.app.goo.gl/pyyTRBHcbZ5gr4V19" target="_blank" rel="noopener noreferrer" className="underline decoration-slate-600 hover:text-slate-200">GCES on Google Maps</a> (10.6787021, 78.5996217).
          </p>
        </div>

        {/* visible FAQ — also powers FAQPage schema in JsonLd */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-sm font-bold tracking-widest text-white font-mono">GCES — FREQUENTLY ASKED</h3>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-slate-100">What is GCES?</dt>
              <dd className="mt-1 text-slate-400">GCES is Government College of Engineering Srirangam — a government engineering college in Srirangam, Trichy, also called GCE Srirangam or GCES Trichy, affiliated to Anna University.</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-100">Where is GCES located?</dt>
              <dd className="mt-1 text-slate-400">GCES is at Sethurapatti, Srirangam, Tiruchirappalli — 620012, Tamil Nadu, India, on the Trichy–Chennai corridor near Srirangam.</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-100">What is GCES CSE Batch 2027?</dt>
              <dd className="mt-1 text-slate-400">60 CSE undergrads at GCES (2023–2027) across 6 domains with 18+ live projects — the cohort showcased on this GCES site. Recruit GCES talent via the placement desk.</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
