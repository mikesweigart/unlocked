"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X } from "lucide-react";
import { BOOKING_URL, PHONE_HREF } from "@/lib/site";

export default function MobileCTABar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 700;
      setVisible(window.scrollY > window.innerHeight * 0.9 && !nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.25 }}
          className="no-print fixed inset-x-0 bottom-0 z-40 lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex items-center gap-2 border-t border-line bg-cream/95 px-3 py-2.5 backdrop-blur">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] flex-1 items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-white"
            >
              Book a session
            </a>
            <a
              href={PHONE_HREF}
              aria-label="Call UnlockEd"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Hide booking bar"
              className="flex h-11 w-9 shrink-0 items-center justify-center text-ink-soft"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
