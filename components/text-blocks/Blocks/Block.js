import { Box, useStyleConfig } from '@chakra-ui/react'

export default function Block(props) {
  const { variant, ...rest } = props

  const styles = useStyleConfig('Block', { variant })

  // Pass the computed styles into the `__css` prop
  return <Box __css={styles} {...rest} />
}