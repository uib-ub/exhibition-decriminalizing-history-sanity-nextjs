import type { GetStaticProps, NextPage } from 'next'
import { groq } from 'next-sanity'
import Head from 'next/head'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { arrayToTree } from 'performant-array-to-tree'
import Layout from '../components/Layout'
import { humanMadeObjectFields } from '../lib/queries/fragments/humanMadeObjectFields'
import { siteSettings } from '../lib/queries/fragments/siteSettings'
import { getClient } from '../lib/sanity.server'

const siteNav = groq`"siteNav": *[_id == "main-nav"][0]{
  tree[] {
    // Make sure you include each item's _key and parent
    _key,
    parent,
    // "Expand" the reference to the node
    value {
      reference->{
        // Get whatever property you need from your documents
        "label": coalesce(
          label,
          *[__i18n_base._ref == ^.page._ref && __i18n_lang == $language][0].label,
          page->.label,
        ),
        "route": coalesce(slug.current,link,route)
      }
    }
  }
}`

const frontpageQuery = groq`
  {
    "items": *[_type == "HumanMadeObject"] {
      ${humanMadeObjectFields}
    },
    ${siteSettings},
    ${siteNav},
    "page": *[_id == "siteSettings"][0] {
      ...coalesce(
        *[__i18n_base._ref == ^.frontpage._ref && __i18n_lang == $language][0] {...},
        frontpage-> {...}
      )
    }
  }
  `

export const getStaticProps: GetStaticProps = async ({ locale, preview = false }) => {
  const data = await getClient(preview).fetch(frontpageQuery, { language: locale })
  // console.log(JSON.stringify(data, null, 2))
  return {
    props: { data, locale, preview },
  }
}

const Home: NextPage = ({ data, locale }: any) => {
  const { locales, defaultLocale }: NextRouter = useRouter()
  const tree = arrayToTree(data.siteNav)
  const { page, siteNav, siteSettings, items } = data

  return (
    <Layout site={page?.siteSettings} preview>
      <Head>
        <title>{siteSettings?.label[locale]}</title>
        <meta name="description" content={siteSettings?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <h1>
        {siteSettings?.label[locale]}
      </h1>

      <p>{siteSettings?.description[locale]}</p>

      <div>
        <h2>
          {page?.label}
        </h2>
        {/* {page?.content && page?.content.map((i: any) => (<TextBlocks key={i._key} value={i.content} />))} */}
        {/* <pre>{JSON.stringify(page?.content, null, 2)}</pre> */}
      </div>

      <ul>
        {siteNav?.tree && siteNav?.tree.map((child: any) => (
          <li key={child._key}>
            <Link href={`/${child.value.reference.route}`}>
              {child.value.reference.label[locale] ?? 'Uten tittel'}
            </Link>
          </li>
        ))}
      </ul>

      <p>
        <Link href={`/studio`} locale={false}>Studio</Link>
      </p>
      <ul>
        {items.map((item: any) => (
          <li key={item._id}><Link href={`/id/${item._id}`} /* locale={false} */>{item.label[locale] ?? item._id}</Link></li>
        ))}
      </ul>
    </Layout>
  )
}

export default Home
