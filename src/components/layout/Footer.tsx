import Link from "next/link";
import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal to-blue flex items-center justify-center">
                <Brain className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Unlock<span className="text-teal">Ed</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Turning your learning ability into action. Neuroscience-backed guidance
              for families navigating learning challenges.
            </p>
            <p className="text-white/30 text-xs">
              &copy; {new Date().getFullYear()} UnlockEd. All rights reserved.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-white/80 text-xs font-bold uppercase tracking-widest">
              Explore
            </h4>
            <ul className="space-y-2">
              {[
                { label: "How It Works", href: "#how-it-works" },
                { label: "Learning Challenges", href: "#challenges" },
                { label: "Brain Strengths", href: "#strengths" },
                { label: "Free Assessment", href: "/assessment" },
                { label: "Free Parent Guide", href: "#guide" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-teal transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-white/80 text-xs font-bold uppercase tracking-widest">
              Get Help
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Schedule Consultation", href: "#contact" },
                { label: "About UnlockEd", href: "#about" },
                { label: "Resources", href: "#resources" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-teal transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>
            UnlockEd is an educational support service, not a medical provider. Always
            consult qualified professionals for clinical diagnoses.
          </p>
          <p className="shrink-0">
            Built with{" "}
            <span className="text-teal/60">neuroscience</span> and{" "}
            <span className="text-gold/60">heart</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
