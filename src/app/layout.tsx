import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/components/providers/language-provider";
import { Atmosphere } from "@/components/atmosphere";
import { SiteNav } from "@/components/nav/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "@/lib/locale";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import en from "@/messages/en.json";
import tr from "@/messages/tr.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Instrument Serif is a non-variable display face — it ships a single weight,
// so `weight` is required. It's the filmic title-card voice of the site.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const META = { en, tr } satisfies Record<Locale, { meta: { title: string; description: string } }>;
const OG_LOCALE = { en: "en_US", tr: "tr_TR" } satisfies Record<Locale, string>;

// Reads the same locale cookie the page renders with, so crawlers and social
// previews see metadata in the language that actually rendered — not a
// hardcoded default that could mismatch the html lang attribute.
async function resolveLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  return isLocale(localeCookie) ? localeCookie : DEFAULT_LOCALE;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const { title, description } = META[locale].meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s — Bünyamin Aydeniz",
    },
    description,
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f5f3ee",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Reading the cookie here opts every route into dynamic rendering, but it's
  // the only way to render the correct language server-side with zero
  // hydration mismatch — no middleware or [locale] route segments required.
  const locale = await resolveLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LanguageProvider initialLocale={locale}>
          <Atmosphere />
          <a
            href="#top"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
          >
            Skip to content
          </a>
          <SiteNav />
          <main id="top" className="flex flex-1 flex-col">
            {children}
          </main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
