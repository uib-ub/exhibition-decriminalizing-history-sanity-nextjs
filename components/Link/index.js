import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Link({ href, children, color, ...rest }) {
  if (!href) {
    return null
  }

  return (
    <NextLink href={href} passHref prefetch={false} {...rest}>
      <ChakraLink
        color={color ?? 'teal.900'}
        textDecoration={'underline'}
      >{children}</ChakraLink>
    </NextLink>
  )
}
