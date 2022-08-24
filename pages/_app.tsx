import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { NextIntlProvider } from 'next-intl'
import { DefaultSeo } from 'next-seo';
import theme from '../theme'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/400-italic.css'
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/600-italic.css";
import "@fontsource/open-sans/800.css";
import "@fontsource/open-sans/800-italic.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NextIntlProvider messages={pageProps.messages}>
        <DefaultSeo
          twitter={{
            handle: '@UiB_UB',
            site: '@UiB_UB',
            cardType: 'summary_large_image',
          }}
        />
        <Component {...pageProps} />
      </NextIntlProvider>
    </ChakraProvider>
  )
}

export default App
