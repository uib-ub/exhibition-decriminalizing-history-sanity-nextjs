import groq from 'groq'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH

export const linguisticDocumentFields = groq`
  ...,
  body[] {
    ...,
    _type == 'reference' => @->{
      _id,
      _type,
      label,
      shortDescription,
      image,
      memberOf[]->{
        _id,
        label,
        image
      }
    },
    _type == 'PageHeader' => @{
      ...,
      "palette": illustration.image.asset->.metadata.palette{
        darkMuted,
        darkVibrant,
        dominant,
        lightMuted,
        vibrantMuted,
        muted,
        vibrant
      }
    },
    _type == 'MiradorGallery' => @{
      ...,
      items[] {
        _id,
        label,
        view,
        "owner": manifestRef->.hasCurrentOwner[]->{
          _id,
          label
        },
        "manifest": coalesce(
          manifestRef->.subjectOfManifest, 
          manifestUrl,
          "/api/manifest/" + manifestRef->._id
        ),
        canvasUrl,
      },
    },
    _type == 'SingleObject' => @{
      ...,
      view,
      item-> {
        _id,
        label,
        "owner": hasCurrentOwner[]-> {
          _id,
          label
        },
        "manifest": coalesce(
          subjectOfManifest, 
          manifestUrl,
          "${basePath}/api/manifest/" + _id
        ),
        canvasUrl,
      },
    },
  },
`
