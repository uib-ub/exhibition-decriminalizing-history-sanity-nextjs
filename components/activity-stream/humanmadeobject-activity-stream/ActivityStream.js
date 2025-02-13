import { useTranslations } from 'next-intl'
import RenderHumanMadeObjectActivityStream from './RenderHumanMadeObjectActivityStream'

export default function ActivityStream({ stream, locale = 'en' }) {
  const t = useTranslations('Item')

  if (!stream) {
    return null
  }

  return (
    <>
      <dt className="font-semibold pb-2 text-md border-b lg:border-none">
        {t('activitystream')}
      </dt>
      <dd className="flex flex-wrap gap-2 mb-8 lg:mb-0">
        <RenderHumanMadeObjectActivityStream stream={stream} locale={locale} />
      </dd>
    </>
  )
}
