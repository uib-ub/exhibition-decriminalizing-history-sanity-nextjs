// theme.js
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// Version 1: Using objects
const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'yellow.300',
        color: 'purple.900',
      },
      // styles for the `a`
      a: {
        color: 'teal.900',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
})


export default theme