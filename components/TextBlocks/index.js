import { PortableText } from '@portabletext/react'
import {
  BigText,
  Hero,
  Iframe,
  InstagramPost,
  PageHeader,
  Quote,
  MiradorGallery,
  SectionText,
  SingleObject,
  Social,
  Table,
  TimelineSection,
  TwoColumn,
  Video,
  IllustrationWithCaption,
  ExhibitionElement,
  EventSection,
  ActorCollection,
  Grid,
  Gallery,
} from '../Sections'
import ActorInsert from './Inserts/ActorInsert'
import PlaceInsert from './Inserts/PlaceInsert'

const myPortableTextComponents = {
  types: {
    //image: ({value}) => <img src={value.imageUrl} />,
    callToAction: ({ value, isInline }) =>
      isInline ? (
        <a href={value.url}>{value.text}</a>
      ) : (
        <div className="callToAction">{value.text}</div>
      ),
    ActorCollection: ({ value }) => <ActorCollection {...value} />,
    BigText: ({ value }) => <BigText {...value} />,
    ExhibitionElement: ({ value }) => <ExhibitionElement {...value} />,
    EventSection: ({ value }) => <EventSection {...value} />,
    Hero: ({ value }) => <Hero {...value} />,
    Iframe: ({ value }) => <Iframe {...value} />,
    IllustrationWithCaption: ({ value }) => <IllustrationWithCaption {...value} />,
    InstagramPost: ({ value }) => <InstagramPost {...value} />,
    Gallery: ({ value }) => <Gallery {...value} />,
    Grid: ({ value }) => <Grid {...value} />,
    MiradorGallery: ({ value }) => <MiradorGallery {...value} />,
    PageHeader: ({ value }) => <PageHeader {...value} />,
    Quote: ({ value }) => <Quote {...value} />,
    SectionText: ({ value }) => <SectionText {...value} />,
    SingleObject: ({ value }) => <SingleObject {...value} />,
    Social: ({ value }) => <Social {...value} />,
    Table: ({ value }) => <Table {...value} />,
    TimelineSection: ({ value }) => <TimelineSection {...value} />,
    TwoColumn: ({ value }) => <TwoColumn {...value} />,
    Video: ({ value }) => <Video {...value} />,
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