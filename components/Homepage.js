import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Heading, Link, Wrap, WrapItem } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'

export default function Homepage(props) {
  const t = useTranslations('Item')

  if (!props) {
    return null
  }

  const { homepage } = props

  return (
    <>
      <Heading as="dt" fontWeight="semibold" size="md" pb="2">
        {t('homepage')}
      </Heading>
      <Wrap as="dd" marginBottom={5}>
        <WrapItem>
          <Link fontSize="md" href={homepage} isExternal>
            {homepage} <ExternalLinkIcon mx="2px" />
          </Link>
        </WrapItem>
      </Wrap>
    </>
  )
}
