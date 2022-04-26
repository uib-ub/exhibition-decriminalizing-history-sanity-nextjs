import React from 'react'
import { kebabCase } from 'lodash'
import Link from '../Link'
import { Heading, Text } from '@chakra-ui/react'
import {
  BigText,
  Hero,
  Iframe,
  InstagramPost,
  PageHeader,
  Quote,
  MiradorGallery,
  SectionText,
  SingleLevelChart,
  SingleObject,
  Social,
  SubStory,
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
import { getFootnotesNumberArray } from '../../lib/utils'

const BlockContent = require('@sanity/block-content-to-react')

export default function PortableTextBlock(props) {
  if (!props.blocks || !Array.isArray(props.blocks) || !props.blocks.length) {
    return null
  }

  const {
    blocks,
    fontSize = { base: 'lg', sm: 'xl', md: 'xl', xl: '2xl' },
    maxW = ['md', null, '2xl', null],
    lineHeight = ['1.25', '1.3'],
    fontWeight = 'normal',
    fontFamily,
    mx,
    ...rest
  } = props

  const footnoteNumbers = getFootnotesNumberArray(props.blocks)

  const getFontSize = (level) => {
    switch (level) {
      case 'h2':
        return { base: 'xl', sm: '2xl', md: '3xl', xl: '4xl' }
      case 'h3':
        return { base: 'lg', sm: 'xl', md: '2xl', xl: '3xl' }
      default:
        return null
    }
  }

  const BlockRenderer = (props) => {
    if (!props) {
      return null
    }
    const { style = 'normal' } = props.node

    if (/^h\d/.test(style)) {
      const level = style
      // TODO: This is prone to breaking when there is both hX and strong
      const id = kebabCase(props.children)
      return (
        <Heading id={id} maxW={maxW} margin="auto" as={level} fontSize={getFontSize(level)}>
          {props.children}
        </Heading>
      )
    }

    if (style === 'blockquote') {
      return <blockquote>- {props.children}</blockquote>
    }

    return (
      <Text
        maxW={maxW}
        fontSize={fontSize}
        lineHeight={lineHeight}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        mx={mx ?? 'auto'}
        {...rest}
      >
        {props.children}
      </Text>
    )
    // Fall back to default handling
    // return BlockContent.defaultSerializers.types.block(props)
  }

  const serializers = {
    marks: {
      internalLink: ({ mark, children }) => {
        const { reference } = mark
        const href = `/id/${reference._ref}`
        const text = children.length ? children[0] : children
        return <Link href={href}>{text}</Link>
      },
      link: ({ mark, children }) => {
        // console.log(children)
        // Read https://css-tricks.com/use-target_blank/
        const { blank, href } = mark
        const text = children.length ? children[0] : children
        return blank ? (
          <Link href={href} isExternal>
            {text}
          </Link>
        ) : (
          <Link href={href}>{text}</Link>
        )
      },
      footnote: ({ children, markKey }) => {
        return (
          <span>
            {children}
            <sup>
              {/* 
              https://codesandbox.io/s/how-to-render-footnotes-in-portable-text-in-react-iupur?file=/src/index.js:254-650
              If you want numbers here, you can reuse the reduce function from Footnotes.js
              to e.g. an object with markKey as keys and the index as values.
              {[markKey]: index}. 
            */}
              <a href={`#${markKey}`}>{footnoteNumbers[markKey]}</a>
            </sup>
          </span>
        )
      },
    },
    types: {
      code: (props) => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      ),
      block: BlockRenderer,
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
      SingleLevelChart: (props) => <SingleLevelChart {...props.node} />,
      SingleObject: (props) => <SingleObject {...props.node} />,
      Social: (props) => <Social {...props.node} />,
      SubStory: (props) => <SubStory {...props.node} />,
      Table: (props) => <Table {...props.node} />,
      TimelineSection: (props) => <TimelineSection {...props.node} />,
      TwoColumn: (props) => <TwoColumn {...props.node} />,
      Video: (props) => <Video {...props.node} />,
      Actor: (props) => <ActorInsert {...props.node} />,
      Place: (props) => <PlaceInsert {...props.node} />,
    },
  }

  return <BlockContent blocks={blocks} serializers={serializers} />
}
