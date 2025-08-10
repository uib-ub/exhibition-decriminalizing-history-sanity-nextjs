import { Link } from '@/i18n/navigation'
import { sanityFetch } from '@/sanity/lib/fetch'
import { siteNav } from '@/sanity/lib/queries/fragments/siteNav'
import { siteSettings } from '@/sanity/lib/queries/fragments/siteSettings'
import Menu from './menu'
import ActiveLink from '@/components/active-link'
import LocaleSwitcher from '../locale-switcher'

export default async function Header({ locale }: { locale: string }) {
  const [nav, site] = await Promise.all([
    sanityFetch({ query: siteNav }),
    sanityFetch({ query: siteSettings })
  ])

  return (
    <header
      className={`flex flex-row items-start relative w-full justify-between text-[${site.color}] bg-black`}
    >
      <h1
        className={`grow w-min pb-1 py-2 px-4 self-stretch place-content-center bg-black font-extrabold text-white ${locale === 'no' ? 'text-[clamp(1rem,4vw,25px)]' : 'text-[clamp(1.2rem,5vw,26.4px)]'}`}
      >
        <Link color='white' href="/">
          {site.label?.[locale] ?? site.label?.en ?? site.label?.no}
        </Link>
      </h1>
      <nav className="hidden md:flex flex-row items-stretch z-6 font-bold text-base md:text-[clamp(1rem,1.5vw,1.2rem)] lg:text-[clamp(1rem,1.5vw,1rem)] gap-0 flex-wrap justify-start self-start">
        {nav.tree?.map((item: any) => (
          <div
            key={item._key}
            className="flex flex-col items-stretch"
          >
            <ActiveLink
              href={`/${item.value.reference.route}`}
              className="px-2 py-4 block"
              style={{
                backgroundColor: item.value.reference.backgroundColor?.hex,
                color: item.value.reference.foregroundColor?.hex
              }}
            >
              {item.value.reference.label[locale] ?? item.value.reference.label.en ?? item.value.reference.label.no ?? item.value.reference._id}
            </ActiveLink>
          </div>
        ))}
        <div className={`px-2 py-2 md:px-3 md:py-3 lg:px-4 lg:py-4 bg-pink-500 text-base md:text-[clamp(1rem,1.5vw,1.2rem)] lg:text-[clamp(1rem,1.5vw,1rem)]`}>
          <LocaleSwitcher />
        </div>
      </nav>
      <Menu nav={nav} locale={locale} />
    </header>
  )
}

