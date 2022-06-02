import * as React from 'react'
import Head from 'next/head'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH

export default function Meta() {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${basePath}/favicon/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${basePath}/favicon/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${basePath}/favicon/favicon-16x16.png`}
        />
        <link rel="manifest" href={`${basePath}/favicon/site.webmanifest`} />
        <link rel="mask-icon" href={`${basePath}/favicon/safari-pinned-tab.svg`} color="#61223d" />
        <link rel="shortcut icon" href={`${basePath}/favicon/favicon.ico`} />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content={`${basePath}/favicon/browserconfig.xml`} />
        <meta name="theme-color" content="#ffffff" />
        {/* <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} /> */}
        <meta
          name="description"
          content={
            ''
          }
        />
        {/* <meta property="og:image" content={HOME_OG_IMAGE_URL} /> */}
        <meta
          name="google-site-verification"
          content="hy7CN2_apzktnGzz6OakK7D-JByUVjhT8l2CenEGWKI"
        />
      </Head>
    </React.Fragment>
  )
}
