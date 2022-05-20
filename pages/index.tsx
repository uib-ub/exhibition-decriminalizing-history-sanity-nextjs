import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter, NextRouter } from 'next/router'
import Image from 'next/image'
import { getClient } from '../lib/sanity.server'
import TextBlocks from '../components/TextBlocks'
import Sections from '../components/Sections/Sections'
import Layout from '../components/Layout'
import { arrayToTree } from 'performant-array-to-tree'
import { humanMadeObjectFields } from '../lib/queries/fragments'
import { siteNav } from '../lib/queries/fragments'
import { groq } from 'next-sanity'
import { siteSettings } from '../lib/queries/fragments/siteSettings'
import { Box, Container, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'

const fields = groq`
  ...,
  content[] {
    disabled != true => {
      ...
    },
    _type == 'MiradorGallery' && disabled != true => @{
      ...,
      items[] {
        "manifest": coalesce(manifestRef->.subjectOfManifest, manifestUrl),
        canvasUrl,
      },
    },
    _type == 'SingleObject' && disabled != true => @{
      ...,
      item-> {
        _id,
        label,
        referredToBy[] {
          ...
        },
        image,
        "manifest": coalesce(subjectOfManifest, manifestUrl),
        canvasUrl,
      }
    },
    _type == 'EventSection' && disabled != true => @{
      ...,
      item-> {
        _id,
        label,
        timespan,
        location,
        referredToBy[] {
          ...
        },
        image,
      }
    },
    _type == 'Grid'  && disabled != true => @{
      ...,
      items[] {
        ...,
        "route": coalesce(landingPageRoute->.slug.current,landingPageRoute->.link,landingPageRoute->.route)
      }
    }
  }
`

const frontpageQuery = groq`
  {
    ${siteSettings},
    ${siteNav},
    "page": *[_id == "siteSettings"][0] {
      ...coalesce(
        *[__i18n_base._ref == ^.frontpage._ref && __i18n_lang == $language][0] {
          ${fields}
        },
        frontpage-> {
          ${fields}
        }
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
  const { page, siteNav, siteSettings } = data

  return (
    <>
      <Head>
        <title>{siteSettings?.label[locale]}</title>
        <meta name="description" content={siteSettings?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout site={siteSettings} preview={preview} nav={siteNav}>
        <Container maxW={"full"} backgroundColor="yellow.300">
          <Box py={20}>
            <Heading fontSize={"9xl"} textTransform="uppercase">
              {siteSettings?.label[locale]}
            </Heading>

            <Text fontSize={"3xl"} maxW={"6xl"}>{siteSettings?.description[locale]}</Text>
          </Box>
        </Container>

        <Box>
          {/* {page?.content && page?.content.map((i: any) => (<TextBlocks key={i._key} value={i.content} />))} */}
          {page?.content && <Sections sections={page?.content} />}
          {/* <pre>{JSON.stringify(page, null, 2)}</pre> */}
        </Box>
      </Layout >
    </>
  )
}

export default Home
