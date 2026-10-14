import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn("max-w-2xl space-y-4", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p
          className={cn(
            "text-[13px] font-semibold uppercase tracking-[0.14em]",
            tone === "dark" ? "text-periwinkle-deep" : "text-periwinkle"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-[2rem] leading-[1.15] sm:text-[2.6rem] font-medium tracking-[-0.01em]",
          tone === "dark" ? "text-ink" : "text-white"
        )}
      >
        {title}
      </h2>
      {intro && (
        <div className={cn("text-[17px] sm:text-lg leading-relaxed", tone === "dark" ? "text-ink-soft" : "text-white/75")}>
          {intro}
        </div>
      )}
    </div>
  );
}
