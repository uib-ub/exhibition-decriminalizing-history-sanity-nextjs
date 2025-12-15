import { useTranslations } from 'next-intl'
import RenderHumanMadeObjectActivityStream from './RenderHumanMadeObjectActivityStream'
import Definition from '@/components/properties/definition-list'

export default function ActivityStream({ stream, locale = 'en' }) {
  const t = useTranslations('Item')

  if (!stream) {
    return null
  }

  return (
    <>
      <Definition.Term>{t('activitystream')}</Definition.Term>
      <Definition.Details>
        <RenderHumanMadeObjectActivityStream stream={stream} locale={locale} />
      </Definition.Details>
    </>
  )
}
