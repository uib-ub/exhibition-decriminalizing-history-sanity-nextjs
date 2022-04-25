// import Head from 'next/head'
// import { NextSeo } from 'next-seo'
import { usePreviewSubscription } from '../lib/sanity'
import filterDataToSingleItem from '../lib/functions/filterDataToSingleItem'
import { getClient } from '../lib/sanity.server'
import { groq } from 'next-sanity'
import { routeQuery } from '../lib/queries/routeQuery'
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

  console.log(JSON.stringify(paths, null, 2))

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
  const data = await getClient(preview).fetch(routeQuery, queryParams)
  // console.log(JSON.stringify(data, null, 2))

  // Escape hatch, if our query failed to return data
  if (!data) return { notFound: true }

  // Helper function to reduce all returned documents down to just one
  const page = filterDataToSingleItem(data, preview)

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
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

