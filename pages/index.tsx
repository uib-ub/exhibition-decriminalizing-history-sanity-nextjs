import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter, NextRouter } from 'next/router'
import { getClient } from '../lib/sanity.server'
import FrontPageLayout from '../components/Layout/FrontPageLayout'
import { siteNav, siteSettings } from '../lib/queries/fragments'
import { groq } from 'next-sanity'
import { Box, Container, Flex, Heading } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

const development = process.env.NODE_ENV === 'development'

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
  const description = siteSettings?.description[locale as string ?? defaultLocale as string]
  const date = new Date()

  if (!development && !(date.getTime() > 1662029500000)) {
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
    <FrontPageLayout
      siteSettings={siteSettings}
      preview={preview}
      siteNav={siteNav}
      locale={locale}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <NextSeo
        title={page?.siteSettings?.label?.[locale as string ?? defaultLocale as string]}
        titleTemplate={`%s`}
        defaultTitle={page?.siteSettings?.label?.[locale as string ?? defaultLocale as string]}
        description={page?.siteSettings?.description?.[locale as string ?? defaultLocale as string]}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN}}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_DOMAIN}}`,
          title: page?.siteSettings?.label?.[locale as string ?? defaultLocale as string],
          description: page?.siteSettings?.description?.[locale as string ?? defaultLocale as string],
          //images: openGraphImages(),
          site_name: page?.siteSettings?.title,
        }}
      />

    </FrontPageLayout>
  )
}

export default Home
