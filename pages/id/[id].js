import Head from 'next/head'
import { useRouter } from 'next/router'
import { usePreviewSubscription } from '../../lib/sanity'
import { getClient } from '../../lib/sanity.server'
import { getIdPaths, getType } from '../../lib/api'
import {
  groupFields,
  humanMadeObjectFields,
  linguisticDocumentFields,
  pageFields,
  siteNav,
  siteSettings,
} from '../../lib/queries/fragments'
import { NextSeo } from 'next-seo'
import RenderDocument from '../../components/Documents/RenderDocument'
import Layout from '../../components/Layout'
import TextBlocks from '../../components/TextBlocks'
import { Container, Heading } from '@chakra-ui/react'
import { getOpenGraphImages } from '../../lib/functions'
import ErrorPage from 'next/error'

/**
 * Helper function to return the correct version of the document
 * If we're in "preview mode" and have multiple documents, return the draft
 */
function filterDataToSingleItem(data, preview) {
  if (!Array.isArray(data)) return data

  return data.item.length > 1 && preview
    ? data.item.filter((item) => item._id.startsWith(`drafts.`)).slice(-1)[0]
    : data.item.slice(-1)[0]
}

export default function Document({ data, preview }) {
  const { locale, defaultLocale, isFallback } = useRouter()

  const { data: previewData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    // The hook will return this on first render
    // This is why it's important to fetch *draft* content server-side!
    initialData: data?.page,
    // The passed-down preview context determines whether this function does anything
    enabled: preview,
  })


  // This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed
  if (!isFallback && !data?.page?.item[0]?._id) {
    return <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <ErrorPage statusCode={404} />
    </>
  }

  // Client-side uses the same query, so we may need to filter it down again
  const page = filterDataToSingleItem(previewData, preview)
  // Get Open Graph images in different sizes
  // const openGraphImages = getOpenGraphImages(page?.item[0]?.image, page?.item[0]?.label[locale])

  // Notice the optional?.chaining conditionals wrapping every piece of content?
  // This is extremely important as you can't ever rely on a single field
  // of data existing when Editors are creating new documents.
  // It'll be completely blank when they start!

  return (
    <Layout
      site={page?.siteSettings}
      preview={preview}
      nav={page?.siteNav}
      color={page?.item[0]?.image?.palette?.dominant?.foreground}
      bgColor={page?.item[0]?.image?.palette?.vibrant?.background}
    >
      <NextSeo
        title={`${page?.item[0]?.label[locale ?? defaultLocale]} - ${page?.siteSettings?.label[locale ?? defaultLocale]}`}
        description={page?.item[0]?.excerpt}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN}/${page?.item[0]._id}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_DOMAIN}/${page?.item[0]._id}`,
          title: page?.item[0]?.label[locale],
          description: page?.item[0]?.excerpt,
          images: getOpenGraphImages(),
          site_name: page?.siteSettings?.label[locale],
        }}
        twitter={{
          handle: '@UiB_UB',
          site: '@UiB_UB',
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        <title>
          {`${page?.item[0]?.label[locale] || page?.item[0]?.label}`} - {page?.siteSettings?.label[locale]}
        </title>
        <script type="application/ld+json">{JSON.stringify(page?.item, null, 2)}</script>
      </Head>

      <Container
        maxW={'full'}
        color={page?.item[0]?.image?.palette?.dominant?.foreground}
        bgColor={page?.item[0]?.image?.palette?.vibrant?.background}
      >

        {page?.item && <RenderDocument document={page?.item[0]} locale={locale} />}

        {/* If this is a PREVIEW request coming from a LinguisticDocument or a Page in SANITY, the content is in the body field */}
        {preview && ['LinguisticDocument', 'Page'].includes(page?.item[0]?._type) && (
          <>
            <Heading>{page?.item[0]?.label ?? 'Missing title'}</Heading>
            {page?.item[0]?.body && <TextBlocks value={page.item[0].body} />}
            {/* {(page?.route[0]?.locale[0]?.body ?? page?.route[0]?.fallback[0]?.body) && <TextBlocks value={page.route[0].locale[0]?.body ?? page.route[0].fallback[0]?.body} />} */}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, locale, preview = false }) {
  const ID = typeof params.id === 'string' ? params.id : params.id.pop()
  const { _type: type, notFound = false } = await getType(ID, preview)
  if (notFound === true) return { notFound }

  const query = `{
    ${siteNav},
    'item': *[_id == $id] {
      ${type === 'HumanMadeObject' ? humanMadeObjectFields : ''}
      ${type === 'Actor' ? groupFields : ''}
      ${type === 'Group' ? groupFields : ''}
      ${type === 'Place' ? groupFields : ''}
      ${type === 'Concept' ? groupFields : ''}
      ${type === 'ObjectType' ? groupFields : ''}
      ${type === 'Event' ? groupFields : ''}
      ${type === 'Page' ? pageFields : ''}
      ${type === 'LinguisticDocument' ? linguisticDocumentFields : ''}
    },
    ${siteSettings}
  }`
  const queryParams = { id: ID, language: locale }
  const data = await getClient(preview).fetch(query, queryParams)

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
      messages: (await import(`../../messages/${locale}.json`)).default
    },
  }
}

export async function getStaticPaths({ locales }) {
  const all = await getIdPaths()
  return {
    paths: [
      ...all?.map((item) => ({
        params: {
          id: item._id,
          locale: 'en'
        },
      })),
      ...all?.map((item) => ({
        params: {
          id: item._id,
          locale: 'no'
        },
      }))
    ] || [],
    fallback: 'blocking',
  }
}
