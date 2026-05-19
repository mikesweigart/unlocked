"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { ArrowRight, Phone, Check, Shield } from "lucide-react";

export default function FinalCTA() {
  const { ref, isInView } = useScrollReveal(0.1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [concern, setConcern] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-gradient-to-br from-navy to-[#152038] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-teal/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-blue/8 blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8 sm:space-y-12"
        >
          {/* Copy */}
          <motion.div variants={fadeUp} className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              You Don&apos;t Have to Navigate This{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-gold">
                Alone.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Let&apos;s find your child&apos;s strengths — together. Schedule a free, no-pressure
              conversation. Just clarity, compassion, and a clear path forward.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeUp}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-5 sm:p-8 md:p-10"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6 py-8"
                >
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-teal flex items-center justify-center">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-white">
                      We&apos;ve received your message!
                    </h3>
                    <p className="text-white/65">
                      Someone from UnlockEd will reach out within 24 hours to schedule
                      your free consultation. Check your email for a confirmation.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-teal text-sm font-medium">
                    <Shield className="w-4 h-4" />
                    Confidential · No spam · No obligation
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center space-y-1 mb-8">
                    <div className="flex items-center justify-center gap-2 text-teal mb-2">
                      <Phone className="w-5 h-5" />
                      <span className="font-semibold">Schedule Your Free Consultation</span>
                    </div>
                    <p className="text-white/50 text-sm">
                      Free · Confidential · No pressure
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:border-teal focus:outline-none transition-colors duration-200 text-base"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:border-teal focus:outline-none transition-colors duration-200 text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:border-teal focus:outline-none transition-colors duration-200 text-base"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                        Primary Challenge
                      </label>
                      <select
                        value={concern}
                        onChange={(e) => setConcern(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-teal focus:outline-none transition-colors duration-200 text-sm appearance-none"
                      >
                        <option value="" className="bg-navy">Select one...</option>
                        <option value="adhd" className="bg-navy">ADHD</option>
                        <option value="dyslexia" className="bg-navy">Dyslexia</option>
                        <option value="executive" className="bg-navy">Executive Functioning</option>
                        <option value="processing" className="bg-navy">Processing Challenges</option>
                        <option value="memory" className="bg-navy">Memory & Attention</option>
                        <option value="general" className="bg-navy">General Learning Differences</option>
                        <option value="unsure" className="bg-navy">Not Sure Yet</option>
                      </select>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-lg hover:shadow-xl hover:shadow-teal/25 transition-all duration-200 disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      <>
                        Schedule My Free Consultation
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>

                  <div className="flex flex-wrap justify-center gap-6 text-white/40 text-xs pt-2">
                    {["100% Free", "No Obligation", "Confidential", "Response within 24h"].map((item) => (
                      <span key={item} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-teal" />
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div variants={fadeUp} className="text-center">
            <p className="text-white/50 text-sm">
              Not ready to talk? Start with our free{" "}
              <a href="#assessment" className="text-teal underline hover:text-teal-light transition-colors">
                Brain Strengths Assessment
              </a>{" "}
              or{" "}
              <a href="#guide" className="text-teal underline hover:text-teal-light transition-colors">
                download the free Parent Guide
              </a>
              .
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
