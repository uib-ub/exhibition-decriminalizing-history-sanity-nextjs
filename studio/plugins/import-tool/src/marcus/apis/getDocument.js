import { nanoid } from 'nanoid'
import { parse } from 'date-fns'
import { mapLicenses } from '../../shared/mapLicenses'
import { mapOwner } from '../../shared/mapOwner'

export default function getDocument(item, types, assetID) {
  const parseDate = (date) => {
    if (!date) {
      return null
    }
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date())
    return parsedDate
  }

  const description = Array.isArray(item.description) ? item.description : [item.description]

  const subject = item.subject
    ? [
      ...item.subject.map((s) => {
        return {
          _type: 'Concept',
          _id: s.identifier,
          _rev: nanoid(),
          accessState: 'open',
          editorialState: 'published',
          label: {
            _type: 'LocalizedString',
            no: Array.isArray(s.prefLabel) === false ? s.prefLabel : s.prefLabel[0],
          },
        }
      }),
    ]
    : []

  const maker = item.maker
    ? [
      ...item.maker.map((s) => {
        return {
          _type: 'Actor',
          _id: s.identifier,
          _rev: nanoid(),
          accessState: 'open',
          editorialState: 'published',
          label: {
            _type: "LocalizedString",
            no: Array.isArray(s.name) === false ? s.name : s.name[0]
          },
        }
      }),
    ]
    : []

  const depicts = item.depicts
    ? [
      ...item.depicts.map((s) => {
        return {
          _type: 'Actor',
          _id: s.identifier,
          _rev: nanoid(),
          accessState: 'open',
          editorialState: 'published',
          label: {
            _type: "LocalizedString",
            no: Array.isArray(s.name) === false ? s.name : s.name[0]
          },
        }
      }),
    ]
    : []

  const activityStream = [
    {
      _key: nanoid(),
      _type: 'BeginningOfExistence',
      ...(item.maker && {
        contributionAssignedBy: [
          ...item.maker.map((s) => {
            return {
              _key: nanoid(),
              _type: 'ContributionAssignment',
              assignedActor: {
                _ref: s.identifier,
                _type: 'reference',
              },
            }
          }),
        ],
      }),
      ...((item.created || item.madeAfter || item.madeBefore) && {
        timespan: [
          {
            _key: nanoid(),
            _type: 'Timespan',
            ...(item.madeAfter?.value ? { beginOfTheBegin: item.madeAfter?.value } : ''),
            ...(item.madeBefore?.value ? { endOfTheEnd: item.madeBefore?.value } : ''),
            ...(item.created?.value ? { date: parseDate(item.created?.value) } : ''),
          },
        ],
      }),
    },
  ]

  const doc = {
    subject,
    maker,
    depicts,
    doc: {
      _type: 'HumanMadeObject',
      _id: `${item.identifier}`,
      accessState: 'open',
      editorialState: 'published',
      label: {
        _type: "LocalizedString",
        no: item.title
      },
      preferredIdentifier: item.identifier,
      homepage: item.homepage.id,
      subjectOfManifest: `https://marcus-manifest-api.vercel.app/api/iiif/manifest/${item.identifier}`,
      identifiedBy: [
        {
          _type: 'Identifier',
          _key: nanoid(),
          content: item.identifier,
          hasType: {
            _type: 'reference',
            _key: nanoid(),
            _ref: 'de22df48-e3e7-47f2-9d29-cae1b5e4d728',
          },
        },
      ],
      license: mapLicenses(item.license),
      image: {
        _type: 'DigitalImageObject',
        asset: {
          _type: 'reference',
          _ref: assetID,
        },
      },
      ...(Object.keys(activityStream[0]).length > 2 && {
        activityStream,
      }),
      ...(description && {
        referredToBy: [
          ...description.map(d => ({
            _key: nanoid(),
            _type: 'LinguisticObject',
            accessState: 'open',
            editorialState: 'published',
            body: [
              {
                _type: 'block',
                _key: nanoid(),
                style: 'normal',
                markDefs: [],
                children: [
                  {
                    _type: 'span',
                    _key: nanoid(),
                    text: d,
                    marks: [],
                  },
                ],
              },
            ],
            hasType: [
              {
                _key: nanoid(),
                _ref: 'cad752ea-0888-415a-a691-9d5b92577389',
                _type: 'reference',
              },
            ],
            language: {
              _ref: 'e81f617f-b767-4e7c-8495-93b745f47aa0',
              _type: 'reference',
            },
          })),
        ],
      }),
      ...(item.subject && {
        subject: [
          ...item.subject.map((s) => {
            return {
              _type: 'reference',
              _key: nanoid(),
              _ref: s.identifier,
            }
          }),
        ],
      }),
      ...(item.depicts && {
        depicts: [
          ...item.depicts.map((s) => {
            return {
              _type: 'reference',
              _key: nanoid(),
              _ref: s.identifier,
            }
          }),
        ],
      }),
      hasCurrentOwner: mapOwner(item.identifier),
      ...(types.length > 0 && { hasType: types }),
      wasOutputOf: {
        _type: 'DataTransferEvent',
        _key: nanoid(),
        /* _id: nanoid(36), <- Insert if this is to be changed to a reference */
        transferred: {
          _type: 'DigitalObject',
          _key: nanoid(),
          /* _id: item.id, */
          value: `"${JSON.stringify(item, null, 0)}"`,
        },
        timestamp: new Date(),
        hasSender: {
          _type: 'DigitalDevice',
          _key: nanoid(),
          /* _id: nanoid(36), */
          label: 'sparql.ub.uib.no',
        },
      },
    },
  }

  return doc
}
