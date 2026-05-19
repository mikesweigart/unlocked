"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function MobileCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after the hero section — roughly 80vh
      setVisible(window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          {/* Gradient fade above the bar so content doesn't hard-cut */}
          <div className="h-6 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />

          <div className="bg-white border-t border-gray-blue shadow-[0_-8px_32px_-4px_rgba(27,42,74,0.12)] px-4 pt-3 pb-4 space-y-2">
            {/* Primary CTA */}
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-base hover:shadow-lg active:scale-[0.98] transition-all duration-200 min-h-[52px]"
            >
              Start Free Consultation
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>

            {/* Secondary row */}
            <div className="flex items-center gap-2">
              <Link
                href="/assessment"
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 border-teal/40 text-teal font-semibold text-sm active:scale-[0.98] transition-all duration-200 min-h-[44px]"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                Free Brain Strengths Quiz
              </Link>
            </div>

            <p className="text-center text-xs text-navy/35 leading-none">
              Free · Confidential · No obligation
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
