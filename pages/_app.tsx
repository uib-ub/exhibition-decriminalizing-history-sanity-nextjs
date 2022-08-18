import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/400-italic.css'
import "@fontsource/open-sans/800.css";
import "@fontsource/open-sans/800-italic.css";
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
