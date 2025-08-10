"use client"

import {
  Drawer,
  DrawerClose,
  DrawerContent,

  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useTranslations } from 'next-intl'
import { ScrollArea } from '@/components/ui/scroll-area'
import ActiveLink from '@/components/active-link'
import { Button } from '@/components/ui/button'
import LocaleSwitcher from '../locale-switcher'
export default function Menu({ nav, locale }: { nav: any, locale: string }) {
  const t = useTranslations('Layout')

  return (
    <Drawer direction='left'>
      <DrawerTrigger className="md:hidden" asChild>
        <Button variant='default' className='bg-[#A30A6E] rounded-none px-3 py-3 md:px-3 md:py-3 lg:px-4 lg:py-4 font-bold text-lg md:text-[clamp(1.5rem,1.5vw,1.2rem)] lg:text-[clamp(1.8rem,2.2vw,2rem)] text-white'>Open</Button>
      </DrawerTrigger>
      <DrawerContent className="fixed inset-y-0 left-0 py-10 bg-black font-extrabold text-white w-[95%] h-screen">
        <div className="mx-auto w-full max-w-sm top-0">
          <DrawerHeader>
            <DrawerTitle>{t('menu')}</DrawerTitle>
            <DrawerClose>Close</DrawerClose>
          </DrawerHeader>
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <nav className="flex flex-col items-stretch z-6 font-bold text-base md:text-[clamp(1rem,1.5vw,1.2rem)] lg:text-[clamp(1rem,1.5vw,1rem)] gap-0 flex-wrap justify-start self-start">
              {nav.tree?.map((item: any) => (
                <div
                  key={item._key}
                  className="flex flex-col items-stretch"
                >
                  <ActiveLink
                    href={item.value.reference.route}
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
              <LocaleSwitcher />
            </nav>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  )
}