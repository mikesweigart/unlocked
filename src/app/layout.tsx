import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "UnlockEd — Turning Your Learning Ability Into Action",
  description:
    "UnlockEd helps families navigate learning challenges and discover the brain strengths hiding behind every diagnosis. Expert guidance for ADHD, dyslexia, executive functioning, and more.",
  keywords: [
    "ADHD support for families",
    "dyslexia resources for parents",
    "executive functioning help for kids",
    "learning challenges support",
    "brain strengths training",
    "learning disability support",
    "neurodiversity education",
  ],
  openGraph: {
    title: "UnlockEd — Turning Your Learning Ability Into Action",
    description:
      "Helping families navigate learning challenges and discover the brain strengths hiding behind every diagnosis.",
    siteName: "UnlockEd",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UnlockEd — Turning Your Learning Ability Into Action",
    description:
      "Helping families navigate learning challenges and discover the brain strengths hiding behind every diagnosis.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-off-white text-navy">
        {children}
      </body>
    </html>
  );
}
