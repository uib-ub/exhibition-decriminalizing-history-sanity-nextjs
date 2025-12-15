import { groq } from 'next-sanity';

export const siteNav = groq`*[_id == "main-nav"][0]{
  tree[] {
    // Make sure you include each item's _key and parent
    _key,
    parent,
    // "Expand" the reference to the node
    value {
      reference->{
        // Get whatever property you need from your documents
        "label": coalesce(
          label,
          *[
            _type == "translation.metadata" 
            && ^.page._ref in translations[].value._ref 
          ].translations[].value->.label,
          page->.label,
        ),
        description,
        "route": coalesce(slug.current,link,route),
        backgroundColor {
          hex,
        },
        foregroundColor {
          hex
        },
      }
    }
  }
}`