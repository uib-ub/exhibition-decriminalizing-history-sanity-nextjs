import { Grid } from '@chakra-ui/react'
import Card from './Card'

export default function Cards(props) {
  if (!props && props.items) return null

  const { items, ...rest } = props

  return (
    <Grid
      as="section"
      maxW="full"
      boxSizing="border-box"
      overflow="hidden"
      templateColumns={{
        base: 'repeat(auto-fill, minmax(160px, 1fr))',
        sm: 'repeat(auto-fill, minmax(180px, 1fr))',
        md: 'repeat(auto-fill, minmax(200px, 1fr))',
        lg: 'repeat(auto-fill, 1fr)',
        xl: 'repeat(auto-fill, minmax(300px,1fr))',
      }}
      autoFlow="dense"
      autoRows='min-content'
      {...rest}
    >
      {items.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </Grid>
  )
}
