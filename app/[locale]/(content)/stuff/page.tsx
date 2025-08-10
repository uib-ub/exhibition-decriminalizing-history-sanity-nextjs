import { setRequestLocale, getTranslations } from 'next-intl/server'
import { sanityFetch } from '@/sanity/lib/fetch'
import { humanMadeObjectsQuery } from '@/sanity/lib/queries'
import { Card, CardDescription, CardHeader, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
import { calculateSpans } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Image } from 'next-sanity/image'
import { urlForImage } from '@/sanity/lib/utils'
import { Link } from '@/i18n/navigation'

export default async function StuffPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Items' })

  const data = await sanityFetch({
    query: humanMadeObjectsQuery
  })

  return (
    <div className='mb-20 bg-[#1a202c] text-white min-h-[calc(100vh-110px)] p-4 md:p-8'>
      <h1 className='text-center font-bold text-3xl md:text-4xl lg:text-8xl mb-5'>
        {t('title')}
      </h1>
      <p className='text-center text-2xl md:text-4xl'>
        {t('metaDescription')}
      </p>

      <div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full my-10 mx-auto max-w-(--breakpoint-2xl)'
      >
        {data.map((item: any) => {
          const spans = calculateSpans(item.aspectRatio)
          return (
            <Card
              key={item._id}
              className={`grid grid-rows-[auto_auto_1fr_auto] grid-cols-1 ${spans.classes} border-none rounded-none`}
              style={{
                backgroundColor: item.palette?.lightVibrant?.background,
                color: item.palette?.lightVibrant?.foreground
              }}
            >
              <div className='relative w-full aspect-(--aspect-ratio)' style={{ '--aspect-ratio': item.aspectRatio } as React.CSSProperties}>
                <Image
                  src={urlForImage(item.image)?.url() as string}
                  alt={item.label[locale]}
                  fill
                  className='object-contain px-3'
                  sizes={
                    item.aspectRatio > 1
                      ? "(max-width: 640px) 100vw, 66vw"
                      : "(max-width: 640px) 100vw, 33vw"
                  }
                />
              </div>
              <CardHeader>
                <CardTitle className='text-lg md:text-2xl font-bold'>
                  <Link href={`/id/${item._id}`}>{item.label[locale]}</Link>
                </CardTitle>
              </CardHeader>

              <CardContent>
                {item?.creation?.[0]?.creators && (
                  <p className='text-md font-bold '>
                    {item.creation[0].creators
                      .map((creator: any, index: number) => (
                        <span key={creator._id}>
                          {index === 0 ? '' : ', '}
                          {creator.name[locale]}
                        </span>
                      ))}
                  </p>
                )}
                {item?.excerpt && <CardDescription className='text-black mt-2'>{item.excerpt}</CardDescription>}
              </CardContent>

              <CardFooter>
                {item.hasType && (
                  <div className='flex flex-wrap gap-2'>
                    {item.hasType?.map((type: any) => (
                      <Badge
                        key={type._id}
                        className='px-2 py-1 text-xs md:text-sm whitespace-nowrap bg-purple-500 text-white rounded-none'
                      >
                        {type.label[locale]}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
