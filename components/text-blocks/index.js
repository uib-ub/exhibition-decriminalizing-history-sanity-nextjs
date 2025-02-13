import { Link } from '@/i18n/navigation'
import { PortableText } from '@portabletext/react'
import {
  ObjectBlock,
  //BigTextBlock,
  //HeroBlock,
  //IframeBlock,
  //InstagramBlock,
  //PageHeaderBlock,
  //QuoteBlock,
  //TextBlock,
  //TableBlock,
  //TwoColumnBlock,
  //VideoBlock,
  //IllustrationWithCaption,
  //ExhibitionElement,
  //EventBlock,
  //GridBlock,
} from './Blocks'
import { cn } from '@/lib/utils'
//import ActorInsert from './Inserts/ActorInsert'
//import PlaceInsert from './Inserts/PlaceInsert'

const myPortableTextComponents = () => {
  return {
    types: {
      ObjectBlock: ({ value, locale }) => <ObjectBlock {...value} locale={locale} />,
      //image: ({value}) => <img src={value.imageUrl} />,
      //BigTextBlock: ({ value }) => <BigTextBlock {...value} />,
      //ExhibitionElement: ({ value }) => <ExhibitionElement {...value} />,
      //EventSection: ({ value }) => <EventBlock {...value} />,
      //HeroBlock: ({ value }) => <HeroBlock {...value} />,
      //IframeBlock: ({ value }) => <IframeBlock {...value} />,
      //IllustrationWithCaption: ({ value }) => <IllustrationWithCaption {...value} />,
      //InstagramPost: ({ value }) => <InstagramBlock {...value} />,
      //GridBlock: ({ value }) => <GridBlock {...value} />,
      //PageHeader: ({ value }) => <PageHeaderBlock {...value} />,
      //Quote: ({ value }) => <QuoteBlock {...value} />,
      //SectionText: ({ value }) => <TextBlock {...value} />,
      //SingleObject: ({ value }) => <ObjectBlock {...value} />,
      //Table: ({ value }) => <TableBlock {...value} />,
      //TwoColumn: ({ value }) => <TwoColumnBlock {...value} />,
      //Video: ({ value }) => <VideoBlock {...value} />,
      //Actor: ({ value }) => <ActorInsert {...value} />,
      //Place: ({ value }) => <PlaceInsert {...value} />,
    },

    block: {
      normal: ({ children, className }) => (
        <p className={cn(
          "col-start-2 col-end-[-2] font-semibold leading-snug mb-4",
          "text-lg md:text-2xl lg:text-3xl",
          className
        )}>
          {children}
        </p>
      ),
      h1: ({ children }) => <h1 className="col-start-2 col-end-[-2] text-4xl md:text-6xl font-bold mb-4">{children}</h1>,
      h2: ({ children }) => <h2 className="col-start-2 col-end-[-2] text-3xl md:text-4xl font-bold mb-4">{children}</h2>,
      h3: ({ children }) => <h3 className="col-start-2 col-end-[-2] text-2xl md:text-3xl font-bold mb-4">{children}</h3>,
      h4: ({ children }) => <h4 className="col-start-2 col-end-[-2] text-xl md:text-2xl font-bold mb-4">{children}</h4>,
      h5: ({ children }) => <h5 className="col-start-2 col-end-[-2] text-lg md:text-xl font-bold mb-4">{children}</h5>,
      h6: ({ children }) => <h6 className="col-start-2 col-end-[-2] text-base md:text-lg font-bold mb-4">{children}</h6>,
    },

    marks: {
      link: ({ children, value }) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <Link href={value.href} rel={rel}>
            {children}
          </Link>
        )
      },
    },

    list: {
      // Ex. 1: customizing common list types
      bullet: ({ children }) => (
        <ul
          className="col-start-2 col-end-[-2] text-base md:text-lg lg:text-2xl leading-snug mb-4 mx-8 md:mx-16"
        >
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol
          className="col-start-2 col-end-[-2] text-base md:text-lg lg:text-2xl leading-snug mb-4 mx-8 md:mx-16"
        >
          {children}
        </ol>
      ),
    },
  }
}

const TextBlocks = ({ value, className, locale }) => {
  // PortableText doesn't accept a className prop directly
  // The className should be passed through the components configuration
  const components = myPortableTextComponents()

  // If className is provided, merge it with the normal block style
  if (className) {
    components.block.normal = ({ children }) => (
      <p className={cn(
        "col-start-2 col-end-[-2] font-semibold leading-snug mb-4",
        "text-lg md:text-2xl lg:text-3xl",
        className
      )}>
        {children}
      </p>
    )
  }

  return <PortableText
    value={value}
    components={components}
    locale={locale}
  />
}

export default TextBlocks