import { nanoid } from 'nanoid'

export const mapTypes = (types) => {
  let mappedTypes = []
  const toDay = Date.now()

  types.map((type) => {
    switch (type) {
      case 'ubbont:Painting':
        mappedTypes.push({
          _ref: 'f6798689-dd33-41be-9e69-d5fd4eaa9e0c', // KN
          _type: 'reference',
          _key: nanoid(),
        })
        break
      case 'ubbont:Photograph':
        mappedTypes.push({
          _ref: 'dd730dd9-8610-4ce1-bfd5-4d5b4f29765b', // KN
          _type: 'reference',
          _key: nanoid(),
        })
        break
      case 'bibo:Manuscript':
        mappedTypes.push({
          _ref: 'b5e756a0-74af-4bfa-b9bb-1ca9a8c79344', // KN
          _type: 'reference',
          _key: nanoid(),
        })
        break
      case 'bøker':
        mappedTypes.push({
          _ref: '02383be8-db2e-4f7b-a6b5-a4288b1c3aa0', // KN
          _type: 'reference',
          _key: nanoid(),
        })
        break
      case 'bilder':
        mappedTypes.push({
          _ref: 'dd730dd9-8610-4ce1-bfd5-4d5b4f29765b', // KN
          _type: 'reference',
          _key: nanoid(),
        })
        break
      case 'privatarkivmateriale':
        mappedTypes.push({
          _ref: 'b5e756a0-74af-4bfa-b9bb-1ca9a8c79344', // KN
          _type: 'reference',
          _key: nanoid(),
        })
        break
      case 'Person':
        mappedTypes.push({
          _ref: '787513b1-33bf-4c41-8363-a0c1989b020d',
          _type: 'reference',
          _key: nanoid(),
        })
        break
      case 'Organization':
        mappedTypes.push(
          {
            _ref: 'd4ad3e47-1498-4b95-9b7f-c25be386691a', // Group
            _type: 'reference',
            _key: nanoid(),
          },
          {
            _ref: '14cfb90c-3e7f-46da-96e8-46a548f6a50f', // Organization
            _type: 'reference',
            _key: nanoid(),
          }
        )
        break
      default:
        break
    }
  })

  return mappedTypes
}
