"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

export default function MobileCTABar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="bg-white/95 backdrop-blur-sm border-t border-gray-blue shadow-[0_-4px_16px_-2px_rgba(27,42,74,0.10)] px-3 py-2.5 flex items-center gap-2">
            <a
              href="#contact"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-sm active:scale-[0.98] transition-all duration-200 min-h-[44px]"
            >
              Start Free Consultation
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </a>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="flex items-center justify-center w-10 h-10 rounded-xl text-navy/30 hover:text-navy/60 hover:bg-gray-blue/60 transition-colors duration-150 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
