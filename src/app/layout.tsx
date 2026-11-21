import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { LangProvider } from "@/context/LangContext";
import { SITE_CONFIG } from "@/data/portfolio";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE_CONFIG.metaTitle,
  description: SITE_CONFIG.metaDescription,
  openGraph: {
    title: SITE_CONFIG.metaTitle,
    description: SITE_CONFIG.metaDescription,
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: SITE_CONFIG.heroAvatar,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.metaTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.metaTitle,
    description: SITE_CONFIG.metaDescription,
    images: [SITE_CONFIG.heroAvatar],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${geistSans.variable}`}
    >
      <body className={`${geistSans.className} font-sans antialiased`}>
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
