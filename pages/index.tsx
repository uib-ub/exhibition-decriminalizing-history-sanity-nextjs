import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getClient } from '../lib/sanity.server'
import { LocaleSwitcher } from '../components/Locale'
import TextBlocks from '../components/TextBlocks'
import { arrayToTree } from 'performant-array-to-tree'
import groq from 'groq'
import { humanMadeObjectFields } from '../lib/queries/fragments/humanMadeObjectFields'

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
          label[$language], 
          label['en'],
          *[__i18n_base._ref == ^.page._ref && __i18n_lang == $language][0].label,
          page->.label,
        ),
        "route": coalesce(slug.current,link,route)
      }
    }
  }
}`

const frontpageQuery = `
  {
    "siteSettings": *[_id == "siteSettings"][0] {
      "label": coalesce(label[$language], label['en']),
      "description": coalesce(description[$language], description['en']),
      "page": coalesce(
        *[__i18n_base._ref == ^.frontpage._ref && __i18n_lang == $language][0] {...},
        frontpage-> {...}
      )
    },
    ${siteNav},
    "items": *[_type == "HumanMadeObject"] {
      ${humanMadeObjectFields}
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
  const router = useRouter()
  const { locales, defaultLocale } = router
  const tree = arrayToTree(data.siteNav)
  return (
    <div className={styles.container}>
      <Head>
        <title>{data.siteSettings?.label}</title>
        <meta name="description" content={data.siteSettings?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header>
          <ul>
            {data.siteNav?.tree && data.siteNav?.tree.map((child: any) => (
              <li key={child._key}>
                <Link href={`${locale !== defaultLocale ? '/' + locale + '/' : '/'}${child.value.reference.route}`}>
                  {child.value.reference.label ?? 'Uten tittel'}
                </Link>
              </li>
            ))}
          </ul>

          <LocaleSwitcher />
        </header>
        <h1 className={styles.title}>
          {data.siteSettings?.label}
        </h1>

        <p className={styles.description}>{data.siteSettings?.description}</p>

        <div className={styles.card}>
          <h2>
            {data.siteSettings?.page?.label}
          </h2>
          {data.siteSettings?.page?.content && data.siteSettings?.page?.content.map((i: any) => (<TextBlocks key={i._key} value={i.content} />))}
          {/*  <pre>{JSON.stringify(data.siteSettings?.page?.content, null, 2)}</pre> */}
        </div>
        <p>
          <Link href={`/studio`} locale={false}>Studio</Link>
        </p>
        <ul>
          {data.items.map((item: any) => (
            <li key={item._id}><Link href={`/id/${item._id}`} locale={false}>{item.label.no ?? item._id}</Link></li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default Home
