import groq from 'groq'

export const siteSettings = groq`
  "siteSettings": *[_id == "siteSettings"][0] {
    ...,
    publisher[]->{
      _id,
      label,
      image
    },
    footer->{
      ...,
      navMenu->{
        items[]{
          _key,
          label,
          "route": coalesce(landingPageRoute->.slug.current, route, link),
          children[]{
            _key,
            label,
            "route": coalesce(landingPageRoute->.slug.current, route, link),
          }
        }
      }
    }
  }
`
