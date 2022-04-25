import groq from 'groq'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH

export const humanMadeObjectFields = groq`
  _id,
  _type,
  depicts[]-> {
    _id,
    label,
    image
  },
  label,
  hasType[]-> {
    ...
  },
  homepage,
  image{
    ...,
    "palette": asset->.metadata.palette{
      darkMuted,
      darkVibrant,
      dominant,
      lightMuted,
      lightVibrant,
      muted,
      vibrant
    }
  },
  subjectOfManifest,
  "manifest": coalesce(
    subjectOfManifest, 
    "${basePath}/api/manifest/" + _id
  ),
  preferredIdentifier,
  identifiedBy[] {
    ...,
    hasType[]-> {
      ...
    },
    language[]-> {
      ...
    }
  },
  activityStream[]{
    _type == 'reference' => @->{
      ...,
      contributionAssignedBy[]{
        ...,
        assignedActor->{
          _id,
          label,
          image{
            asset->
          }
        }
      }
    },
    ...,
    hasType[]-> {
      ...
    },
    tookPlaceAt[]->,
    movedFrom->{
      _id,
      label,
      geoJSON
    },
    movedTo->{
      _id,
      label,
      geoJSON
    },
    contributionAssignedBy[]{
      _type == 'reference' => @->{
        'assignedActor': {
          _id,
          label,
          image{
            asset->
          }
        }
      },
      ...,
      assignedActor->{
        _id,
        label,
        image{
          asset->
        }
      }
    },
    target->{
      _id,
      label,
      image{
        asset->
      }
    }
  },
  "excerpt": pt::text(referredToBy[0].body),
  referredToBy[] {
    ...,
    body[] {
      ...,
      _type == 'reference' => @->{
        _id,
        _type,
        preferredIdentifier,
        label,
        subjectOfManifest,
        image{
          ...,
          asset->
        }
      }
    },
    hasType[]-> {
      ...
    },
    language-> {
      ...
    }
  },
  hasCurrentOwner[]-> {
    _id,
    label,
    image
  },
  subject[]-> {
    ...
  },
`
