import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { usePreviewSubscription } from '../lib/sanity'
import { filterDataToSingleItem, getOpenGraphImages } from '../lib/functions'
import { getClient } from '../lib/sanity.server'
import { groq } from 'next-sanity'
import { routeQuery } from '../lib/queries/routeQuery'
import Layout from '../components/Layout'
import TextBlocks from '../components/TextBlocks'
import { Grid, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'

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
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params, locale, preview = false }) {
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
      messages: (await import(`../messages/${locale}.json`)).default
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
  console.log(JSON.stringify(page, null, 2))

  {/* If LinguisticDocument the content is in the body field */ }
  const slug = page?.route[0]?.locale[0] ?? page?.route[0]?.fallback[0]
  const linguisticDocumentBody = page?.route[0]?.locale[0]?.body ?? page?.route[0]?.fallback[0]?.body

  // Notice the optional?.chaining conditionals wrapping every piece of content?
  // This is extremely important as you can't ever rely on a single field
  // of data existing when Editors are creating new documents.
  // It'll be completely blank when they start!
  return (
    <Layout
      siteSettings={page?.siteSettings}
      siteNav={page?.siteNav}
      preview={preview}
      color={page?.route[0]?.foregroundColor.hex}
      bgColor={page?.route[0]?.backgroundColor.hex}
    >

      <NextSeo
        title={slug?.label}
        titleTemplate={`%s | ${page?.siteSettings?.label?.[locale ?? defaultLocale]}`}
        defaultTitle={page?.siteSettings?.label?.[locale ?? defaultLocale]}
        description={slug?.excerpt}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN}/${page?.route[0].slug}`}
        openGraph={{
          type: 'article',
          locale: locale,
          url: `${process.env.NEXT_PUBLIC_DOMAIN}/${page?.route[0].slug}`,
          title: slug?.label,
          description: page?.route[0]?.excerpt,
          images: getOpenGraphImages(),
          site_name: page?.siteSettings?.label?.[locale ?? defaultLocale],
        }}
      />

      <Grid
        maxW={'6xl'}
        templateColumns={{
          base: '1em minmax(1.2rem, 1fr) 1em 1fr 1em minmax(1.2rem, 1fr) 1em',
          md: '1em minmax(1.2rem, 1fr) 1em minmax(42ch, 82ch) 1em minmax(1.2rem, 1fr) 1em',
        }}
        margin='auto'
      >
        <Heading
          as={'h1'}
          fontSize={{ base: "6xl", md: '6xl', lg: '8xl' }}
          my={[2, 4, 8, 8]}
          gridColumn={'2 / -2'}
          mx='auto'
          textAlign={'center'}
        >
          {slug?.label}
        </Heading>

        {linguisticDocumentBody && <TextBlocks value={linguisticDocumentBody} variant="center-column" />}
      </Grid>
    </Layout>
  )
}

