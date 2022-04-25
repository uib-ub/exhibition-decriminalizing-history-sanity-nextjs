import groq from 'groq'

export const siteSettings = groq`
  "siteSettings": *[_id == "site-settings"][0] {
    ...,
    publisher[]->{
      _id,
      label,
      image
    },
    mainNavigation->{
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
