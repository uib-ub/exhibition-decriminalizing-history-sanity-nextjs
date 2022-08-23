import React from 'react'
import Link from 'next/link'
import {
  Box,
  Heading,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'


export default function Header(props) {
  const { locale, defaultLocale } = useRouter()

  if (!props) {
    return null
  }

  const { data, ...rest } = props
  const { label, color, bgColor /* logo, */ } = data

  return (
    <Box
      as="header"
      gridArea="header"
      color={color}
      bgColor={bgColor}
      p={2}
      {...rest}
    >
      <Heading
        size={'lg'}
        whiteSpace='nowrap'
      >
        <Link href="/">
          {label?.[locale] ?? label?.[defaultLocale]}
        </Link>
      </Heading>
    </Box>
  )
}
