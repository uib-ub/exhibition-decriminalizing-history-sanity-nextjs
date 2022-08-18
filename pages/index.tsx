import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter, NextRouter } from 'next/router'
import Image from 'next/image'
import { getClient, GetImage } from '../lib/sanity.server'
import Sections from '../components/Blocks/Sections'
import FrontPageLayout from '../components/Layout/FrontPageLayout'
import NavMegaMenu from '../components/Layout/NavMegaMenu'
import { arrayToTree } from 'performant-array-to-tree'
import { humanMadeObjectFields } from '../lib/queries/fragments'
import { siteNav } from '../lib/queries/fragments'
import { groq } from 'next-sanity'
import { siteSettings } from '../lib/queries/fragments/siteSettings'
import { Box, Container, Flex, Grid, GridItem, Heading, ListItem, Spacer, Text, UnorderedList } from '@chakra-ui/react'

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
    props: {
      data,
      locale,
      preview,
      messages: (await import(`../messages/${locale}.json`)).default
    },
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

      <FrontPageLayout
        siteSettings={siteSettings}
        preview={preview}
        siteNav={siteNav}
        locale={locale}
      >
      </FrontPageLayout >
    </>
  )
}

export default Home
