import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/components/ui/badge';

export default function HasType({ types, locale }) {
  const t = useTranslations('Item')

  if (!types) {
    return null
  }

  return (
    <>
      <dt className="font-semibold pb-2 text-md border-b lg:border-none">
        {t('classification')}
      </dt>
      <dd className="flex flex-wrap gap-2 mb-8 lg:mb-0">
        {types.map((type) => (
          <Badge key={type._id} className="text-md inline-block rounded-full bg-purple-600 px-2 py-1">
            <Link href={`/id/${type._id}`}>{type.label[locale] ?? type.label['en'] ?? type.label['no']}</Link>
          </Badge>
        ))}
      </dd>
    </>
  )
}
