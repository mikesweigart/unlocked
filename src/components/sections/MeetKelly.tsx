import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const background = [
  {
    heading: "Education",
    items: [
      "Bachelor's in Psychology, University of Georgia",
      "Master's in Clinical Psychology, Pepperdine University",
    ],
  },
  {
    heading: "Experience",
    items: [
      "Child and family therapist in private practice",
      "First School Counselor at the Schenck School, Atlanta (2015)",
      "More than fifteen years with children and teens",
    ],
  },
  {
    heading: "Training",
    items: ["Orton-Gillingham", "Research-based literacy instruction"],
  },
  {
    heading: "Close to home",
    items: ["Native Atlantan, Marist School graduate", "Mom of three in Peachtree Corners"],
  },
];

export default function MeetKelly() {
  return (
    <section id="about" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionHeading eyebrow="Meet Kelly" title="She has sat on both sides of the table." />
          </Reveal>

          <Reveal className="mt-8 max-w-2xl space-y-5 text-[17px] leading-[1.8] text-ink-soft sm:text-lg">
            <p>
              Kelly Moore has more than fifteen years of clinical and educational
              experience working with children and teens. She began her career in private
              practice as a child and family therapist, working with neurodiverse children
              and adolescents.
            </p>
            <p>
              In 2015, the Schenck School hired Kelly as its first School Counselor.
              Schenck is a full immersion reading remediation school in Atlanta for
              students with dyslexia. Supporting students in kindergarten through sixth
              grade there gave her a close look at the world of dyslexia, and the school
              trained her in Orton-Gillingham and research-based literacy instruction.
            </p>
            <p>
              Over time, Kelly learned to recognize the patterns in each child&apos;s
              learning profile. Her work took on even more purpose when her own son was
              diagnosed with dyslexia in second grade.
            </p>
          </Reveal>

          <Reveal className="my-10 border-l-[3px] border-periwinkle pl-6">
            <p className="max-w-xl font-display font-semibold text-[1.5rem] leading-snug text-ink sm:text-[1.8rem]">
              She is known for advocating for students as if they were her own.
            </p>
          </Reveal>

          <Reveal className="max-w-2xl space-y-5 text-[17px] leading-[1.8] text-ink-soft sm:text-lg">
            <p>
              Having worked alongside families affected by dyslexia, ADHD, and
              language-based learning difficulties, and having raised a child with
              dyslexia herself, Kelly became a trusted resource for families navigating
              learning differences in the Atlanta area.
            </p>
            <p>
              She founded UnlockEd with a simple vision: give parents one place to process
              the overwhelming world of raising an outside-the-box learner, and walk that
              path alongside someone they trust.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:pt-16">
          <div className="rounded-3xl border border-line bg-white p-6 sm:p-8 lg:sticky lg:top-28">
            <div className="flex items-center gap-4 border-b border-line pb-6">
              <Image
                src="/kelly-moore.jpg"
                alt=""
                width={128}
                height={128}
                className="h-16 w-16 rounded-full object-cover object-[50%_25%]"
              />
              <div>
                <p className="font-display text-xl text-ink">Kelly Moore</p>
                <p className="text-[14px] text-ink-soft">Founder, UnlockEd</p>
              </div>
            </div>
            <dl className="divide-y divide-line">
              {background.map((group) => (
                <div key={group.heading} className="py-5">
                  <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-periwinkle-deep">
                    {group.heading}
                  </dt>
                  {group.items.map((item) => (
                    <dd key={item} className="mt-1.5 text-[15px] leading-snug text-ink">
                      {item}
                    </dd>
                  ))}
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
