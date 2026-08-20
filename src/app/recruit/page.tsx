"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Mail,
  User,
  Send,
  Download,
  Calendar,
  CheckCircle2,
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  FileText,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COHORT_STATS, DOMAINS } from "@/data/domains";
import { getAggregatedTechStack } from "@/utils/techAggregation";
import { FloatingBlobsBackground } from "@/components/backgrounds";

export default function RecruiterContactPage() {
  const totalTechs = getAggregatedTechStack().length;

  // Form State
  const [formData, setFormData] = useState({
    companyName: "",
    contactRep: "",
    corporateEmail: "",
    phone: "",
    engagementType: "Full-Time Campus Drive",
    preferredDate: "",
    additionalReqs: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const engagementOptions = [
    "Full-Time Campus Drive",
    "Internship + PPO Hiring",
    "Virtual Campus Drive",
    "Hackathon / Technical Challenge Sponsorship",
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.companyName.trim()) errs.companyName = "Company name is required";
    if (!formData.contactRep.trim()) errs.contactRep = "Contact representative is required";
    if (!formData.corporateEmail.trim()) {
      errs.corporateEmail = "Corporate email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.corporateEmail)) {
      errs.corporateEmail = "Please enter a valid work email address";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Recruiter Drive Request Submitted:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      companyName: "",
      contactRep: "",
      corporateEmail: "",
      phone: "",
      engagementType: "Full-Time Campus Drive",
      preferredDate: "",
      additionalReqs: "",
    });
    setErrors({});
  };

  return (
    <div className="relative min-h-screen bg-[#050608] text-white selection:bg-indigo-500 selection:text-white flex flex-col justify-between overflow-hidden">
      {/* Floating Organic Blobs behind glassmorphic form */}
      <FloatingBlobsBackground />

      {/* Global Navigation */}
      <Navbar />

      <main className="relative z-10 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        {/* Ambient Grid */}
        <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none" />

        {/* Page Hero Framing */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>PLACEMENT CYCLE 2026-2027 NOW OPEN</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Why Recruit From the <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              CS Class of 2026
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-3xl mx-auto font-sans leading-relaxed">
            Zero ramp-up friction. A calibrated cohort of {COHORT_STATS.totalEngineers} engineers with {COHORT_STATS.totalProjects} verified production repositories across {DOMAINS.length} core domains and {totalTechs}+ modern frameworks.
          </p>

          {/* Download Placement Brochure Button */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/placement-brochure-2026.pdf"
              download
              className="px-6 py-3.5 rounded-2xl font-mono text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all hover:scale-105 flex items-center gap-2.5"
            >
              <Download className="w-4 h-4 text-cyan-300" />
              <span>Download Placement Brochure (PDF)</span>
            </a>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Batch Stats · Syllabus · Drive Policies</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Contact Form & Placement Coordinator Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mb-16">
          
          {/* Left Column: Interactive Recruiter Engagement Desk Form */}
          <div className="lg:col-span-7">
            <div className="p-4 sm:p-10 rounded-3xl bg-[#090c15]/90 border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>RECRUITER ENGAGEMENT DESK</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Invite GCE Srirangam to Placement Drive
                </h2>

                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed font-sans">
                  Coordinate pre-placement talks, technical assessments, and interview drives with our 2026–2027 batch.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Placement Inquiry Received</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6 font-sans">
                    Thank you, <strong>{formData.contactRep}</strong> ({formData.companyName}). Our placement coordination cell will review your criteria and respond with slot confirmations within 24 business hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold font-mono text-xs transition-all shadow-lg cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  {/* Row 1: Company Name & Contact Representative */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Company / Organization *
                      </label>
                      <div className="relative flex items-center">
                        <Building2 className="absolute left-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="e.g. Google, Zoho, TCS"
                          className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-black/40 border text-white placeholder-slate-500 focus:outline-none transition-all ${
                            errors.companyName ? "border-rose-500 focus:ring-1 focus:ring-rose-500" : "border-white/10 focus:border-amber-400"
                          }`}
                        />
                      </div>
                      {errors.companyName && (
                        <span className="text-[10px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.companyName}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Contact Representative *
                      </label>
                      <div className="relative flex items-center">
                        <User className="absolute left-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.contactRep}
                          onChange={(e) => setFormData({ ...formData, contactRep: e.target.value })}
                          placeholder="HR Manager / Campus Recruiter"
                          className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-black/40 border text-white placeholder-slate-500 focus:outline-none transition-all ${
                            errors.contactRep ? "border-rose-500 focus:ring-1 focus:ring-rose-500" : "border-white/10 focus:border-amber-400"
                          }`}
                        />
                      </div>
                      {errors.contactRep && (
                        <span className="text-[10px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.contactRep}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Corporate Email & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Corporate Email *
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                        <input
                          type="email"
                          value={formData.corporateEmail}
                          onChange={(e) => setFormData({ ...formData, corporateEmail: e.target.value })}
                          placeholder="recruiter@company.com"
                          className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-black/40 border text-white placeholder-slate-500 focus:outline-none transition-all ${
                            errors.corporateEmail ? "border-rose-500 focus:ring-1 focus:ring-rose-500" : "border-white/10 focus:border-amber-400"
                          }`}
                        />
                      </div>
                      {errors.corporateEmail && (
                        <span className="text-[10px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.corporateEmail}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Phone / Mobile Number
                      </label>
                      <div className="relative flex items-center">
                        <Phone className="absolute left-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Engagement Type & Preferred Slot Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Engagement Type
                      </label>
                      <select
                        value={formData.engagementType}
                        onChange={(e) => setFormData({ ...formData, engagementType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-amber-400 transition-all"
                      >
                        {engagementOptions.map((opt, idx) => (
                          <option key={idx} value={opt} className="bg-[#090c15] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Preferred Slot / Date
                      </label>
                      <div className="relative flex items-center">
                        <Calendar className="absolute left-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all [color-scheme:dark]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Additional Requirements / Roles Offered */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">
                      Additional Requirements / Roles Offered
                    </label>
                    <textarea
                      rows={3}
                      value={formData.additionalReqs}
                      onChange={(e) => setFormData({ ...formData, additionalReqs: e.target.value })}
                      placeholder="Share details on roles, CTC package, eligibility criteria..."
                      className="w-full p-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all resize-none"
                    />
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-slate-300 font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-black uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all hover:scale-105 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5 text-black" />
                      <span>{isSubmitting ? "Submitting..." : "Submit Inquiry"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Placement Office & Institutional Contact Block */}
          <div className="lg:col-span-5 space-y-6">
            {/* Faculty Coordinator Block */}
            <div className="p-7 rounded-3xl bg-[#0c0f18]/80 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Department Placement Cell</h4>
                  <span className="text-xs font-mono text-slate-400">Office of Corporate Relations &amp; Drives</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-6">
                Government College of Engineering Srirangam faculty and student placement coordinators manage full logistics for on-campus presentation auditoriums, proctored coding labs, and remote interview panels.
              </p>

              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>placements.cse@gces.edu.in</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>+91 (0431) 290-7888</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  <span>Government College of Engineering Srirangam, Tiruchirappalli</span>
                </div>
              </div>
            </div>

            {/* Drive Process Roadmap */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-amber-950/20 to-black/40 border border-amber-500/20">
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-300 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>EXPEDITED PLACEMENT PROCESS</span>
              </h4>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">1</span>
                  <span className="text-slate-300">Submit job description &amp; shortlist criteria</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">2</span>
                  <span className="text-slate-300">Receive vetted candidate matrix &amp; live code repos</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">3</span>
                  <span className="text-slate-300">Host automated assessments or onsite interviews</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">4</span>
                  <span className="text-slate-300">Same-day offer rolling &amp; onboarding alignment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
