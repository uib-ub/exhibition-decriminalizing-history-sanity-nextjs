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
    ActorCollection: (props) => <ActorCollection {...props.node} />,
    BigText: (props) => <BigText {...props.node} />,
    ExhibitionElement: (props) => <ExhibitionElement {...props.node} />,
    EventSection: (props) => <EventSection {...props.node} />,
    Hero: (props) => <Hero {...props.node} />,
    Iframe: (props) => <Iframe {...props.node} />,
    IllustrationWithCaption: (props) => <IllustrationWithCaption {...props.node} />,
    InstagramPost: (props) => <InstagramPost {...props.node} />,
    Gallery: (props) => <Gallery {...props.node} />,
    MiradorGallery: (props) => <MiradorGallery {...props.node} />,
    PageHeader: (props) => <PageHeader {...props.node} />,
    Quote: (props) => <Quote {...props.node} />,
    SectionText: (props) => <SectionText {...props.node} />,
    SingleObject: (props) => <SingleObject {...props.node} />,
    Social: (props) => <Social {...props.node} />,
    Table: (props) => <Table {...props.node} />,
    TimelineSection: (props) => <TimelineSection {...props.node} />,
    TwoColumn: (props) => <TwoColumn {...props.node} />,
    Video: (props) => <Video {...props.node} />,
    Actor: (props) => <ActorInsert {...props.node} />,
    Place: (props) => <PlaceInsert {...props.node} />,
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