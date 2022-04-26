import Image from 'next/image'
import { Container, Heading, Flex, Text, Box } from '@chakra-ui/react'
import TextBlocks from '../../TextBlocks'
import { kebabCase } from 'lodash'
import Link from '../../Link'
import { getNextSanityImage } from '../../../lib/sanity.server'

export default function Compact({ data }) {
  return (
    <Container maxW={['md', null, '2xl', null]}>
      {data.map((item) => (
        <Flex key={item.item._id} p="4" my="5" bg="lightgray" direction="row">
          {item.image && (
            <Box mr="4" mb="3">
              <Image
                alt={item.label || 'No label'}
                {...getNextSanityImage(item.image)}
                layout="fill"
                /* sizes="(max-width: 800px) 100vw, 800px" */
                objectFit="cover"
                width={200}
                height={200}
              />
            </Box>
          )}
          <Box>
            <Heading
              id={kebabCase(item.label)}
              as="h3"
              maxW={['xl', null, 'xl', null]}
              mx="auto"
              fontSize={['xl', '2xl', '3xl', null]}
            >
              <Link href={`/id/${item.item._id}`}>{item.label}</Link>
            </Heading>

            {item.item?.shortDescription && (
              <Text maxW={['xl', null, 'xl', null]} mx="auto">
                {item.item.shortDescription}
              </Text>
            )}
            <TextBlocks blocks={item.description} />
          </Box>
        </Flex>
      ))}
    </Container>
  )
}
