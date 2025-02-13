import "@/app/globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import {
  VisualEditing,
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { Open_Sans } from "next/font/google";
import { draftMode } from "next/headers";

import AlertBanner from "@/components/alert-banner";

import { sanityFetch } from "@/sanity/lib/fetch";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Footer from '@/components/layout/footer';
import { siteSettings } from '@/sanity/lib/queries/fragments/siteSettings';

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff'
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = await params;
  const settings = await sanityFetch({
    query: siteSettings,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.label[locale];
  const description = settings?.description[locale];

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'no' }, { lang: 'es' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang={locale} className={`${openSans.variable} font-sans bg-white text-black`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {isDraftMode && <AlertBanner />}
          {children}
          <Footer />
          {isDraftMode && <VisualEditing />}
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
