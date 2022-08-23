import { Link as ChakraLink, LinkProps, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface ActiveLinkProps extends LinkProps {
  children?: string | React.ReactNode
  href: string
  activeProps?: LinkProps
  _hover?: LinkProps
}

function ActiveLink({ href, activeProps, children, _hover, ...props }: ActiveLinkProps) {
  const { asPath } = useRouter()
  const isActive = asPath === href as string || asPath === props.as

  if (isActive) {
    return (
      <Link href={href} passHref>
        <ChakraLink
          {...props}
          {...activeProps}
          _hover={{ color: 'selected' }}
        >
          {children}
        </ChakraLink>
      </Link>
    )
  }

  return (
    <Link href={href} passHref>
      <ChakraLink {...props} _hover={{ color: 'selected' }}>
        {children}
      </ChakraLink>
    </Link>
  )
}

export default ActiveLink
