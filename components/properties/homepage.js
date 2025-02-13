import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function Homepage({ homepage }) {
  const t = useTranslations('Item')

  if (!homepage) {
    return null
  }

  return (
    <>
      <dt className="font-semibold text-md pb-2 border-b lg:border-none">
        {t('homepage')}
      </dt>
      <dd className="flex flex-wrap gap-2 mb-8 lg:mb-0">
        <Link className="text-md" href={homepage}>
          {homepage}
        </Link>
      </dd>
    </>
  )
}
