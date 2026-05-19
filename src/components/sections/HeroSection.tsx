"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface Particle {
  x: number; y: number; vx: number; vy: number; size: number; opacity: number;
}

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reduce particle count on mobile for performance
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 28 : 55;
    const CONNECTION_DIST = isMobile ? 90 : 130;

    let animId: number;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.4),
        vy: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.4),
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.45 + 0.15,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91,188,180,${p.opacity})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(74,144,217,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-[#1e3460] to-[#152038]">
      <NeuralCanvas />

      {/* Gradient orbs — hidden on tiny screens to reduce GPU load */}
      <div className="hidden sm:block absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-teal/10 blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-blue/10 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 pt-24 pb-16 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6 sm:space-y-8"
        >
          {/* Trust badge */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold shrink-0" />
              Neuroscience-backed guidance for families
            </div>
          </motion.div>

          {/* Headline — no forced line breaks, let it wrap naturally */}
          <motion.h1
            variants={fadeUp}
            className="text-[2.1rem] leading-tight sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight"
          >
            Your Child&apos;s Brain{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal via-blue to-teal">
              Isn&apos;t Broken.
            </span>{" "}
            It Just Works{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#e0bc74]">
              Differently.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/75 leading-relaxed"
          >
            UnlockEd helps families navigate learning challenges and discover the
            brain strengths hiding behind every diagnosis. You don&apos;t have to
            figure this out alone.
          </motion.p>

          {/* CTAs — stacked on mobile, row on sm+ */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-base sm:text-lg shadow-lg shadow-teal/30 hover:shadow-teal/50 transition-all duration-300 min-h-[52px]"
            >
              Schedule a Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
            </motion.a>
            <motion.a
              href="#assessment"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 rounded-xl border-2 border-white/30 text-white font-semibold text-base sm:text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 backdrop-blur-sm min-h-[52px]"
            >
              Discover Brain Strengths
            </motion.a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-white/55 text-xs sm:text-sm"
          >
            {["500+ families supported", "Evidence-based approaches", "Free initial consultation"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-6 h-6 text-white/35" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
