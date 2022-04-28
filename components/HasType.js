import { Heading, Wrap, WrapItem, Tag } from '@chakra-ui/react'
import { useRouter } from 'next/router';

export default function HasType({ types }) {
  const { locale, defaultLocale } = useRouter();
  if (!types) {
    return null
  }

  return (
    <>
      <Heading as="dt" fontFamily="Montserrat" fontWeight="semibold" fontSize="sm" pb="2">
        Klassifisering
      </Heading>
      <Wrap as="dd" fontFamily="Montserrat" marginBottom={5}>
        {types.map((type) => (
          <WrapItem key={type._id}>
            <Tag key={type._id} size="sm">
              {type.label[locale] ?? type.label[defaultLocale]}
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </>
  )
}
