import { Box } from '@chakra-ui/react'
import Header from './Header'
import Alert from './Alert'
// import Meta from './Meta'

export default function Layout({ children, site, preview }) {
  return (
    <>
      {preview && <Alert />}
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
