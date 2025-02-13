import { Link } from '@/i18n/navigation'
import { BsInfoCircle } from 'react-icons/bs'
import TextBlocks from '@/components/text-blocks'

export default function Source(props) {
  const { _id, label, hasCurrentOwner, source, locale, defaultLocale } = props

  if ((!_id && !label) || !source) return null

  return (
    <div className="mx-auto mt-2 mb-0 max-w-full pb-2 text-base md:pb-0 md:text-lg">
      <p>
        <BsInfoCircle
          className="mr-2 mt-0 inline-block"
          aria-hidden
        />
        <i>
          <Link href={`/id/${_id}`} color='unset' isExternal>
            {label[locale] || label[defaultLocale] || 'Missing default language label'}
          </Link>
        </i>

        {hasCurrentOwner?.length && `. ${hasCurrentOwner[0].label[locale] ?? hasCurrentOwner[0].label[defaultLocale]}.`}
      </p>

      <TextBlocks
        value={source}
        className="font-normal text-md md:text-lg lg:text-xl"
      />
    </div>
  )
}
