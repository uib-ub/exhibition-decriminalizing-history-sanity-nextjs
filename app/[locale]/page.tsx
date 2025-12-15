import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettings } from "@/sanity/lib/queries/fragments/siteSettings";
import Frontpage from "@/components/layout/frontpage";
import { siteNav } from '@/sanity/lib/queries/fragments/siteNav';
import { setRequestLocale } from 'next-intl/server';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const [settings, nav] = await Promise.all([
    sanityFetch({
      query: siteSettings,
    }),
    sanityFetch({
      query: siteNav,
    })
  ]);

  return (
    <Frontpage siteSettings={settings} siteNav={nav} locale={locale} />
  );
}
