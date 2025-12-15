import groq from 'groq'

export const siteSettings = groq`
  *[_id == "siteSettings"][0] {
    ...,
    publisher[]->{
      _id,
      label,
      image
    },
  }
`
