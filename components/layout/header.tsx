import { Link } from '@/i18n/navigation'
import { sanityFetch } from '@/sanity/lib/fetch'
import { siteNav } from '@/sanity/lib/queries/fragments/siteNav'
import { siteSettings } from '@/sanity/lib/queries/fragments/siteSettings'
import Menu from './menu'
import HeaderNav from './header-nav'
import { setRequestLocale } from 'next-intl/server'

export default async function Header({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const [nav, site] = await Promise.all([
    sanityFetch({ query: siteNav }),
    sanityFetch({ query: siteSettings })
  ])

  return (
    <header
      className={`flex flex-row items-start relative w-full justify-between text-[${site.color}] bg-black`}
    >
      <h1
        className={`grow w-min pb-1 py-1 px-4 self-stretch place-content-center bg-black font-extrabold text-white ${locale === 'no' ? 'text-[clamp(0.8rem,4vw,25px)]' : 'text-[clamp(1rem,5vw,26.4px)]'}`}
      >
        <Link color='white' href="/">
          {site.label?.[locale] ?? site.label?.en ?? site.label?.no}
        </Link>
      </h1>
      <HeaderNav nav={nav} />
      <Menu nav={nav} />
    </header>
  )
}

