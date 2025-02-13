import { setRequestLocale, getTranslations } from 'next-intl/server'
import { sanityFetch } from '@/sanity/lib/fetch'
import { typeQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import { humanMadeObjectFields } from '@/sanity/lib/queries/fragments'
import ManifestViewer from '@/components/manifest-viewer'
import HasType from '@/components/properties/has-type'
import Description from '@/components/properties/description'
import Homepage from '@/components/properties/homepage'
import ReferredToBy from '@/components/properties/referred-to-by'
import Subject from '@/components/properties/subject'
import ActivityStream from '@/components/activity-stream/humanmadeobject-activity-stream'

const MANIFEST_SERVICE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://decriminalizing-history.uib.no'

export default async function IdPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Common' })

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
        className="max-w-6xl mx-auto min-h-[calc(100vh-110px)] p-4 flex flex-col gap-5 pb-20"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{data.label[locale]}</h1>

        <ManifestViewer manifest={`${MANIFEST_SERVICE_URL}/api/manifest/${id}`} />

        {data?.excerpt && <Description description={data.excerpt} locale={locale} />}

        <dl
          className="grid grid-cols-[2fr] md:grid-cols-[2fr] lg:grid-cols-[min-content_auto] items-baseline gap-x-5 md:gap-x-20 gap-y-2 md:gap-y-4"
        >
          {data.hasType && <HasType types={data.hasType} locale={locale} />}


          {data?.referredToBy && <ReferredToBy value={data.referredToBy} locale={locale} />}
          {data?.activityStream && <ActivityStream stream={data.activityStream} />}

          {data?.subject && <Subject subjects={data.subject} />}

          {/* 
  {item.depicts && <Depicts depicted={item.depicts} />}*/}

          {data.homepage && <Homepage homepage={data.homepage} />}

          {/* {item.hasCurrentOwner && <CurrentOwner owners={item.hasCurrentOwner} />}

  {item.consistsOf && <ConsistsOf value={item.consistsOf} />}

  {item.measurement && <Measurement value={item.measurement} />}  */}
        </dl>

        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </div>
  )
}
