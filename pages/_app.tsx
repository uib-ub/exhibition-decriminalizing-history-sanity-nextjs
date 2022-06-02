import { ChakraProvider } from '@chakra-ui/react'
import { NextIntlProvider } from 'next-intl'
import theme from '../theme'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NextIntlProvider messages={pageProps.messages}>
        <Component {...pageProps} />
      </NextIntlProvider>
    </ChakraProvider>
  )
}

export default App
