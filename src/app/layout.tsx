import type { Metadata } from "next";
import localFont from "next/font/local";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Self-hosted (src/app/fonts, the latin variable file Google serves) rather
// than next/font/google, which fetches it from Google at BUILD time. Google
// Fonts sometimes answers with "/l/font?kit=" URLs that Turbopack cannot parse
// (vercel/next.js #99114); the build fails, and a failed Vercel build freezes
// production on the last good deploy without a word. Same CSS variable.
const jakarta = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  weight: "200 800",
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
