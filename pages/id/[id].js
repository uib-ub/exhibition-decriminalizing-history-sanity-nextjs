import Head from 'next/head'
import { usePreviewSubscription } from '../../lib/sanity'
import { getClient } from '../../lib/sanity.server'
import { getIdPaths, getType } from '../../lib/api'
import {
  groupFields,
  humanMadeObjectFields,
  pageFields,
  siteSettings,
} from '../../lib/queries/fragments'
import { NextSeo } from 'next-seo'
import RenderDocument from '../../components/Documents/RenderDocument'

/**
 * Helper function to return the correct version of the document
 * If we're in "preview mode" and have multiple documents, return the draft
 */
function filterDataToSingleItem(data, preview) {
  if (!Array.isArray(data)) return data

  return data.route.length > 1 && preview
    ? data.route.filter((item) => item._id.startsWith(`drafts.`)).slice(-1)[0]
    : data.route.slice(-1)[0]
}

export default function Document({ data, preview }) {
  const { data: previewData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    // The hook will return this on first render
    // This is why it's important to fetch *draft* content server-side!
    initialData: data?.page,
    // The passed-down preview context determines whether this function does anything
    enabled: preview,
  })

  /*   const router = useRouter()
  if (!router.isFallback && !data.item._id) {
    return <ErrorPage statusCode={404} />
  } */

  // Client-side uses the same query, so we may need to filter it down again
  const page = filterDataToSingleItem(previewData, preview)
  // console.log(JSON.stringify(page, null, 2))


  // Notice the optional?.chaining conditionals wrapping every piece of content?
  // This is extremely important as you can't ever rely on a single field
  // of data existing when Editors are creating new documents.
  // It'll be completely blank when they start!

  return (
    <div>
      {/* <NextSeo
        title={`${page?.item[0]?.label.no} - ${page?.siteSettings?.title}`}
        description={page?.item[0]?.excerpt}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}/${page?.item[0]._id}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}/${page?.item[0]._id}`,
          title: page?.item[0]?.label.no,
          description: page?.item[0]?.excerpt,
          images: openGraphImages,
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
          {`${page?.item[0]?.label?.no || page?.item[0]?.label}`} - {page.siteSettings.title}
        </title>
        <script type="application/ld+json">{JSON.stringify(page.item, null, 2)}</script>
      </Head> */}

      {/* <pre>{JSON.stringify(page, null, 2)}</pre> */}
      {page?.item && <RenderDocument document={page.item[0]} />}
    </div>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const { _type: type } = await getType(params.id, preview)
  const query = `{
    "item": *[_id == $id] {
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
  const queryParams = { id: params.id }
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
    },
  }
}

export async function getStaticPaths() {
  const all = await getIdPaths()
  return {
    paths:
      all?.map((item) => ({
        params: {
          id: item._id,
        },
      })) || [],
    fallback: false,
  }
}
