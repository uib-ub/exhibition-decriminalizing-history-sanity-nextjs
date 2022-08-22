import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter, NextRouter } from 'next/router'
import { getClient } from '../lib/sanity.server'
import FrontPageLayout from '../components/Layout/FrontPageLayout'
import { siteNav } from '../lib/queries/fragments'
import { groq } from 'next-sanity'
import { siteSettings } from '../lib/queries/fragments/siteSettings'
import { Box, Container, Flex, Heading } from '@chakra-ui/react'

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

const Home: NextPage = ({ data, preview }: any) => {
  const { locale, defaultLocale }: NextRouter = useRouter()
  const { page, siteNav, siteSettings } = data
  const title = siteSettings?.label[locale as string ?? defaultLocale as string]
  const date = new Date()

  if (!(date.getTime() > 1662029500000)) {
    return (
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        direction='column'
        w='full'
        h='full'
      >
        <Heading>
          Decrimnializing history coming soon...
        </Heading>
      </Flex >
    )
  }

  return (
    <>
      <Head>
        <title>{siteSettings?.label[locale as string ?? defaultLocale as string]}</title>
        <meta name="description" content={siteSettings?.description[locale as string ?? defaultLocale as string]} />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <FrontPageLayout
        siteSettings={siteSettings}
        preview={preview}
        siteNav={siteNav}
        locale={locale}
      >
      </FrontPageLayout>
    </>
  )
}

export default Home
