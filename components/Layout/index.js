import { Box } from '@chakra-ui/react'
import Header from './Header'
import Alert from './Alert'
import Nav from './Nav'
// import Meta from './Meta'

export default function Layout({ children, site, nav, preview }) {
  return (
    <>
      {preview && <Alert />}
      {/* <Meta /> */}
      <Header data={{ ...site }} />
      <Nav value={nav} />

      <Box as="main">
        <p>{preview ?? 'no preview'}</p>
        {/* {loading ? (
          <h1>Loading...</h1>
        ) : null} */}
        {children}
      </Box>
    </>
  )
}
