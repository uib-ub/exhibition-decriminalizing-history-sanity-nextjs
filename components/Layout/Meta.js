import * as React from 'react'
import Head from 'next/head'

export default function Meta() {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="shortcut icon" href={`/favicon.ico`} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`/favicon-16x16.png`}
      />
      <link rel="manifest" href={`/site.webmanifest`} />
      {/* <link rel="mask-icon" href={`${basePath}/favicon/safari-pinned-tab.svg`} color="#61223d" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content={`${basePath}/favicon/browserconfig.xml`} /> */}
      <meta name="theme-color" content="#ffffff" />
      {/* <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} /> */}
      {/* <meta
          name="description"
          content={
            ''
          }
        /> */}
      {/* <meta property="og:image" content={HOME_OG_IMAGE_URL} /> */}
    </Head>
  )
}
