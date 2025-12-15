'use client';

import { useLocale } from 'next-intl';
import ActiveLink from '@/components/active-link';
import LocaleSwitcher from '../locale-switcher';

export default function HeaderNav({ nav }: { nav: any }) {
  const locale = useLocale();

  return (
    <nav className="hidden md:flex flex-row items-stretch z-6 font-bold text-base md:text-[clamp(1rem,1.5vw,1.2rem)] lg:text-[clamp(1rem,1.5vw,1rem)] gap-0 flex-wrap justify-start self-start">
      {nav.tree?.map((item: any) => (
        <div
          key={item._key}
          className="flex flex-col items-stretch"
        >
          <ActiveLink
            href={`/${item.value.reference.route}`}
            className="px-2 py-3 block"
            style={{
              backgroundColor: item.value.reference.backgroundColor?.hex,
              color: item.value.reference.foregroundColor?.hex
            }}
          >
            {item.value.reference.label[locale] ?? item.value.reference.label.en ?? item.value.reference.label.no ?? item.value.reference._id}
          </ActiveLink>
        </div>
      ))}
      <div className={`bg-pink-500 text-base md:text-[clamp(1rem,1.5vw,1.2rem)] lg:text-[clamp(1rem,1.5vw,1rem)]`}>
        <LocaleSwitcher />
      </div>
    </nav>
  );
}
