// theme.js
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const Block = {
  baseStyle: {
    gridColumn: { base: '2 / -2' },
    my: 10
  },
  variants: {
    static: {
      gridColumn: { base: '2 / -2' },
    },
    mirador: {
      gridColumn: { base: '2 / -2' },
    },
    'yith': {
      gridColumn: { base: '2 / -2' },
    },
  },
  defaultProps: {
    variant: 'static',
  },
}

// Version 1: Using objects
const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
  styles: {
    global: {
      a: {
        _hover: {
          textDecoration: 'underline',
        },
      },
      pre: {
        fontSize: '0.8em'
      }
    },
  },
  components: {
    Block,
    Text: {
      baseStyle: {
        mb: '0.5em'
      },
      variants: {
        'center-column': {
          gridColumn: { base: '2 / -2', md: '4 / -4' },
          fontSize: { base: '2xl', sm: '2xl', md: '3xl', lg: '4xl' },
          lineHeight: 'shorter',
          mb: '1em',
        },
        'item-texts': {
          fontSize: { base: 'lg', sm: 'lg', md: '2xl', lg: '2xl' },
        }
      }
    },
  },
})


export default theme
