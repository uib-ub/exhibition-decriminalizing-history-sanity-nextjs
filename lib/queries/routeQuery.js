import { groq } from 'next-sanity'
import { siteSettings } from './fragments'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH

const ROUTE_CONTENT = groq`
  ...,
  "excerpt": pt::text(excerpt),
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
    _type in ['MiradorGallery', 'Gallery'] => @{
      ...,
      items[] {
        ...,
        "owner": manifestRef->.hasCurrentOwner[]->{
          _id,
          label
        },
        "image": coalesce(
          manifestRef->.image,
          image,
        ),
        "manifest": coalesce(
          manifestRef->.subjectOfManifest, 
          manifestUrl,
          "${basePath}/api/manifest/" + manifestRef->._id
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
          "${basePath}/api/manifest/" + manifestRef->._id
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
      }
    },
  }`

export const routeQuery = groq`
{
  "route": *[slug.current == $slug]{
  label,
  "slug": slug.current,
  "languages": [page->.__i18n_lang, ...page->.__i18n_refs[]->.__i18n_lang],
  // 'locale': coalesce(
  //  *[__i18n_base._ref match ^.page._ref && __i18n_lang == $language][0...2]{...},
  //  *[_id match ^.page._ref && __i18n_lang == $language][0...2]{...},
  // ),
  "locale": *[__i18n_base._ref match ^.page._ref && __i18n_lang == $language]{${ROUTE_CONTENT}},
  "fallback": *[_id match ^.page._ref && __i18n_lang == $language]{${ROUTE_CONTENT}}                                                                      
  },
  ${siteSettings}
}
`
