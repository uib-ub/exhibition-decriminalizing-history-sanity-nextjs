import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter, NextRouter } from 'next/router'
import Image from 'next/image'
import { getClient } from '../lib/sanity.server'
import { LocaleSwitcher } from '../components/Locale'
import TextBlocks from '../components/TextBlocks'
import Layout from '../components/Layout'
import { arrayToTree } from 'performant-array-to-tree'
import { humanMadeObjectFields } from '../lib/queries/fragments/humanMadeObjectFields'
import { groq } from 'next-sanity'
import { siteSettings } from '../lib/queries/fragments/siteSettings'
import { Box, Container, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'

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

const Home: NextPage = ({ data, locale, preview }: any) => {
  const { locales, defaultLocale }: NextRouter = useRouter()
  const tree = arrayToTree(data.siteNav)
  const { page, siteNav, siteSettings, items } = data

  return (
    <>
      <Head>
        <title>{siteSettings?.label[locale]}</title>
        <meta name="description" content={siteSettings?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout site={siteSettings} preview={preview}>
        <Container maxW={"4xl"} my={20}>
          <Heading size={"4xl"} my={20}>
            {siteSettings?.label[locale]}
          </Heading>

          <Text>{siteSettings?.description[locale]}</Text>

          <Box my={10}>
            <h2>
              {page?.label}
            </h2>
            {page?.content && page?.content.map((i: any) => (<TextBlocks key={i._key} value={i.content} />))}
            {/* <pre>{JSON.stringify(page?.content, null, 2)}</pre> */}
          </Box>


          <UnorderedList marginStart={0}>
            {siteNav?.tree && siteNav?.tree.map((child: any) => (
              <ListItem key={child._key}>
                <Link href={`${child.value.reference.route}`}>
                  {child.value.reference.label[locale] ?? 'Uten tittel'}
                </Link>
              </ListItem>
            ))}
          </UnorderedList>

          <UnorderedList marginStart={0}>
            {items.map((item: any) => (
              <ListItem key={item._id}><Link href={`/id/${item._id}`} /* locale={false} */>{item.label[locale] ?? item._id}</Link></ListItem>
            ))}
            <ListItem>
              <Link href={`/studio`} locale={false}>Studio</Link>
            </ListItem>
          </UnorderedList>
        </Container>
      </Layout >
    </>
  )
}

export default Home
