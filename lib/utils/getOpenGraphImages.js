import { imageBuilder } from '../sanity'

export const getOpenGraphImages = (openGraphImage, title) => {
  if (!openGraphImage && !title) {
    return null
  }

  return [
    {
      url: imageBuilder.image(openGraphImage).width(800).height(600).url(),
      width: 800,
      height: 600,
      alt: title,
    },
    {
      // Facebook recommended size
      url: imageBuilder.image(openGraphImage).width(1200).height(630).url(),
      width: 1200,
      height: 630,
      alt: title,
    },
    {
      // Square 1:1
      url: imageBuilder.image(openGraphImage).width(600).height(600).url(),
      width: 600,
      height: 600,
      alt: title,
    },
  ]
}
