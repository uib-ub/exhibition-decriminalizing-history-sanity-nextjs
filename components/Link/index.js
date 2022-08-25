import { Link as ChakraLink, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Link({ href, children, ...rest }) {
  const color = useColorModeValue('teal.700', 'gray.100')

  if (!href) {
    return null
  }

  return (
    <NextLink href={href} passHref prefetch={false} {...rest}>
      <ChakraLink color={color}>{children}</ChakraLink>
    </NextLink>
  )
}
