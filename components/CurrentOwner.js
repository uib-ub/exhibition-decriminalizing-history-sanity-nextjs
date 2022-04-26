import { Heading, Wrap, WrapItem } from '@chakra-ui/react'
import Link from './Link'

export default function CurrentOwner({ owners }) {
  if (!owners) {
    return null
  }

  return (
    <>
      <Heading as="dt" fontFamily="Montserrat" fontWeight="semibold" fontSize="sm" pb="2">
        Eier
      </Heading>
      <Wrap as="dd" fontFamily="Montserrat" marginBottom={5}>
        {owners.map((owner) => (
          <WrapItem key={owner._id}>
            <Link fontSize="sm" key={owner._id} href={`/id/${owner._id}`}>
              {owner.label.no}
            </Link>
          </WrapItem>
        ))}
      </Wrap>
    </>
  )
}
