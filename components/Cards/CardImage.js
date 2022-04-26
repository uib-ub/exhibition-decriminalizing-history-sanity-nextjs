import Image from 'next/image'
import { getNextSanityImage } from '../../lib/sanity.server'

export default function ItemImage(props) {
  if (!props && props.url) {
    return null
  }

  const { label, url } = props

  return <Image alt={label ?? ''} {...getNextSanityImage(url)} layout="responsive" />
}
