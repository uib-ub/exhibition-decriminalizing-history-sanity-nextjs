import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { Container, Heading } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Cards from '../../components/Cards'
import { useTranslations } from 'next-intl';
import { getClient } from '../../lib/sanity.server'
import { humanMadeObjectsQuery } from '../../lib/queries'

export default function Items({ data, preview }) {
  const t = useTranslations('Items');
  const { items, siteSettings, siteNav } = data

  return (
    <Layout preview={preview} site={siteSettings} nav={siteNav}>
      <NextSeo
        title="Ting"
        titleTemplate={`%s | ${data?.siteSettings?.title}`}
        defaultTitle={data?.siteSettings?.title}
        description={data?.siteSettings?.openGraph?.description}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}/stuff`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}/stuff`,
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
        <title>{t("title")} – {siteSettings.title}</title>
      </Head>

      <Container
        maxW={"full"}
        p={0}
        pt={14}
      >
        <Heading
          size={"4xl"}
          mb={5}
          px={5}
          color="green.500"
        >
          {t("title")}
        </Heading>

        <Cards items={items} gap={5} />
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
