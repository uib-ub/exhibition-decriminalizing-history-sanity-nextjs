import { Box, Grid } from '@chakra-ui/react'

export default function Palette({ colors }) {
  if (!colors) {
    return null
  }

  let palette = []

  if (colors) {
    Object.keys(colors).forEach((key) => {
      palette.push(colors[key])
    })
  }

  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={0}>
      {palette.map((color, index) => (
        <Box key={index} bg={color.background} w="full" h="2px"></Box>
      ))}
    </Grid>
  )
}
