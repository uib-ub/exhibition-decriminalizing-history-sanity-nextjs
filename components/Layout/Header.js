import { Box } from "@components/Box"
import { Container } from '@components/Container'
import { Flex } from "@components/Flex"
import { Heading } from '@components/Heading'
import { default as Link } from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import { styled } from 'stitches.config'
import LocaleSwitcher from '../Locale/LocaleSwitcher'
import { ThemeToggle } from '../ThemeToggle'

export const Header = (props) => {
  const { locale, defaultLocale } = useRouter()

  if (!props) {
    return null
  }

  const { data, ...rest } = props
  const { label, /* logo, */ } = data


  return (
    <Box as="header" className={RemoveScroll.classNames.fullWidth}>
      <Container size="4">
        <Flex align="center" justify="between" css={{ height: '$8' }}>
          <Heading>
            <Link href="/">
              <a>{label?.[locale] ?? label?.[defaultLocale]}</a>
            </Link>
          </Heading>

          {/*           <Flex
            align="center"
            gap={{ '@initial': 4, '@bp2': 5 }}
            // Baseline align with the logo
            css={{ mb: -2 }}
          >
            <Box css={{ display: 'none', '@bp1': { display: 'contents' } }}>
              <>
                <NextLink href="/docs/primitives" passHref>
                  <Link>
                    <Text>Documentation</Text>
                  </Link>
                </NextLink>

                <NextLink href="/case-studies" passHref>
                  <Link>
                    <Text>Case studies</Text>
                  </Link>
                </NextLink>
              </>
            </Box> */}

          {/*  <Popover>
              <PopoverTrigger asChild>
                <Link
                  variant="subtle"
                  as="button"
                  css={{
                    bc: 'transparent',
                    cursor: 'pointer',
                    appearance: 'none',
                    fontFamily: '$untitled',
                    border: 0,
                    p: 0,
                    m: 0,
                    mr: '-$1',
                  }}
                >
                  <Text css={{ display: 'flex', gap: '$1', ai: 'center' }}>
                    Resources
                    <PlusIcon />
                  </Text>
                </Link>
              </PopoverTrigger>
              <PopoverContent hideArrow sideOffset={15} alignOffset={-15}>
                <Box css={{ p: '$1' }}>
                  {isColors && (
                    <NextLink href="/" passHref>
                      <HighlightLink>
                        <Flex gap="3">
                          <RadixLogoIcon
                            width="25"
                            height="25"
                            style={{ flex: 'none', marginTop: 2 }}
                          />
                          <Box>
                            <Text
                              size="3"
                              as="h3"
                              css={{ fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.02em' }}
                            >
                              Primitives
                            </Text>
                            <Text size="2" as="p" variant="gray" css={{ lineHeight: 1.4 }}>
                              Acessible components for design systems and web apps.
                            </Text>
                          </Box>
                        </Flex>
                      </HighlightLink>
                    </NextLink>
                  )}

                </Box>
              </PopoverContent>
            </Popover> */}

          <ThemeToggle />
          <LocaleSwitcher />
          {/* </Flex> */}
        </Flex>
      </Container>
    </Box>
  );
};

const HighlightLink = styled('a', {
  display: 'block',
  color: '$hiContrast',
  textDecoration: 'none',
  outline: 0,
  p: '$2',
  br: '$2',
  '@hover': {
    '&:hover': {
      bc: '$slateA3',
    },
  },
  '&:focus': {
    boxShadow: '0 0 0 2px $colors$slateA8',
  },
  '&:focus:not(:focus-visible)': {
    boxShadow: 'none',
  },
});