// theme.js
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// Version 1: Using objects
const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: '#FFFFF5',
        // color: 'purple.900',
      },
      // styles for the `a`
      a: {
        color: 'teal.900',
        _hover: {
          textDecoration: 'underline',
        },
      },
      '.scrollspy': {
        scrollSnapType: 'y proximity',
      },
      '.scrollspy > *': {
        scrollSnapAlign: 'start',
      }
    },
  },
})


export default theme