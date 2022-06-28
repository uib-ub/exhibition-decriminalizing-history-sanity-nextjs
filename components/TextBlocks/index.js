import { Text } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'
import {
  BigTextBlock,
  HeroBlock,
  IframeBlock,
  InstagramBlock,
  PageHeaderBlock,
  QuoteBlock,
  MiradorGallery,
  TextBlock,
  ObjectBlock,
  TableBlock,
  TwoColumnBlock,
  VideoBlock,
  IllustrationWithCaption,
  ExhibitionElement,
  EventBlock,
  ActorCollection,
  GridBlock,
} from '../Sections'
import ActorInsert from './Inserts/ActorInsert'
import PlaceInsert from './Inserts/PlaceInsert'

const myPortableTextComponents = {
  types: {
    //image: ({value}) => <img src={value.imageUrl} />,
    ActorCollection: ({ value }) => <ActorCollection {...value} />,
    BigText: ({ value }) => <BigTextBlock {...value} />,
    ExhibitionElement: ({ value }) => <ExhibitionElement {...value} />,
    EventSection: ({ value }) => <EventBlock {...value} />,
    Hero: ({ value }) => <HeroBlock {...value} />,
    Iframe: ({ value }) => <IframeBlock {...value} />,
    IllustrationWithCaption: ({ value }) => <IllustrationWithCaption {...value} />,
    InstagramPost: ({ value }) => <InstagramBlock {...value} />,
    Grid: ({ value }) => <GridBlock {...value} />,
    MiradorGallery: ({ value }) => <MiradorGallery {...value} />,
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

const TextBlocks = (props) => {
  return <PortableText value={props.value} components={myPortableTextComponents} />
}

export default TextBlocks