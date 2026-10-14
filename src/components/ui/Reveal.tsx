"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type State = "shown" | "waiting" | "revealed";

// Server HTML stays fully visible; only content that starts below the fold is hidden, and only after hydration.
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("shown");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setState("waiting");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("revealed");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={state === "revealed" && delay ? { transitionDelay: `${delay}s` } : undefined}
      className={cn(
        "transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]",
        state === "waiting" && "translate-y-3.5 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}
