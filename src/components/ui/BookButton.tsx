import { ArrowUpRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function BookButton({
  children = "Book a free 10-minute call",
  variant = "solid",
  className,
}: {
  children?: React.ReactNode;
  variant?: "solid" | "light";
  className?: string;
}) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-colors duration-200 min-h-[48px]",
        variant === "solid"
          ? "bg-ink text-white hover:bg-[#123f82]"
          : "bg-white text-ink hover:bg-periwinkle-wash",
        className
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
