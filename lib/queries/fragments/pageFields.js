import groq from 'groq'

export const pageFields = groq`
  ...,
  navMenu->{
    ...,
    items[]{
      ...,
      "route": landingPageRoute->.slug.current
    }
  },
  content[] {
    ...,
    _type == 'reference' => @->{
      _id,
      label,
      shortDescription,
      image,
      memberOf[]->{
        _id,
        label
      }
    },
    _type == 'MiradorGallery' => @{
      ...,
      items[] {
        "manifest": coalesce(manifestRef->.subjectOfManifest, manifestUrl),
        canvasUrl,
      },
    },
    _type == 'SingleObject' => @{
      ...,
      item-> {
        "manifest": coalesce(subjectOfManifest, manifestUrl),
        canvasUrl,
      }
    },
    _type == 'Grid' => @{
      ...,
      items[] {
        ...,
        "route": landingPageRoute->.slug.current
      }
    },
  }
`
