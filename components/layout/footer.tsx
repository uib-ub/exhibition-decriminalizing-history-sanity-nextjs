import React from 'react'
import { useTranslations } from 'next-intl'
import { Image } from 'next-sanity/image'
import { urlForImage } from '@/sanity/lib/utils'
import { Link } from '@/i18n/navigation'

export default function Footer() {
  const t = useTranslations('Layout')

  return (
    <footer
      className='px-5 py-20 font-bold text-lg md:text-2xl text-white bg-pink-400 relative w-full'
    >
      <p>
        {t('footerText')}
      </p>

      <p>
        {t('accessibilityStatementText')}{' '}
        <Link
          href={`/accessibility-statement`}
          className='text-blue-600 underline dark:text-blue-700 hover:no-underline'
        >
          {t('accessibilityStatementLink')}
        </Link>
      </p>

      <p>
        {t('usesCookies')}{' '}
        <Link
          href={`/cookie-policy`}
          className='text-blue-600 underline dark:text-blue-700 hover:no-underline'
        >
          {t('readAboutCookies')}
        </Link>
      </p>


      <div
        className="w-[clamp(200px,40vw,250px)] absolute -top-[40px] md:-top-[65px]  right-[20px] z-800"
      >
        <a href="https://www.uib.no/skeivtkultur%C3%A5r">
          <Image
            className="h-auto w-full object-contain"
            width={2521}
            height={1308}
            alt='Skeivt kulturår 2022 og Universitetet i Bergen'
            src={urlForImage({ asset: { _ref: 'image-95a25d7f3e11d0f0b59be9ced8e2d41645213069-2521x1308-png' } })?.fit('min').url() as string}
            sizes="100vw"
            priority={true}
          />
        </a>
      </div>
    </footer>
  )
}
