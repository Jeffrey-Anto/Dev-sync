"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Mail,
  UserCheck,
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

export default function RecruiterContactPage() {
  const totalTechs = getAggregatedTechStack().length;

  // Form State
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    workEmail: "",
    roleType: "Full-Time Software Engineer (SDE)",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roleOptions = [
    "Full-Time Software Engineer (SDE)",
    "Distributed Systems / Backend Engineer",
    "AI / Machine Learning Engineer",
    "Cloud Architecture & DevOps Engineer",
    "Embedded Systems & Firmware Engineer",
    "Cybersecurity / Threat Analyst",
    "Bulk Cohort Hiring / Placement Drive (Multiple Roles)",
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.companyName.trim()) errs.companyName = "Company name is required";
    if (!formData.contactPerson.trim()) errs.contactPerson = "Contact person / title is required";
    if (!formData.workEmail.trim()) {
      errs.workEmail = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errs.workEmail = "Please enter a valid work email address";
    }
    if (!formData.message.trim()) errs.message = "Please include a brief message or tentative drive timeline";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate client-side submission logic
    setTimeout(() => {
      console.log("Recruiter Drive Request Submitted:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
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
          
          {/* Left Column: Interactive Contact & Drive Request Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-10 rounded-3xl bg-[#0c0f1a]/85 border border-white/15 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Schedule a Recruitment Drive</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Connect with our placement cell for slot reservations & candidate shortlisting.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Drive Request Received</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6 font-sans">
                    Thank you, <strong>{formData.contactPerson}</strong> ({formData.companyName}). Our placement coordination cell will review your criteria and respond with slot confirmations within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        companyName: "",
                        contactPerson: "",
                        workEmail: "",
                        roleType: "Full-Time Software Engineer (SDE)",
                        message: "",
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      COMPANY / ORGANIZATION NAME *
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g., Stripe, Datadog, Meta, Citadel"
                      className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-xs font-mono text-white placeholder-slate-500 focus:outline-none transition-all ${
                        errors.companyName ? "border-rose-500 focus:ring-1 focus:ring-rose-500" : "border-white/10 focus:border-indigo-400"
                      }`}
                    />
                    {errors.companyName && (
                      <span className="text-[11px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.companyName}
                      </span>
                    )}
                  </div>

                  {/* Contact Person & Work Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        CONTACT PERSON / TITLE *
                      </label>
                      <input
                        type="text"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="e.g., Jane Doe, University Recruiter"
                        className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-xs font-mono text-white placeholder-slate-500 focus:outline-none transition-all ${
                          errors.contactPerson ? "border-rose-500 focus:ring-1 focus:ring-rose-500" : "border-white/10 focus:border-indigo-400"
                        }`}
                      />
                      {errors.contactPerson && (
                        <span className="text-[11px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.contactPerson}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        CORPORATE WORK EMAIL *
                      </label>
                      <input
                        type="email"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="recruiting@company.com"
                        className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-xs font-mono text-white placeholder-slate-500 focus:outline-none transition-all ${
                          errors.workEmail ? "border-rose-500 focus:ring-1 focus:ring-rose-500" : "border-white/10 focus:border-indigo-400"
                        }`}
                      />
                      {errors.workEmail && (
                        <span className="text-[11px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.workEmail}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Role Type */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      PRIMARY ROLE TYPE / DOMAIN FOCUS
                    </label>
                    <select
                      value={formData.roleType}
                      onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-indigo-400"
                    >
                      {roleOptions.map((opt, idx) => (
                        <option key={idx} value={opt} className="bg-slate-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      MESSAGE & TENTATIVE TIMELINE *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details on candidate expectations, batch shortlist requirements, or preferred online assessment windows..."
                      className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-xs font-mono text-white placeholder-slate-500 focus:outline-none transition-all ${
                        errors.message ? "border-rose-500 focus:ring-1 focus:ring-rose-500" : "border-white/10 focus:border-indigo-400"
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[11px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING INQUIRY TELEMETRY...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-cyan-300" />
                        <span>SUBMIT PLACEMENT DRIVE INQUIRY</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Placement Office & Institutional Contact Block */}
          <div className="lg:col-span-5 space-y-6">
            {/* Faculty Coordinator Block */}
            <div className="p-7 rounded-3xl bg-[#0c0f18]/80 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Department Placement Cell</h4>
                  <span className="text-xs font-mono text-slate-400">Office of Corporate Relations & Drives</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-6">
                Our faculty and student placement coordinators manage full logistics for on-campus presentation auditoriums, proctored coding labs, and remote interview panels.
              </p>

              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>placements.cs@university.edu</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>+1 (800) 555-PLACEMENTS</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  <span>Computer Science Block, Room CS-401</span>
                </div>
              </div>
            </div>

            {/* Drive Process Roadmap */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-indigo-950/20 to-black/40 border border-indigo-500/20">
              <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-300 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>EXPEDITED PLACEMENT PROCESS</span>
              </h4>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">1</span>
                  <span className="text-slate-300">Submit job description & shortlist criteria</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">2</span>
                  <span className="text-slate-300">Receive vetted candidate matrix & live code repos</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">3</span>
                  <span className="text-slate-300">Host automated assessments or onsite interviews</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">4</span>
                  <span className="text-slate-300">Same-day offer rolling & onboarding alignment</span>
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
