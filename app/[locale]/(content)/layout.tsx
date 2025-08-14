import Header from "@/components/layout/header";
import { setRequestLocale } from "next-intl/server";

export default async function Layout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header locale={locale} />
      <main>
        {children}
      </main>
    </>
  );
}
