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
      <Heading as="dt" fontWeight="semibold" fontSize="md" pb="2">
        Emner
      </Heading>
      <Wrap as="dd" marginBottom={5}>
        {subjects.map((subject) => (
          <WrapItem key={subject._id}>
            <Tag size="md">
              <Link href={`/id/${subject._id}`}>{subject.label[locale] || subject.label[defaultLocale] || 'Missing default language label'}</Link>
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </>
  )
}
