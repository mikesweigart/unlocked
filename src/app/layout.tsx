import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const title = "UnlockEd | Educational Support for Families | Kelly Moore";
const description =
  "UnlockEd is an educational support agency for families who suspect, or already know, their child learns differently. Founded by Kelly Moore in Peachtree Corners, Georgia.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    "dyslexia support Atlanta",
    "dyslexia screening Atlanta",
    "learning differences parent support",
    "psychoeducational evaluation review",
    "IEP and 504 meeting preparation",
    "working memory training",
    "Peachtree Corners educational support",
  ],
  openGraph: {
    title: "UnlockEd | Turning Learning Abilities into Action",
    description,
    siteName: "UnlockEd",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "UnlockEd | Turning Learning Abilities into Action",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-cream text-ink">{children}</body>
    </html>
  );
}
