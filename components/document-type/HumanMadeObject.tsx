import { getTranslations } from 'next-intl/server'

export default async function HumanMadeObject() {
  const t = await getTranslations({ locale: 'no', namespace: 'Common' })

  return <div>{t('HumanMadeObject')}</div>
}