import Image from 'next/image'
import { kebabCase } from 'lodash'
import { GetImage } from '../../../lib/sanity.server'
import { Box, Container, Heading, Grid } from '@chakra-ui/layout'
// import Link from '../../Link'
import TextBlocks from '../'
import Timespan from '../../Timespan'
// import Map from '../Map'

export default function EventBlock(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { label, item, description, image } = props

  return (
    <Container px={[5, 5, 5, 0]} maxW={['sm', '2xl', '4xl', '6xl']} centerContent>
      <Grid maxW="4xl" mt="10" mb="28" templateColumns="1fr 1fr" gap={[5, null, 10, null]}>
        <Box position="relative">
          {/* {item.image && !image && (
            <Image
              alt={label || 'No label'}
              {...GetImage(item.image)}
              layout="fill"
              objectFit="cover"
            />
          )} */}
          {image && !item.image && (
            <Image
              alt={item.label || 'No label'}
              {...GetImage(image)}
              layout="fill"
              objectFit="cover"
            />
          )}
          {/* {item.location && <Map data={item.location} />} */}
        </Box>

        <Box pt="5" borderTop="1px" borderColor="blackAlpha.200">
          <Heading
            id={kebabCase(label ?? item.label)}
            as="h3"
            maxW={['xl', null, 'xl', null]}
            fontSize={['xl', '2xl', '3xl', null]}
          >
            {label ?? item.label}
            {/* <Link href={`/id/${item._id}`}>{item.label}</Link> */}
          </Heading>

          {item.timespan && (
            <Box fontFamily="Montserrat">
              Tid:{' '}
              <Timespan
                display="inline-block"
                fontSize={['lg', null, 'xl', null]}
                timespan={item.timespan}
              />
            </Box>
          )}

          <TextBlocks
            fontSize={['sm', 'lg', null, null]}
            value={description ?? item.referredToBy?.[0].body}
          />

          {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
        </Box>
      </Grid>
    </Container>
  )
}
