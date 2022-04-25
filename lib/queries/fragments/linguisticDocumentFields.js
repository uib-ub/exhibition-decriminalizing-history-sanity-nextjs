import groq from 'groq'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH

export const linguisticDocumentFields = groq`
  ...,
  navMenu->{
    ...,
    items[]{
      ...,
      "route": landingPageRoute->.slug.current
    }
  },
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
    _type == 'ActorCollection' => {
      ...,
      items[] {
        "label": coalesce(title, item->label.no),
        "description": coalesce(description, item->referredToBy[0].body),
        "image": coalesce(image, item->image),
        file,
        item-> {
          _id,
          label,
          shortDescription,
          referredToBy[] {
            ...
          },
          image
        }
      }
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
      }
    },
    _type == 'SubStory' => {
      ...,
      content[] {
        ...,
        _type == 'SingleObject' => {
          ...,
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
          }
        },
        _type == 'PageHeader' => {
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
        _type == 'MiradorGallery' => {
          ...,
          items[] {
            ...,
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
        _type == 'SingleObject' => {
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
          }
        },
      }
    }
  },
`
