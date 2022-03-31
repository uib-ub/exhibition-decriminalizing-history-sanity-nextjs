import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getClient } from '../lib/sanity.server'
import { LocaleSwitcher } from '../components/Locale'

const frontpageQuery = `
  {
    "siteSettings": *[_id == "siteSettings"][0] {
      "label": coalesce(label[$language], label['en']),
      "description": coalesce(description[$language], description['en']),
    }
  }
  `
// "content": *[_type == "course" && (references(^._id) || references(^.__i18n_base._ref))] { ... }

export const getStaticProps: GetStaticProps = async ({ locale, preview = false }) => {
  const data = await getClient(preview).fetch(frontpageQuery, { language: locale })
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
        <p>
          <Link href={`/studio/dashboard`} locale={false}>Studio</Link>
        </p>
      </main>
    </div>
  )
}

export default Home
