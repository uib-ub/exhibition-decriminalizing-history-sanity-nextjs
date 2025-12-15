import { getTranslations, getLocale, setRequestLocale } from 'next-intl/server';

export default async function NotFoundPage() {
  const locale = await getLocale();
  setRequestLocale(locale);
  const t = await getTranslations('Common');

  return (
    <div className="min-h-[calc(100vh-110px)] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">{t('notFound.title')} {locale}</h1>
      <p className="text-xl text-gray-600 mb-8">{t('notFound.description')}</p>
    </div>
  );
}
