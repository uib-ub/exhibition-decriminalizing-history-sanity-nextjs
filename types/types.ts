// @TODO Don't know yet where to put this or how to structure it
import {
  SanityImageObject,
  SanityImageCrop,
  SanityImageHotspot,
  SanityImageSource,
} from '@sanity/image-url/lib/types/types'
// @TODO: When we port to the new library this one should be used as PortableTextBlock type
import { PortableTextBlock as SPortableTextBlock } from '@portabletext/types'

export type ImageWithCaptionData = {
  _type: 'imageWithAltAndCaption'
  attribution?: string
  caption?: string
  image: ImageWithAlt
}

export type LinkType =
  | 'internalUrl'
  | 'externalUrl'
  | 'downloadableFile'
  | 'downloadableImage'
  | 'dateField'
  | 'textField'
  | 'numberField'
  | 'linkSelector'

export type LinkData = {
  type?: LinkType
  id?: string
  label: string
  ariaLabel?: string
  link?: { slug: string; type: string }
  href?: string
  extension?: string
  isStatic?: boolean
  staticUrl?: string
  fileName?: string
  anchorReference?: string
  filename?: string
}

export type RelatedLinksData = {
  title: string
  links: LinkData[]
}

export type IntlData = {
  locale: string
  defaultLocale: string
  messages: Record<string, string>
}

export type ImageWithAlt = {
  isDecorative: boolean
  alt?: string
  asset: SanityImageObject
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
  _type: 'imageWithAlt'
  extension?: string
}

export type ErrorPageData = {
  documentTitle?: string
  metaDescription?: string
  backgroundImage: SanityImageSource
  title?: SPortableTextBlock[]
  text?: SPortableTextBlock[]
}

export type CardTypes = 'news' | 'topics' | 'people' | 'events'

export type EventDateType = {
  date: string
  startTime?: string
  endTime?: string
  timezone: string
}

// From https://github.com/sanity-io/sanity/blob/next/packages/%40sanity/field/src/types/portableText/diff/types.ts
export type PortableTextBlock = {
  _key: string
  _type: string
  children: PortableTextChild[]
  markDefs?: { _key: string; _type: string }[]
  style?: string
}

export type PortableTextChild = {
  _key: string
  _type: string
  marks?: string[]
  text?: string
}

export type Templates = 'landingPage' | 'page' | 'news'

export type FullWidthImageData = {
  type: string
  id: string
  image: ImageWithAlt
}
