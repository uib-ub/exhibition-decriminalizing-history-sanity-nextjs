import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge'

export default function Subject({ subjects, locale = 'en' }) {
  const t = useTranslations('Item')

  if (!subjects) {
    return null
  }

  return (
    <>
      <dt className="font-semibold pb-2 text-md">
        {t('subject')}
      </dt>
      <dd className="flex flex-wrap gap-2 mb-8 lg:mb-0 border-b lg:border-none">
        {subjects.map((subject) => (
          <Badge key={subject._id} className="rounded-full text-md">
            {subject.label[locale] || 'Missing default language label'}
          </Badge>
        ))}
      </dd>
    </>
  )
}
