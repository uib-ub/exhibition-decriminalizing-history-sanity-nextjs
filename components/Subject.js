import { Box } from '@components/Box';
import { Heading } from '@components/Heading';
import { useRouter } from 'next/router';
import Link from './Link';

export default function Subject({ subjects }) {
  const { locale, defaultLocale } = useRouter();

  if (!subjects) {
    return null
  }

  return (
    <>
      <Heading as="dt">
        Emner
      </Heading>
      <Box as="dd">
        <ul>
          {subjects.map((subject) => (
            <Box as="li" key={subject._id}>
              <Link href={`/id/${subject._id}`}>
                {subject.label[locale] || subject.label[defaultLocale] || 'Missing default language label'}
              </Link>
            </Box>
          ))}
        </ul>
      </Box>
    </>
  )
}
