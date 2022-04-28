import { Heading, Wrap, WrapItem, Tag } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import Link from './Link'

export default function Subject({ subjects }) {
  const { locale, defaultLocale } = useRouter();

  if (!subjects) {
    return null
  }

  return (
    <>
      <Heading as="dt" fontFamily="Montserrat" fontWeight="semibold" fontSize="sm" pb="2">
        Emner
      </Heading>
      <Wrap as="dd" fontFamily="Montserrat" marginBottom={5}>
        {subjects.map((subject) => (
          <WrapItem key={subject._id}>
            <Tag colorScheme="blackAlpha" size="sm">
              <Link href={`/id/${subject._id}`}>{subject.label[locale] ?? subject.label[defaultLocale]}</Link>
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </>
  )
}
