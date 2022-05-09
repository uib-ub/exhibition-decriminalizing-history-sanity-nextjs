import { Box } from '@components/Box'
import { Header } from './Header'
import PreviewAlert from './PreviewAlert'

export default function Layout({ preview, children, site }) {

  return (
    <>
      {preview == true && <PreviewAlert />}
      <Header data={{ ...site }} />

      <Box as="main">
        {children}
        <p>{preview}</p>
      </Box>
    </>
  )
};
