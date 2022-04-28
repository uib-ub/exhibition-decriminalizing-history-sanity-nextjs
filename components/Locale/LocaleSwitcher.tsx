import { Box } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LocaleSwitcher() {
  const router = useRouter()
  const { locales, locale: activeLocale } = router
  const otherLocales = locales?.filter((locale) => locale !== activeLocale)

  return (
    <Box>
      {otherLocales?.map((locale) => {
        const { pathname, query, asPath } = router
        return (
          <span key={locale}>
            <Link href={{ pathname, query }} as={asPath} locale={locale}>
              <a>{locale}</a>
            </Link>
          </span>
        )
      })}
    </Box>
  )
}