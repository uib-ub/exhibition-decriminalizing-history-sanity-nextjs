import { groq } from 'next-sanity'
import { activityStreamFields, siteNav, siteSettings } from './fragments'

/**
 * Enum of Classes that should generate pages
 * @readonly
 * @enum {array}
 */
export const publicDocumentTypes = [
  'HumanMadeObject',
  'Actor',
  'Concept',
  'ObjectType',
  'Place',
  'Event',
]

export const actorsQuery = groq`
  {
    "items": *[_type in ["Actor", "Group"]] | order(label, desc){ 
      _id,
      _type,
      "label":  {
        "no": coalesce(sortLabel, label.no)
      },
      hasType[]-> {
        _id,
        label
      },
      image,
      "count": count(*[references(^._id)]),
    },
    ${siteSettings}
  }
`

export const alertQuery = groq`
  *[_type == "Alert"][0] | order(_createdAt desc) {
    ...
  }
`

export const conceptsQuery = groq`
  {
    "items": *[_type in ["Concept", "ObjectType"]] | order(label.no desc){ 
      _id,
      _type,
      label,
      "count": count(*[references(^._id)]),
    },
    ${siteSettings}
  }
`

export const registryQuery = groq`
  {
    "items": *[_type in ["Concept", "ObjectType", "Actor", "Group"] && count(*[references(^._id)]) > 0] | order(label.no){ 
      _id,
      _type,
      "label":  {
        "no": coalesce(sortLabel, label.no)
      },
      "count": count(*[references(^._id)]),
    },
    ${siteSettings}
  }
`

export const frontpageQuery = groq`
  {
    "frontpage": *[ _id == "frontpage" ][0] {
      _id,
      ...,
      navMenu-> {
        ...,
        items[] {
          ...,
          "route": landingPageRoute->.slug.current
        }
      },
      content[] {
        disabled != true => {
          ...
        },
        _type == 'MiradorGallery' && disabled != true => @{
          ...,
          items[] {
            "manifest": coalesce(manifestRef->.subjectOfManifest, manifestUrl),
            canvasUrl,
          },
        },
        _type == 'SingleObject' && disabled != true => @{
          ...,
          item-> {
            _id,
            label,
            referredToBy[] {
              ...
            },
            image,
            "manifest": coalesce(subjectOfManifest, manifestUrl),
            canvasUrl,
          }
        },
        _type == 'EventSection' && disabled != true => @{
          ...,
          item-> {
            _id,
            label,
            timespan,
            location,
            referredToBy[] {
              ...
            },
            image,
          }
        },
        _type == 'Grid' => @{
          ...,
          items[] {
            ...,
            "route": landingPageRoute->.slug.current
          }
        }
      }
    },
    ${siteSettings}
  }
`

export const idsQuery = groq`
  *[_type in $publicDocumentTypes] {
    _id
  }
`

export const routesQuery = groq`
  *[ _type == "Route" ] {
    _id,
    _type,
    slug
  }
`

/* List query */
export const humanMadeObjectsQuery = groq`{
  ${siteNav},
  "items": *[_type == "HumanMadeObject"] | order(label){ 
    _id,
    _type,
    label,
    preferredIdentifier,
    homepage,
    hasType[]-> {
      _id,
      label
    },
    image,
    "description": referredToBy[]{
      ...
    },
    hasCurrentOwner[0]->{
      _id,
      label,
      image
    },
    "creation": activityStream[]{
      _type in ["Production", "BeginningOfExistence"] => @{
        "creators": contributionAssignedBy[]{
          "name": assignedActor->.label,
        	"_id": assignedActor->._id
        },
				timespan
      }
    },
    "aspectRatio": image.asset->.metadata.dimensions.aspectRatio,
    "palette": image.asset->.metadata.palette,
  },
  ${siteSettings}
}`

export const typeQuery = groq`
  *[_id == $id][0] {
    _type
  }
`

export const eventsQuery = groq`{
  "documents": [
    ...*[_type in ["Activity", "Event"]]{
      ...,
      _id,
      label,
      hasType[]->{
        _id,
        label
      },
      timespan[]{
        ...,
        "orderDate": coalesce(date, beginOfTheBegin)
      },
      tookPlaceAt[]->{
        _id,
        label
      },
    },
  ],
  "objects": [
    ...*[defined(activityStream) && count(activityStream) > 0] {
      activityStream[featured == true]{
        ${activityStreamFields}
      }
    }
  ],
  ${siteSettings}
}`

export const contactCopyQuery = groq`{
  "tags": *[_type == "media.tag"]| order(name.current desc){
    name,
    "images": *[references(^._id)]{
      ...,
      "isThumbnail": defined(*[_type == "HumanMadeObject" && references(^._id)]),
      "countAssetUsage": count(*[_type != "HumanMadeObject" && references(^._id)])
    }
  },
  ${siteSettings}
}`

export const physicalExhibitionQuery = groq`{
  "item": *[_type == 'Exhibition'][0]{
    ...,
    language[]->{
      _id,
      label
    },
    referredToBy[]{
      ...,
      language->{
        _id,
        label
      },
      body[] {
        ...,
        _type == 'ExhibitionElement' => @{
          ...,
          forseesUseOf-> {
            ...
          },
          item-> {
            _id,
            _type,
            hasType[]->{
              _id,
              label
            },
            label,
            image
          }
        }
      }
    }
  },
  ${siteSettings}
}`
