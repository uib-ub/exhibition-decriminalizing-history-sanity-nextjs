import { Grid, Box, Center, Heading } from '@chakra-ui/react'
import TextBlocks from '../TextBlocks'

export default function TwoColumn(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Box mt="10">
      <Center>
        <Heading size="xl">{props.title}</Heading>
      </Center>
      <Center>
        {props?.subtitle && (
          <Box size="xl">
            <TextBlocks value={props.subtitle} />
          </Box>
        )}
      </Center>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6} p="10">
        {props?.firstColumn && (
          <Box size="xl">
            <TextBlocks value={props.firstColumn} />
          </Box>
        )}
        {props?.secondColumn && (
          <Box size="xl">
            <TextBlocks value={props.secondColumn} />
          </Box>
        )}
      </Grid>
    </Box>
  )
}
