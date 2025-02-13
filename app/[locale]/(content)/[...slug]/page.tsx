import { groq } from 'next-sanity'
import { routeQuery } from '@/sanity/lib/queries/routeQuery'
import TextBlocks from '@/components/text-blocks'
import { sanityFetch } from '@/sanity/lib/fetch'
import { notFound } from 'next/navigation'

const routesQuery = groq`
*[_type == "Route" && defined(slug.current) && defined(page)] {
  ...
    "locales": [
      {
        "lang": page->.__i18n_lang,
        "slug": [slug.current]
      },
      ...page->.__i18n_refs[]->{
        "lang": __i18n_lang,
        "slug": [^.slug.current]
      }
    ],
  }
  `

/* export async function generateStaticParams() {
  const routes = await sanityFetch({ query: routesQuery })
  return routes?.map((route: any) => (
    route.locales.map((locale: any) => ({
      params: { slug: locale.slug, locale: locale.lang }
    }))
  )) || []
} */


export default async function Page({ params }: { params: Promise<{ slug: string[], locale: string }> }) {
  const { slug, locale } = await params
  const data = await sanityFetch({ query: routeQuery, params: { slug: slug[0], language: locale } })

  if (!data) {
    notFound()
  }

  /*  
    console.log("🚀 ~ Page ~ page:", page)
    const pageDate = page?.route[0]?.locale[0] ?? page?.route[0]?.fallback[0]
    const linguisticDocumentBody = page?.route[0]?.locale[0]?.body ?? page?.route[0]?.fallback[0]?.body
   */
  // Notice the optional?.chaining conditionals wrapping every piece of content?
  // This is extremely important as you can't ever rely on a single field
  // of data existing when Editors are creating new documents.
  // It'll be completely blank when they start!

  const page = data.locale[0] ?? data.fallback[0]

  return (
    <div
      style={{
        backgroundColor: data.backgroundColor.hex,
        color: data.foregroundColor.hex,
      }}
    >
      <div
        className='max-w-4xl mx-auto grid grid-cols-[1em_minmax(1.2rem,1fr)_1em_1fr_1em_minmax(1.2rem,1fr)_1em] md:grid-cols-[1em_minmax(1.2rem,1fr)_1em_minmax(42ch,82ch)_1em_minmax(1.2rem,1fr)_1em]'
      >
        <h1 className='text-center font-bold text-4xl md:text-6xl lg:text-7xl col-start-2 col-end-[-2] my-16'>
          {page?.label}
        </h1>

        {page.body && <TextBlocks value={page.body} className='col-start-2 col-end-[-2]' locale={locale} />}
        {/* <pre className='text-xs col-start-2 col-end-[-2]'>{JSON.stringify(page, null, 2)}</pre> */}
      </div>
    </div>
  )
}

