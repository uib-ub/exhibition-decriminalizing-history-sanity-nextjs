import Image from 'next/image'
import { Container, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import TextBlocks from '../../TextBlocks'
import { kebabCase } from 'lodash'
import Link from '../../Link'
import { getNextSanityImage } from '../../../lib/sanity.server'

export default function Profile({ data }) {
  return (
    <Container maxW={['md', null, '2xl', null]} px="0">
      {data.map((item) => (
        <React.Fragment key={item.item._id}>
          {item.image && (
            <Container maxW={['md', null, '2xl', null]} mb="5" mt="26" px="0">
              <Image {...getNextSanityImage(item.image)} alt={item.label} layout="intrinsic" />
            </Container>
          )}

          <Heading
            id={kebabCase(item.label)}
            as="h3"
            maxW={['md', null, '2xl', null]}
            mx="auto"
            fontSize={['2xl', '2xl', '3xl', null]}
          >
            <Link href={`/id/${item.item._id}`}>{item.label}</Link>
          </Heading>

          {item.item?.shortDescription && (
            <Text maxW={['xl', null, '2xl', null]} fontSize={['xl', '2xl', '3xl', null]} mx="auto">
              {item.item.shortDescription}
            </Text>
          )}
          <TextBlocks blocks={item.description} />
        </React.Fragment>
      ))}
    </Container>
  )
}
