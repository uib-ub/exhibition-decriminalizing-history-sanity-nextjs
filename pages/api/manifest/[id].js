import { sanityClient, previewClient } from '../../../lib/sanity.server'
const getClient = (preview) => (preview ? previewClient : sanityClient)

/* 
  Construct IIIF Image uri
*/
const fixIIIFUrl = (i) => {
  const url = new URL(i)
  const p = url.pathname.split('/')
  const imageUrl =
    url.protocol + '//' + url.hostname + p.slice(0, -1).join('/') + '/iiif/' + p.slice(-1)
  return imageUrl
}

/* 
  Construct a IIIF Presentation v3 manifest json
*/
const constructManifest = async (object) => {
  if (!object) {
    throw new Error('No input')
  }

  const iiified = {
    ...object,
    images: object.images.map((i) => ({
      ...i,
      url: fixIIIFUrl(i.url),
    })),
  }

  const manifest = {
    '@context': 'http://iiif.io/api/presentation/3/context.json',
    id: `https://example.org/iiif/${iiified._id}/manifest`,
    type: 'Manifest',
    label: { no: [`${iiified.label.no}`], en: [`${iiified.label.en}`] },
    provider: [
      {
        id: 'https://www.uib.no/ub',
        type: 'Agent',
        label: {
          no: ['Universitetsbiblioteket i Bergen'],
          en: ['University of Bergen Library'],
        },
        homepage: [
          {
            id: 'https://www.uib.no/ub',
            type: 'Text',
            label: {
              no: ['Universitetsbiblioteket i Bergen hjemmeside'],
              en: ['University of Bergen Library Homepage'],
            },
            format: 'text/html',
          },
        ],
        logo: [
          {
            id: 'http://marcus.uib.no/img/UiBmerke_grayscale.svg',
            type: 'Image',
            format: 'image/svg+xml',
          },
        ],
      },
    ],
    rights: 'https://creativecommons.org/licenses/by/4.0/',
    requiredStatement: {
      label: {
        no: ['Kreditering'],
        en: ['Attribution'],
      },
      value: {
        no: ['Tilgjengeliggjort av Universitetsbiblioteket i Bergen'],
        en: ['Provided by University of Bergen Library'],
      },
    },
    items: [
      ...iiified.images.map((image, index) => {
        return {
          id: `https://example.org/iiif/${iiified._id}/canvas/${index + 1}`,
          type: 'Canvas',
          label: {
            none: [`${index + 1}`],
          },
          width: image.width,
          height: image.height,
          items: [
            {
              id: `https://example.org/iiif/${iiified._id}/page/${index + 1}`,
              type: 'AnnotationPage',
              items: [
                {
                  id: `https://example.org/iiif/${iiified._id}/annotation/p${index + 1}`,
                  type: 'Annotation',
                  motivation: 'painting',
                  target: `https://example.org/iiif/${iiified._id}/canvas/${index + 1}`,
                  body: {
                    id: image.url,
                    type: 'Image',
                    format: 'image/jpeg',
                    service: {
                      id: image.url,
                      type: 'ImageService2',
                      profile: 'level2',
                    },
                  },
                },
              ],
            },
          ],
        }
      }),
    ],
    structures: [
      {
        id: `https://example.org/iiif/${iiified._id}/seq/s1`,
        type: 'Range',
        label: {
          en: ['Table of contents'],
        },
        items: [
          ...iiified.images.map((image, index) => {
            return {
              type: 'Canvas',
              id: `https://example.org/iiif/${iiified._id}/canvas/${index + 1}`,
            }
          }),
        ],
      },
    ],
  }
  return manifest
}

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req
  const preview = false

  /* 
    Change the query to fit you data :-)
  */
  async function getObject(id, preview = false) {
    const results = await getClient(preview).fetch(
      `*[_id == $id] {
        _id,
        label,
        "images": coalesce(
          digitallyShownBy[].asset-> {
            url, 
            "height": metadata.dimensions.height,
            "width": metadata.dimensions.width
          }, 
          [image.asset-> {
            url, 
            "height": metadata.dimensions.height,
            "width": metadata.dimensions.width
          }]
        )
      }`,
      { id },
    )
    return results
  }

  switch (method) {
    case 'GET': {
      const results = getObject(id, preview)
      const object = await results
      const constructedManifest = constructManifest(object[0])
      const manifest = await constructedManifest

      /* console.log('Manfest served: ' + object[0]._id) */
      res.status(200).json(manifest)
      break
    }
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
