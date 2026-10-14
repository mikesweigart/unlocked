import Link from "next/link";
import { BOOKING_URL, EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { Wordmark } from "./Navigation";

export default function Footer() {
  return (
    <footer className="no-print border-t border-line bg-cream">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" aria-label="UnlockEd home">
              <Wordmark />
            </Link>
            <p className="max-w-xs text-[15px] leading-relaxed text-ink-soft">
              Turning learning abilities into action. Educational support for families
              in Peachtree Corners and the Atlanta area.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-soft">Explore</p>
            <ul className="space-y-2 text-[15px]">
              {[
                { label: "About Kelly", href: "/#about" },
                { label: "How it works", href: "/#help" },
                { label: "Services", href: "/#services" },
                { label: "Understanding evaluations", href: "/#evaluations" },
                { label: "Resources", href: "/#resources" },
                { label: "Strengths Snapshot", href: "/assessment" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink hover:text-periwinkle-deep transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-soft">Contact</p>
            <ul className="space-y-2 text-[15px]">
              <li>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-periwinkle-deep transition-colors">
                  Book online
                </a>
              </li>
              <li>
                <a href={PHONE_HREF} className="text-ink hover:text-periwinkle-deep transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={EMAIL_HREF} className="break-all text-ink hover:text-periwinkle-deep transition-colors">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[13px] leading-relaxed text-ink-soft sm:flex-row sm:justify-between">
          <p className="max-w-2xl">
            UnlockEd provides educational support and guidance. It is not a medical or
            mental health treatment service, and nothing on this site is a diagnosis.
          </p>
          <p className="shrink-0">&copy; {new Date().getFullYear()} UnlockEd</p>
        </div>
      </div>
    </footer>
  );
}
