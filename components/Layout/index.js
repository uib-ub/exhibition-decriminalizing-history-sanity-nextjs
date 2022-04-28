import { Box } from '@chakra-ui/react'
import Header from './Header'
// import Meta from './Meta'

export default function Layout({ preview, children, site }) {
  return (
    <>
      {/* <Meta /> */}
      <Header data={{ ...site }} />

      <Box as="main">
        {/* {loading ? (
          <h1>Loading...</h1>
        ) : null} */}
        {children}
      </Box>
    </>
  )
}
