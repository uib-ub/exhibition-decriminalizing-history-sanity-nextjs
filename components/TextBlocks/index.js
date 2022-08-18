import { Text } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'
import {
  BigTextBlock,
  HeroBlock,
  IframeBlock,
  InstagramBlock,
  PageHeaderBlock,
  QuoteBlock,
  TextBlock,
  ObjectBlock,
  TableBlock,
  TwoColumnBlock,
  VideoBlock,
  IllustrationWithCaption,
  ExhibitionElement,
  EventBlock,
  GridBlock,
} from './Blocks'
import ActorInsert from './Inserts/ActorInsert'
import PlaceInsert from './Inserts/PlaceInsert'

const myPortableTextComponents = (variant = '') => {
  return {
    types: {
      //image: ({value}) => <img src={value.imageUrl} />,
      BigTextBlock: ({ value }) => <BigTextBlock {...value} />,
      ExhibitionElement: ({ value }) => <ExhibitionElement {...value} />,
      EventSection: ({ value }) => <EventBlock {...value} />,
      HeroBlock: ({ value }) => <HeroBlock {...value} />,
      IframeBlock: ({ value }) => <IframeBlock {...value} />,
      IllustrationWithCaption: ({ value }) => <IllustrationWithCaption {...value} />,
      InstagramPost: ({ value }) => <InstagramBlock {...value} />,
      GridBlock: ({ value }) => <GridBlock {...value} />,
      ObjectBlock: ({ value }) => <ObjectBlock {...value} />,
      PageHeader: ({ value }) => <PageHeaderBlock {...value} />,
      Quote: ({ value }) => <QuoteBlock {...value} />,
      SectionText: ({ value }) => <TextBlock {...value} />,
      SingleObject: ({ value }) => <ObjectBlock {...value} />,
      Table: ({ value }) => <TableBlock {...value} />,
      TwoColumn: ({ value }) => <TwoColumnBlock {...value} />,
      Video: ({ value }) => <VideoBlock {...value} />,
      Actor: ({ value }) => <ActorInsert {...value} />,
      Place: ({ value }) => <PlaceInsert {...value} />,
    },

    block:
      ({ children }) => (
        <Text
          variant={variant}
        >
          {children}
        </Text >
      ),


    marks: {
      link: ({ children, value }) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <a href={value.href} rel={rel}>
            {children}
          </a>
        )
      },
    },
  }
}

const TextBlocks = ({ value, variant }) => {
  return <PortableText value={value} components={myPortableTextComponents(variant)} />
}

export default TextBlocks