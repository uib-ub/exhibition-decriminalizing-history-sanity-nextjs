import { ChakraProvider } from '@chakra-ui/react'
import { NextIntlProvider } from 'next-intl'
import { DefaultSeo } from 'next-seo';
import { GoogleAnalytics, event } from "nextjs-google-analytics";
import theme from '../theme'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/400-italic.css'
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/600-italic.css";
import "@fontsource/open-sans/800.css";
import "@fontsource/open-sans/800-italic.css";

export function reportWebVitals({
  id,
  name,
  label,
  value,
}) {
  event(name, {
    category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}

function App({ Component, pageProps }) {
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
        <GoogleAnalytics trackPageViews />
        <Component {...pageProps} />
      </NextIntlProvider>
    </ChakraProvider>
  )
}

export default App
