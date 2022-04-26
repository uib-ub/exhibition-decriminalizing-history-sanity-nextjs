import Image from 'next/image'
import { GetImage } from '../../lib/sanity.server'

export default function ItemImage(props) {
  if (!props && props.url) {
    return null
  }

  const { label, url } = props

  return <Image alt={label ?? ''} {...GetImage(url)} layout="responsive" />
}
