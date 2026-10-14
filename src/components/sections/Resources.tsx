import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

type Item = { title: string; by?: string; note: string; href: string };

const books: Item[] = [
  {
    title: "Equipped for Reading Success",
    by: "David A. Kilpatrick",
    note: "A step-by-step program for building phonemic awareness and fluent word recognition.",
    href: "https://link.amazon/B0hDTddV5",
  },
  {
    title: "Overcoming Dyslexia",
    by: "Sally Shaywitz, M.D.",
    note: "A science-based guide to reading problems at any level, written for parents and teachers.",
    href: "https://link.amazon/B0a46pMMj",
  },
  {
    title: "The Dyslexic Advantage",
    by: "Brock L. Eide, M.D. & Fernette F. Eide, M.D.",
    note: "On the strengths and hidden potential of the dyslexic brain.",
    href: "https://link.amazon/B0bA9PNkO",
  },
  {
    title: "Fish in a Tree",
    by: "Lynda Mullaly Hunt",
    note: "A middle-grade novel about a girl with dyslexia, written for kids.",
    href: "https://link.amazon/B0i8luJQ2",
  },
];

const organizations: Item[] = [
  {
    title: "International Dyslexia Association",
    note: "Research, fact sheets, and guidance on dyslexia.",
    href: "https://dyslexiaida.org/",
  },
  {
    title: "Dyslexic Advantage",
    note: "Their work on the MIND strengths of dyslexic thinkers.",
    href: "https://www.dyslexicadvantage.org/dyslexic-mind-strengths/",
  },
  {
    title: "Learning Ally",
    note: "Audiobooks for students with dyslexia and reading differences.",
    href: "https://learningally.org",
  },
  {
    title: "Dyslexia Help, University of Michigan",
    note: "The many strengths of dyslexics, explained.",
    href: "https://dyslexiahelp.umich.edu/dyslexics/learn-about-dyslexia/what-is-dyslexia/the-many-strengths-of-dyslexics/",
  },
];

const tools: Item[] = [
  {
    title: "Scanmarker Pal reading pen",
    note: "Scans a line of printed text and reads it aloud.",
    href: "https://link.amazon/B0csEQqOq",
  },
  {
    title: "Guided reading strips",
    note: "Colored strips that help readers keep their place on the line.",
    href: "https://link.amazon/B07NzToK2",
  },
];

function Column({ heading, items }: { heading: string; items: Item[] }) {
  return (
    <div>
      <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-periwinkle-deep">{heading}</h3>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {items.map((it) => (
          <li key={it.title}>
            <a
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-4 py-5"
            >
              <span>
                <span className="block font-display text-[1.2rem] leading-snug text-ink group-hover:text-periwinkle-deep transition-colors">
                  {it.title}
                </span>
                {it.by && <span className="mt-0.5 block text-[14px] text-ink-soft">{it.by}</span>}
                <span className="mt-1.5 block text-[15px] leading-relaxed text-ink-soft">{it.note}</span>
              </span>
              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink-soft transition-colors group-hover:text-periwinkle-deep" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Resources() {
  return (
    <section id="resources" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Resources"
            title="Kelly's recommended reading and tools."
            intro={<p>A few of the books, organizations, and tools Kelly recommends to families.</p>}
          />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <Reveal>
            <Column heading="Books" items={books} />
          </Reveal>
          <Reveal delay={0.05}>
            <Column heading="Organizations" items={organizations} />
          </Reveal>
          <Reveal delay={0.1}>
            <Column heading="Helpful tools" items={tools} />
          </Reveal>
        </div>

        <p className="mt-8 text-[13px] text-ink-soft">Book and tool links open on Amazon.</p>
      </div>
    </section>
  );
}
