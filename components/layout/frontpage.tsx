import { Link } from '@/i18n/navigation';
import { urlForImage } from '@/sanity/lib/utils'
import { Image } from 'next-sanity/image'
import ActiveLink from '@/components/active-link';
import Menu from '@/components/layout/menu';
import LocaleSwitcher from '../locale-switcher';
export default function FrontPage({
  siteSettings,
  siteNav,
  locale
}: {
  siteSettings: any;
  siteNav: any;
  locale: string;
}) {
  const bgImage = urlForImage({ asset: { _ref: 'image-ffe0010bd000b13d7335f4a826f5a2ff84a949f8-11799x18568-jpg' } })?.url() as string

  return (
    <>
      <div
        className="px-5 bg-black w-full relative h-screen overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <div className="w-full flex flex-row justify-between pt-3 gap-5">
          <h1 className={`text-white ${locale === 'no' ? 'text-[clamp(1rem,6vw,5vw)]' : 'text-[clamp(1rem,7vw,7vw)]'} font-extrabold pb-1`}>
            {siteSettings.label[locale] ?? siteSettings.label['en'] ?? siteSettings.label['no']}
          </h1>
          <Menu nav={siteNav} locale={locale} />
        </div>

        <aside>
          <p className='text-white uppercase bg-black leading-[1.2] mt-5 p-2 font-bold text-lg md:text-[clamp(1.5rem,1.5vw,1.2rem)] lg:text-[clamp(1.8rem,2.2vw,2.5rem)]'>
            {siteSettings?.description[locale] ?? siteSettings?.description['en'] ?? siteSettings?.description['no']}
          </p>
          <div className='flex flex-row flex-wrap w-full pt-5'>
            {siteNav.tree?.map((item: any) => (
              <ActiveLink
                key={item._key}
                href={`${locale}/${item.value.reference.route}`}
                className="px-2 py-2 md:px-3 md:py-3 lg:px-4 lg:py-4 block font-bold text-lg md:text-[clamp(1.5rem,1.5vw,1.2rem)] lg:text-[clamp(1.8rem,2.2vw,2rem)]"
                style={{
                  backgroundColor: item.value.reference.backgroundColor?.hex,
                  color: item.value.reference.foregroundColor?.hex
                }}
              >
                {item.value.reference.label[locale] ?? item.value.reference.label['en'] ?? item.value.reference.label['no']}
              </ActiveLink>
            ))}

            <div className='px-2 py-2 md:px-3 md:py-3 lg:px-4 lg:py-4 block font-bold text-lg md:text-[clamp(1.5rem,1.5vw,1.2rem)] lg:text-[clamp(1.8rem,2.2vw,2rem)] bg-pink-500'>
              <LocaleSwitcher />
            </div>
          </div>

          <div className='w-[clamp(180px,32vw,250px)] absolute bottom-5 left-5'>
            <Image
              src={urlForImage({ asset: { _ref: 'image-95a25d7f3e11d0f0b59be9ced8e2d41645213069-2521x1308-png' } })?.url() as string}
              alt='Skeivt kulturår 2022 og Universitetet i Bergen'
              width={2521}
              height={1308}
            />
          </div>
        </aside>
      </div>

      <main className="grid grid-cols-16 grid-rows-[repeat(16,minmax(30px,auto))] xl:grid-rows-[repeat(8,minmax(30px,auto))] bg-[#F1EFEE]">

        {/* Genders & Genres Section */}
        <div className="col-span-7 xl:col-span-5 row-span-2 xl:row-span-3 min-h-24 flex flex-col relative bg-[#F1EFEE]">
          <div className="w-full relative">
            <Image
              src={urlForImage({ asset: { _ref: 'image-51627288c9a428a675897f2ea60b7d531fb15ae4-874x1240-jpg' } })?.url() as string}
              alt="Test"
              width={874}
              height={1240}
              className="object-cover"
            />
          </div>
          <div className="bg-[rgba(85,205,252)] py-2 xl:py-3 px-2 xl:px-4 flex-grow">
            <h2 className="text-black font-extrabold text-[6vw] xl:text-[clamp(2rem,5.5vw,10rem)] leading-[0.9] uppercase">
              <Link href="/genders-and-genres">Genders & Genres</Link>
            </h2>
          </div>
        </div>

        {/* Fuck the polite Section */}
        <div className="col-[8/17] xl:col-[6/10] row-span-2 xl:row-span-3 min-h-24 relative z-10 bg-[#F1EFEE]">
          <div className="w-full self-center relative h-full">
            <Image
              src={urlForImage({ asset: { _ref: 'image-738282d5e0d7520cbb7dd7b682d86debb001c1ea-2780x3399-jpg' } })?.url() as string}
              alt="Test"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-[2%] right-1 xl:right-3 z-10 rotate-[2deg]">
            <h2 className="py-5 text-white font-extrabold bg-[#f52496] rotate-180 text-[6vw] xl:text-[clamp(3.5rem,3vw,4rem)] uppercase [writing-mode:vertical-rl] [text-orientation:sideways-right]">
              <Link href="/fuck-the-polite">Fuck the polite</Link>
            </h2>
          </div>
        </div>

        {/* Your apocalypse was fab Section */}
        <div className="col-span-full xl:col-[10/17] row-[3/6] xl:row-[1/2] h-full z-10 flex flex-col bg-[#F1EFEE]">
          <div className="w-full shadow-[0px_6px_6px_rgba(0,0,0,0.3)]">
            <Image
              src={urlForImage({ asset: { _ref: 'image-cd0b3b8406980c56016e3118ef107a1db0d96517-3146x1779-png' } })?.url() as string}
              alt="Test"
              width={3146}
              height={1779}
              className="w-full"
            />
          </div>
          <div className="bg-[#d52f3c]">
            <h2 className="font-bold text-[#E8FFFB] text-[4.5vw] xl:text-[clamp(1rem,3rem,2.5rem)] leading-none pt-1 pb-3 uppercase text-center">
              <Link href="/your-apocalypse-was-fab">[untitled] your apocalypse was fab</Link>
            </h2>
          </div>
        </div>

        {/* We are here Section */}
        <div className="col-span-full xl:col-[10/17] row-[6/12] xl:row-[2/4] z-10 flex flex-row bg-[#F1EFEE]">
          <div className="w-full h-full relative bg-[rgb(244,227,60)]">
            <Image
              src={urlForImage({ asset: { _ref: 'image-2b89431974991517e0beae16b17d9cadcdb34598-397x559-jpg' } })?.url() as string}
              alt="Test"
              width={397}
              height={559}
              className="object-cover"
            />
          </div>
          <div className="p-2 px-3 bg-[rgb(244,227,60)] items-end flex">
            <h2 className="text-[#bc337d] text-[8vw] md:text-[10vw] xl:text-[clamp(2rem,4vw,3.5rem)] uppercase font-light leading-[0.9]">
              <Link href="/we-are-here">We are <span className="font-black">here</span>, we are <span className="font-black">queer</span>, <br />we <span className="font-black">won&apos;t disappear</span></Link>
            </h2>
          </div>
        </div>

        {/* In the back room Section */}
        <div className="col-span-full row-[12/14] xl:row-[4/6] flex flex-col h-full z-50 bg-gray-900 pt-10 xl:pt-[70px] pb-20 xl:pb-[90px]">
          <div className="pt-0">
            <h2 className="font-extrabold text-[#e1ebeb] text-[clamp(2rem,9vw,9rem)] uppercase text-center">
              <Link href="/in-the-backroom">In the back room</Link>
            </h2>
          </div>

          <div className="flex">
            <div className="w-full h-full relative">
              <Image
                src={urlForImage({ asset: { _ref: 'image-915f75972eafe8b38b8af5202d9b982f1c6a6f14-1572x2371-jpg' } })?.url() as string}
                alt="Test"
                width={1572}
                height={2371}
                className="object-cover"
              />
            </div>
            <div className="w-full relative [filter:contrast(185%)]">
              <Image
                src={urlForImage({ asset: { _ref: 'image-97a253e4e9fd1c6911fe2e5410ca51d12e7edd43-559x792-jpg' } })?.url() as string}
                alt="Test"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full relative">
              <Image
                src={urlForImage({ asset: { _ref: 'image-3630c1457c77f3418a2baefb1a31a44d2eaf9bc0-710x1024-jpg' } })?.url() as string}
                alt="Test"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full relative hidden xl:block">
              <Image
                src={urlForImage({ asset: { _ref: 'image-05ff3e88a06195ed9c45d2e48feeeb5445d5cb61-3371x3287-jpg' } })?.url() as string}
                alt="Test"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* LBHT+ Section */}
        <div className="col-span-full row-[14/17] xl:row-[6/9] z-10 relative bg-black flex flex-wrap">
          {[
            'image-1c9b69c8bb67fdcc43dd61a21856c494d0357154-1653x3000-jpg',
            'image-75cce87bd8c292c204bae9a4aca6819f89e588e1-1653x3000-jpg',
            'image-8e4250792475376584996a4e0edce99547dfd832-1653x3000-jpg',
            'image-18c49ab7adff6a59c5a8c6e755e974a467bb3c51-1653x3000-jpg'
          ].map((imageRef) => (
            <div key={imageRef} className="w-1/4">
              <Image
                src={urlForImage({ asset: { _ref: imageRef } })?.url() as string}
                alt="Test"
                width={1653}
                height={3000}
                className="object-cover"
              />
            </div>
          ))}

          <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <h2 className="px-5 font-bold text-white bg-black text-[clamp(2rem,9vw,9rem)] uppercase">
              <Link href="/lhbt">LBHT+</Link>
            </h2>
          </div>
        </div>
      </main>
    </>
  )
}
