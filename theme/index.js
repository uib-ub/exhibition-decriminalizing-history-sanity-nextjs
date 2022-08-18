// theme.js
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const Block = {
  baseStyle: {
    gridColumn: { base: '2 / -2' },
    /* display: 'grid',
    gridTemplateColumns: { base: 'auto', lg: "1fr minmax(1.2rem, 30ch)" },
    gridTemplateRows: { base: 'auto, auto', lg: "auto" }, */
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
      // styles for the `body`
      body: {
        /* bg: `
        linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
        linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
        linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)
        `, */
        //bg: 'blackAlpha.800',
        //bg: '#FFFFF5',
        // color: 'purple.900',
      },
      // styles for the `a`
      a: {
        //color: 'teal.900',
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
      variants: {
        'center-column': {
          gridColumn: { base: '2 / -2', md: '4 / -4' },
          fontSize: { base: '2xl', sm: '2xl', md: '3xl', lg: '4xl' },
          lineHeight: 'shorter',
          mb: '1em',
        }
      }
    },
  },
})


export default theme
