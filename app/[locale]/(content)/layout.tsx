import Header from "@/components/layout/header";

export default async function Layout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <>
      <Header locale={locale} />
      <main>
        {children}
      </main>
    </>
  );
}
