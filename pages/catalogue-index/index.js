import Head from 'next/head'
import { NextSeo } from 'next-seo'
import Layout from '../../components/Layout'
import { Badge, Heading, Container, List, ListItem, useColorModeValue } from '@chakra-ui/react'
import Link from '../../components/Link'
import { sortBy } from 'lodash'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { getClient } from '../../lib/sanity.server'
import { getOpenGraphImages } from '../../lib/functions'
import { groq } from 'next-sanity'
import { siteNav, siteSettings } from '../../lib/queries/fragments'

const registryQuery = groq`
  {
    "items": *[_type in ["Concept", "ObjectType", "Actor", "Group"] && accessState == "open" && count(*[references(^._id)]) > 0] | order(label.no){ 
      _id,
      _type,
      label,
      "count": count(*[references(^._id)]),
    },
    ${siteNav},
    ${siteSettings}
  }
`

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

export default function CatalogueIndex({ data, preview }) {
  const { locale, defaultLocale, asPath } = useRouter()
  const { items, siteSettings, siteNav } = data

  const t = useTranslations('Register')
  const sortLanguage = `label[${locale}]` || `label[${defaultLocale}]` || `label.en`
  const sortedItems = sortBy(items, sortLanguage)

  const openGraphImages = getOpenGraphImages(
    data?.siteSettings?.openGraph?.image,
    t('title'),
  )

  return (
    <Layout
      siteSettings={siteSettings}
      siteNav={siteNav}
      preview={preview}
      color={'black'}
      bgColor={'white'}
    >
      <NextSeo
        title={t('title')}
        titleTemplate={`%s | ${data?.siteSettings?.label?.[locale ?? defaultLocale]}`}
        defaultTitle={data?.siteSettings?.label?.[locale ?? defaultLocale]}
        description={data?.siteSettings?.description[locale ?? defaultLocale]}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN}${asPath}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_DOMAIN}${asPath}`,
          title: t('title'),
          description: data?.siteSettings?.description[locale ?? defaultLocale],
          images: openGraphImages,
          site_name: data?.siteSettings?.label?.[locale ?? defaultLocale],
        }}
        twitter={{
          handle: '@UiB_UB',
          site: '@UiB_UB',
          cardType: 'summary_large_image',
        }}
      />

      <Container mb="5" maxW="6xl">
        <Heading
          as={'h1'}
          fontSize={{ base: "6xl", md: '6xl', lg: '8xl' }}
          my={[2, 4, 8, 8]}
          mx='auto'
          textAlign={'center'}
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
