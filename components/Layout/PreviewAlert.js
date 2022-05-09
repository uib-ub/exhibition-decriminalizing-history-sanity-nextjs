import { Flex } from '@components/Flex'
import Link from 'next/link'

export default function PreviewAlert() {
  return (
    <Flex css={{ bgColor: "red", color: "white" }}>
      <Link href={`/api/exit-preview`}>
        This page is a preview. Click here to exit preview mode.
      </Link>
    </Flex>
  )
}
