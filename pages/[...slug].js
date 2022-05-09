import { Container, Heading } from '@chakra-ui/react'
import { groq } from 'next-sanity'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import TextBlocks from '../components/TextBlocks'
import { filterDataToSingleItem } from '../lib/functions'
import { routeQuery } from '../lib/queries/routeQuery'
import { usePreviewSubscription } from '../lib/sanity'
import { getClient } from '../lib/sanity.server'
// import { Container, Text, useColorModeValue } from '@chakra-ui/react'

export async function getStaticPaths({ locales }) {
  const routesQuery = groq`
    *[ _type == "Route" && defined(slug.current) && defined(page)] {
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
  }`

  const routes = await getClient().fetch(routesQuery)
  const paths = routes?.map((route) => (
    route.locales.map((locale) => ({
      params: {
        "slug": locale.slug,
        "locale": locale.lang
      }
    }))
  )) || []

  return {
    paths: paths[0],
    fallback: true,
  }
}

export async function getStaticProps({ params, locale, preview = false }) {
  // console.log(params)
  const slug = typeof params.slug === 'string' ? params.slug : params.slug.join('/')
  const query = routeQuery
  const queryParams = { slug: slug, language: locale }
  const page = await getClient(preview).fetch(routeQuery, queryParams)
  // console.log(JSON.stringify(data, null, 2))

  // Escape hatch, if our query failed to return data
  if (!page) return { notFound: true }

  // Helper function to reduce all returned documents down to just one
  // const page = filterDataToSingleItem(data, preview)

  return {
    props: {
      // Pass down the "preview mode" boolean to the client-side
      preview,
      // Pass down the initial content, and our query
      data: { page, query, queryParams },
    },
  }
}


export default function Page({ data, preview }) {
  const { locale, defaultLocale } = useRouter()
  const { data: previewData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    // The hook will return this on first render
    // This is why it's important to fetch *draft* content server-side!
    initialData: data?.page,
    // The passed-down preview context determines whether this function does anything
    enabled: preview,
  })

  // Client-side uses the same query, so we may need to filter it down again
  const page = filterDataToSingleItem(previewData, preview)
  // console.log(JSON.stringify(page, null, 2))

  // Notice the optional?.chaining conditionals wrapping every piece of content?
  // This is extremely important as you can't ever rely on a single field
  // of data existing when Editors are creating new documents.
  // It'll be completely blank when they start!
  return (
    <>
      {/* <NextSeo
        title={page?.route[0]?.page?.label ?? page?.route[0]?.page?.title}
        titleTemplate={`%s | ${data?.siteSettings?.title}`}
        defaultTitle={data?.siteSettings?.title}
        description={page?.route[0]?.page?.excerpt}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}/${page?.route[0].slug.current}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}/${page?.route[0].slug.current}`,
          title: page?.route[0]?.page?.label,
          description: page?.route[0]?.page?.excerpt,
          // images: openGraphImages,
          site_name: page?.siteSettings?.title,
        }}
        twitter={{
          handle: '@UiB_UB',
          site: '@UiB_UB',
          cardType: 'summary_large_image',
        }}
      />

      <Head>
        <title>
          {`${page?.route[0]?.page?.label ?? page?.route[0]?.page?.title}
           - ${page?.siteSettings?.title}`}
        </title>
      </Head> */}


      <Layout site={page?.siteSettings} preview>
        <Container>
          <Heading>{page?.route[0]?.label?.[locale] ?? page?.route[0]?.label?.[defaultLocale]}</Heading>

          {/* If LinguisticDocument the content is in the body field */}
          {(page?.route[0]?.locale[0]?.body ?? page?.route[0]?.fallback[0]?.body) && <TextBlocks value={page.route[0].locale[0]?.body ?? page.route[0].fallback[0]?.body} />}
        </Container>

        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Layout>
    </>
  )
}

