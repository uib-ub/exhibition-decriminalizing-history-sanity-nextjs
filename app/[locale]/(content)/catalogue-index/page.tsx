import { Badge } from '@/components/ui/badge'
import { Link } from '@/i18n/navigation'
import { sanityFetch } from '@/sanity/lib/fetch'
import { sortBy } from 'lodash'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { groq } from 'next-sanity'

const registryQuery = groq`*[_type in ["Concept", "ObjectType", "Actor", "Group"] && count(*[references(^._id)]) > 0] | order(label.no){ 
  _id,
  _type,
  label,
  "count": count(*[references(^._id)]),
}
`
export default async function CatalogueIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Register' })

  const data = await sanityFetch({
    query: registryQuery,
  })

  const items = sortBy(data, `label[${locale}]`)

  return (
    <div className='mb-5 max-w-6xl pb-10 min-h-[calc(100vh-110px)] p-4 md:p-8 mx-auto'>
      <h1
        className='text-center font-bold text-2xl md:text-4xl lg:text-8xl mb-5'
      >
        {t('title')}
      </h1>
      <p className='text-center text-4xl '>
        {t('description')}
      </p>

      {items && (
        <ul className='columns-1 md:columns-2 lg:columns-3 py-[2px] md:py-[5px] gap-8 my-10'>
          {items.map((item: any) => (
            <li key={item._id} className="group flex items-end justify-between my-1 text-md md:text-lg">
              <div className="inline-flex items-end flex-1">
                <span className="max-w-[400px] break-words">
                  <Link href={`/id/${item._id}`} className='underline decoration-dotted underline-offset-4 hover:text-cyan-800'>
                    {item.label[locale] ?? item.label.en ?? item.label.no ?? item._id}
                  </Link>
                </span>
                <span className="border-b border-dotted border-gray-300 mb-[0.35em] mx-2 group-hover:border-gray-400 flex-1" />
              </div>
              <Badge variant="secondary" className="flex-shrink-0 mb-[0.25em]">
                {item.count}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
