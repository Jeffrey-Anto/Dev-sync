"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  User,
  Mail,
  Phone,
  Calendar,
  Send,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecruiterModal({ isOpen, onClose }: RecruiterModalProps) {
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

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.companyName.trim()) errs.companyName = "Company name is required";
    if (!formData.contactRep.trim()) errs.contactRep = "Contact representative is required";
    if (!formData.corporateEmail.trim()) {
      errs.corporateEmail = "Corporate email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.corporateEmail)) {
      errs.corporateEmail = "Please enter a valid work email";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Recruiter Inquiry Submitted:", formData);
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
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090c15] border border-white/15 p-4 sm:p-8 shadow-2xl z-10 my-auto text-white"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Modal"
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-5 sm:mb-6 pr-6 sm:pr-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>RECRUITER ENGAGEMENT DESK</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
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
                className="py-10 text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Placement Inquiry Received</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6 font-sans">
                  Thank you, <strong>{formData.contactRep}</strong> ({formData.companyName}). Our placement coordination cell will review your criteria and get in touch within 24 hours.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs transition-all shadow-lg cursor-pointer"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {/* Row 1: Company Name & Contact Rep */}
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
                          errors.companyName ? "border-rose-500" : "border-white/10 focus:border-amber-400"
                        }`}
                      />
                    </div>
                    {errors.companyName && (
                      <span className="text-[10px] text-rose-400 mt-1 block">
                        {errors.companyName}
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
                          errors.contactRep ? "border-rose-500" : "border-white/10 focus:border-amber-400"
                        }`}
                      />
                    </div>
                    {errors.contactRep && (
                      <span className="text-[10px] text-rose-400 mt-1 block">
                        {errors.contactRep}
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
                          errors.corporateEmail ? "border-rose-500" : "border-white/10 focus:border-amber-400"
                        }`}
                      />
                    </div>
                    {errors.corporateEmail && (
                      <span className="text-[10px] text-rose-400 mt-1 block">
                        {errors.corporateEmail}
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
                      <option value="Full-Time Campus Drive" className="bg-[#090c15] text-white">Full-Time Campus Drive</option>
                      <option value="Internship + PPO Hiring" className="bg-[#090c15] text-white">Internship + PPO Hiring</option>
                      <option value="Virtual Campus Drive" className="bg-[#090c15] text-white">Virtual Campus Drive</option>
                      <option value="Hackathon / Technical Sponsorship" className="bg-[#090c15] text-white">Hackathon / Technical Sponsorship</option>
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
                    onClick={onClose}
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
