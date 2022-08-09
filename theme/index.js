// theme.js
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// Version 1: Using objects
const theme = extendTheme({
  /* fonts: {
    heading: `'Arial', sans-serif`,
    body: `'Raleway', sans-serif`,
  }, */
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
    },
  },
})


export default theme