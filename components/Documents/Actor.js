import Image from 'next/image'
import { Badge, Box, Container, Divider, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import TextBlocks from '../TextBlocks'
import Cards from '../Cards'
import RenderMergedActivityStreamList from '../ActivityStream/MergedActivityStreamList/RenderMergedActivityStreamList'
import { GetImage } from '../../lib/sanity.server'
import Members from '../Members'
import Date from '../Date'
import { useRouter } from 'next/router'

export default function Actor(item) {
  const { locale, defaultLocale } = useRouter()

  if (!item) {
    return null
  }

  return (
    <Container my="5" maxWidth="6xl">
      <Flex pb="10">
        {item.image && (
          <Box mr="4" w="3xs" position="relative">
            <Image
              alt={item.label[locale] ?? item.label[defaultLocale]}
              {...GetImage(item.image)}
              layout="responsive"
              objectFit="contain"
            />

            <Text fontSize={['sm', 'lg', null, null]} my="2" textAlign="center" fontWeight="500">
              {item.birth?.timespan[0] ? (
                <Date dateFormat="yyyy">
                  {item.birth?.timespan[0].date ?? item.birth?.timespan[0].beginOfTheBegin}
                </Date>
              ) : (
                '    '
              )}

              {(item.birth?.timespan[0] || item.death?.timespan[0]) && <span>{' – '}</span>}

              {item.death?.timespan[0] ? (
                <Date dateFormat="yyyy">
                  {item.death?.timespan[0].date ?? item.death?.timespan[0].endOfTheEnd}
                </Date>
              ) : (
                '    '
              )}
            </Text>
          </Box>
        )}

        <Box pt="2">
          <Heading
            as={'h2'}
            fontSize={['2xl', '4xl', '4xl', '5xl']}
          >
            <a>{item.label[locale] ?? item.label[defaultLocale]}</a>
          </Heading>

          {item.shortDescription && <Text>{item.shortDescription}</Text>}

          <Box d="flex" alignItems="baseline">
            {item.hasType &&
              item.hasType.map((type) => (
                <Badge key={type._id} borderRadius="full" px="2">
                  {type.label[locale] ?? type.label[defaultLocale]}
                </Badge>
              ))}
          </Box>

          {item.referredToBy && (
            <Box maxWidth={['xl', null, '2xl', null]} my="10">
              {item.referredToBy?.map((ref) => (
                <>
                  <TextBlocks key={ref._key} value={ref.body} />
                </>
              ))}
            </Box>
          )}

          {item.activityStream && (
            <>
              <Heading as="h2" mb="3">
                Hendelser
              </Heading>

              <SimpleGrid
                w="full"
                mb="5"
                columnGap="5"
                templateColumns={{
                  base: '1fr',
                  md: 'auto 1fr',
                }}
              >
                <RenderMergedActivityStreamList stream={item.activityStream} />
              </SimpleGrid>
            </>
          )}

          {item.hasMember.length > 0 && <Members data={item.hasMember} />}
        </Box>
      </Flex>

      {item.mentionedIn.length != 0 && (
        <>
          <Divider mb="10" />
          <Cards items={item.mentionedIn} />
        </>
      )}
    </Container>
  )
}
