import { groq } from 'next-sanity'
import { siteNav, siteSettings } from './fragments'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH

const ROUTE_CONTENT = groq`
  ...,
  "excerpt": pt::text(excerpt),
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
    _type == 'EventSection' && disabled != true => {
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
    _type == 'ObjectBlock' => @{
      ...,
      item[] {
        ...,
        "objectDescription": internalRef-> {
          _id,
          label,
          preferredIdentifier,
          hasCurrentOwner[]->{
            _id,
            label,
          },
        },
        "image": coalesce(
          image,
          internalRef->.image,
        ),
        "manifest": coalesce(
          internalRef->.subjectOfManifest, 
          manifestUrl,
          "/api/manifest/" + internalRef->._id
        ),
      }
    },
    _type == 'HeroBlock' => @{
      ...,
      item {
        ...,
        "objectDescription": internalRef-> {
          _id,
          label,
          preferredIdentifier,
          hasCurrentOwner[]->{
            _id,
            label,
          },
        },
        "image": coalesce(
          image,
          internalRef->.image,
        ),
        "manifest": coalesce(
          internalRef->.subjectOfManifest, 
          manifestUrl,
          "/api/manifest/" + internalRef->._id
        ),
      }
    },
  },
  content[] {
    ...,
    _type == 'EventSection' && disabled != true => {
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
    _type == 'ObjectBlock' => @{
      ...,
      item[] {
        ...,
        "objectDescription": internalRef-> {
          _id,
          label,
          preferredIdentifier,
          hasCurrentOwner[]->{
            _id,
            label,
          },
        },
        "image": coalesce(
          image,
          internalRef->.image,
        ),
        "manifest": coalesce(
          internalRef->.subjectOfManifest, 
          manifestUrl,
          "/api/manifest/" + internalRef->._id
        ),
      }
    },
  }`

export const routeQuery = groq`*[slug.current == $slug][0]{
  ...,
  "slug": slug.current,
  "locale": *[^.page._ref in translations[].value._ref][0].translations[_key == $language].value->{${ROUTE_CONTENT}},
  "fallback": *[^.page._ref in translations[].value._ref][0].translations[_key == "en"].value->{${ROUTE_CONTENT}},                                                         
}
`
