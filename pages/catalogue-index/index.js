import Head from 'next/head'
import { NextSeo } from 'next-seo'
import Layout from '../../components/Layout'
import { Badge, Heading, Container, List, ListItem, useColorModeValue } from '@chakra-ui/react'
import Link from '../../components/Link'
import { sortBy } from 'lodash'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { registryQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'
/* import { getOpenGraphImages } from '../../lib/utils' */


export async function getStaticProps({ preview = false, locale }) {
  const data = await getClient(preview).fetch(registryQuery, { language: locale })

  return {
    props: {
      preview,
      data,
      messages: (await import(`../../messages/${locale}.json`)).default
    },
  }
}


export default function Register({ data, preview }) {
  const { locale, defaultLocale } = useRouter()
  const sortLanguage = `label[${locale}]` || `label[${defaultLocale}]` || `label.en`
  const t = useTranslations('Register')
  const tagColor = useColorModeValue('blackAlpha', 'red')

  const { items, siteSettings, siteNav } = data

  const sortedItems = sortBy(items, sortLanguage)
  /*   const openGraphImages = getOpenGraphImages(
      data?.siteSettings?.openGraph?.image,
      data?.siteSettings?.title,
    ) */

  return (
    <Layout
      site={siteSettings}
      nav={siteNav}
      preview={preview}
    >
      {/* <NextSeo
        title="Register"
        titleTemplate={`%s | ${data?.siteSettings?.title}`}
        defaultTitle={data?.siteSettings?.title}
        description={data?.siteSettings?.openGraph?.description}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}/register`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}/register`,
          title: data?.siteSettings?.title,
          description: data?.siteSettings?.openGraph?.description,
          images: openGraphImages,
          site_name: data?.siteSettings?.title,
        }}
        twitter={{
          handle: '@UiB_UB',
          site: '@UiB_UB',
          cardType: 'summary_large_image',
        }}
      /> */}
      <Head>
        <title>{t('title')} - {data.siteSettings?.label?.[locale ?? defaultLocale]}</title>
      </Head>

      <Container my="5" maxW="6xl">
        <Heading
          fontSize={['2xl', '3xl', '4xl', '5xl']}
          py="5"
          mb="5"
          borderBottom="solid 1px"
          borderColor="gray.300"
        >
          {t('title')}
        </Heading>

        {sortedItems && (
          <List py={['2', null, '5']} sx={{ columnCount: [1, 1, 2, 3, 3] }} fontSize="xl">
            {sortedItems.map((item) => (
              <ListItem
                key={item._id}
                display="flex"
                mb="1"
                _before={{
                  backgroundImage: 'radial-gradient(circle, #aaa 1px, transparent 1px)',
                  backgroundPosition: 'bottom',
                  backgroundSize: '1ex 1.5px',
                  backgroundRepeat: 'space no-repeat',
                  content: '""',
                  flexGrow: '1',
                  height: '1em',
                  order: '2',
                  mt: '2px',
                  alignSelf: 'flex-start',
                  justifySelf: 'self-end',
                }}
              >
                <Link href={`/id/${item._id}`} order="1">
                  {item.label[locale] || item.label[defaultLocale] || 'Missing label'}
                </Link>
                <Badge
                  alignSelf="flex-start"
                  justifySelf="self-end"
                  order="2"
                  ml="3"
                  colorScheme={tagColor}
                  fontSize="0.8em"
                >
                  {item.count}
                </Badge>
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </Layout>
  )
}
