import { NextSeo } from 'next-seo'
import { Grid, Heading } from '@chakra-ui/react'
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

  desc = {
    no: 'Samling av dokumentene og kunstverkene valgt ut til denne utstillingen',
    en: 'A collection of curated objects chosen for this exhibition.',
  }

  return (
    <Layout
      preview={preview}
      siteSettings={siteSettings}
      siteNav={siteNav}
      color='white'
      bgColor='gray.900'
    >
      <NextSeo
        title={t("title")}
        titleTemplate={`%s | ${data?.siteSettings?.label?.[locale ?? defaultLocale]}`}
        defaultTitle={data?.siteSettings?.label?.[locale ?? defaultLocale]}
        description={desc[locale ?? defaultLocale]}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN}/stuff`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_DOMAIN}/stuff`,
          title: t("title"),
          description: desc[locale ?? defaultLocale],
          site_name: data?.siteSettings?.label?.[locale ?? defaultLocale],
        }}
      />

      <Grid
        maxW={'6xl'}
        templateColumns={{
          base: '1em minmax(1.2rem, 1fr) 1em 1fr 1em minmax(1.2rem, 1fr) 1em',
          md: '1em minmax(1.2rem, 1fr) 1em minmax(42ch, 82ch) 1em minmax(1.2rem, 1fr) 1em',
        }}
        margin='auto'
      >

        <Heading
          as={'h1'}
          fontSize={{ base: "6xl", md: '6xl', lg: '8xl' }}
          my={[2, 4, 8, 8]}
          mx='auto'
          textAlign={'center'}
          gridColumn={'2/-2'}
        >
          {t('title')}
        </Heading>

        <Cards
          gridColumn={'1/-1'}
          items={items}
        />
      </Grid>
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
