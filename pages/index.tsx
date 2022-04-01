import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getClient } from '../lib/sanity.server'
import { LocaleSwitcher } from '../components/Locale'
import TextBlocks from '../components/TextBlocks'

const frontpageQuery = `
  {
    "siteSettings": *[_id == "siteSettings"][0] {
      "label": coalesce(label[$language], label['en']),
      "description": coalesce(description[$language], description['en']),
      "content": coalesce(
        *[__i18n_base._ref == ^.frontpage._ref && __i18n_lang == $language][0] {...},
        frontpage-> {...}
      )
    }
  }
  `

export const getStaticProps: GetStaticProps = async ({ locale, preview = false }) => {
  const data = await getClient(preview).fetch(frontpageQuery, { language: locale })
  //console.log(JSON.stringify(data, null, 2))
  return {
    props: { data, preview },
  }
}

const Home: NextPage = ({ data }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{data.siteSettings?.label}</title>
        <meta name="description" content={data.siteSettings?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LocaleSwitcher />
        <h1 className={styles.title}>
          {data.siteSettings?.label}
        </h1>

        <p className={styles.description}>{data.siteSettings?.description}</p>

        <div className={styles.card}>
          <h2>
            {data.siteSettings?.content?.label}
          </h2>
          <TextBlocks value={data.siteSettings?.content?.content} />
        </div>
        <p>
          <Link href={`/studio`} locale={false}>Studio</Link>
        </p>
      </main>
    </div>
  )
}

export default Home
