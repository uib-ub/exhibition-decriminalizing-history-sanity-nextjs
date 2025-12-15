import { setRequestLocale, getTranslations } from 'next-intl/server'
import { sanityFetch } from '@/sanity/lib/fetch'
import { typeQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import { humanMadeObjectFields } from '@/sanity/lib/queries/fragments'
import ManifestViewer from '@/components/manifest-viewer'
import HasType from '@/components/properties/has-type'
import Homepage from '@/components/properties/homepage'
import ReferredToBy from '@/components/properties/referred-to-by'
import Subject from '@/components/properties/subject'
import ActivityStream from '@/components/activity-stream/humanmadeobject-activity-stream'
import Definition from '@/components/properties/definition-list'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/i18n/navigation'

export default async function IdPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Item' })

  // First get the type of document
  const type = await sanityFetch({
    query: typeQuery,
    params: { id: id }
  })

  if (!type) {
    notFound()
  }

  const data = await sanityFetch({
    query: `*[_id == $id][0]{${humanMadeObjectFields}}`,
    params: { id: id }
  })

  return (
    <div
      style={{
        backgroundColor: data.image?.palette?.vibrant?.background,
        color: data.image?.palette?.vibrant?.foreground
      }}
    >

      <div
        className="max-w-6xl mx-auto min-h-[calc(100vh-110px)] p-4 flex flex-col gap-5 pt-5 lg:pt-10 pb-20"
      >
        <h1 className="text-4xl md:text-6xl font-bold">{data.label[locale]}</h1>

        {data._type === 'HumanMadeObject' && data.manifest && <ManifestViewer manifest={data.manifest} />}

        <Definition>
          <Definition.Term>{t('classification')}</Definition.Term>
          <Definition.Details>
            {data.hasType?.map((type: any) => (
              <Badge key={type._id} className="text-md inline-block rounded-full bg-purple-600 text-white px-3 py-1">
                <Link href={`/id/${type._id}`}>{type.label[locale] ?? type.label['en'] ?? type.label['no']}</Link>
              </Badge>
            ))}
          </Definition.Details>
          {data.subject && <>
            <Definition.Term>{t('subject')}</Definition.Term>
            <Definition.Details>
              {data.subject?.map((subject: any) => (
                <Badge key={subject._id} className="text-md inline-block rounded-full bg-purple-600 text-white px-3 py-1">
                  <Link href={`/id/${subject._id}`}>{subject.label[locale] ?? subject.label['en'] ?? subject.label['no']}</Link>
                </Badge>
              ))}
            </Definition.Details>
          </>}
          {data?.referredToBy && <ReferredToBy value={data.referredToBy} locale={locale} />}
          {data.homepage && <>
            <Definition.Term>{t('homepage')}</Definition.Term>
            <Definition.Details>
              <Link href={data.homepage}>{data.homepage}</Link>
            </Definition.Details>
          </>}
          {data?.activityStream && <ActivityStream stream={data.activityStream} />}
        </Definition>

        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </div>
  )
}
