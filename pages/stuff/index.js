import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { Container, Heading } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Cards from '../../components/Cards'
import { useTranslations } from 'next-intl';
import { getClient } from '../../lib/sanity.server'
import { humanMadeObjectsQuery } from '../../lib/queries'
import { useRouter } from 'next/router'

export default function Items({ data, preview }) {
  const { locale, defaultLocale } = useRouter()
  const t = useTranslations('Items');
  const { items, siteSettings, siteNav } = data

  return (
    <Layout
      preview={preview}
      site={siteSettings}
      nav={siteNav}
      color='white'
      bgColor='gray.900'
    >
      <NextSeo
        title="Ting"
        titleTemplate={`%s | ${data?.siteSettings?.title}`}
        defaultTitle={data?.siteSettings?.title}
        description={data?.siteSettings?.openGraph?.description}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN}/stuff`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_DOMAIN}/stuff`,
          title: data?.siteSettings?.title,
          description: data?.siteSettings?.openGraph?.description,
          site_name: data?.siteSettings?.title,
        }}
        twitter={{
          handle: '@UiB_UB',
          site: '@UiB_UB',
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        <title>{t("title")} – {siteSettings.label[locale ?? defaultLocale]}</title>
      </Head>

      <Heading
        as={'h1'}
        fontSize={{ base: "6xl", md: '6xl', lg: '8xl' }}
        my={[2, 4, 8, 8]}
        mx='auto'
        textAlign={'center'}
        textShadow='8px 8px 1px rgba(0, 0, 0, .6)'
      >
        {t('title')}
      </Heading>
      <Container
        maxW={"full"}
        p={0}
      >

        <Cards items={items} />
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ locale, preview = false }) {
  const data = await getClient(preview).fetch(humanMadeObjectsQuery, { language: locale })

  return {
    props: {
      data,
      locale,
      preview,
      messages: (await import(`../../messages/${locale}.json`)).default
    },
  }
}
