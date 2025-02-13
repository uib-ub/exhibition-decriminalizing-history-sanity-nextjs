import { Link } from '@/i18n/navigation'
import Timespan from '@/components/properties/timespan'
import TextBlocks from '@/components/text-blocks'
/* import Map from '../../Map' */
import HasType from '@/components/properties/has-type'

export default function Activity({ data, locale = 'en' }) {
  if (!data) {
    return null
  }

  if (data._type === 'BeginningOfExistence') {
    data._type = 'Skapt'
  }
  if (data._type === 'Production') {
    data._type = 'Produksjon'
  }

  return (
    <div>
      <h4
        className="text-lg font-bold pb-1 mb-2 border-b-2 border-gray-200"
      >
        {data.label ?? data._type}
      </h4>

      {data.hasType?.length > 0 && <HasType types={data.hasType ?? data._type} />}

      {data.timespan && <Timespan timespan={data.timespan} />}

      {data.tookPlaceAt?.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2">
          {data.tookPlaceAt.map((place) => (
            <div key={place._id} className="bg-cyan-500 text-white px-2 py-1 rounded-md">
              {place.label[locale] ?? place.label[defaultLocale]}
            </div>
          ))}
        </div>
      )}

      {data.description && <TextBlocks value={data.description} />}

      <div className="flex flex-row flex-wrap gap-2">
        {data.contributionAssignedBy?.length > 0 && (
          <div className="flex flex-row flex-wrap gap-2">
            {data.contributionAssignedBy.map((assignment) => (
              <div key={assignment.assignedActor._id} className="bg-cyan-500 text-white px-2 py-1 rounded-md">
                <Link href={`/id/${assignment.assignedActor._id}`}>
                  {assignment.assignedActor.label[locale] ?? assignment.assignedActor.label[defaultLocale]}
                </Link>
              </div>
            ))}
          </div>
        )}

        {data.target && (
          <Link key={data.target._id} href={`/id/${data.target._id}`}>
            {data.target.label[locale] ?? data.target.label[defaultLocale]}
          </Link>
        )}
      </div>

      {data.movedTo && (
        <p>
          <span>➡️</span>
          <Link href={`/id/${data.movedTo._id}`}>{data.movedTo.label[locale] ?? data.movedTo.label[defaultLocale]}</Link>
        </p>
      )}

      {data.observedDimension?.length > 0 &&
        data.observedDimension.map((dimension) => (
          <span key={dimension._key}>
            <strong>{dimension.hasType}:</strong>
            {dimension.value} {dimension.hasUnit.label[locale] ?? dimension.hasUnit.label[defaultLocale]}
          </span>
        ))}

      {/* TODO: FIX */}
      {/* <Box>
         {data.tookPlaceAt?.length > 0 &&
          data.tookPlaceAt.map((place) => (
            <>
              {place.definedByGeoJSON && (
                <div key={place._id}>
                  <Map data={place.definedByGeoJSON} />
                </div>
              )}
            </>
          ))} */}

      {/* TODO: Check this */}
      {/* {data.geoJSON && (
          <div>
            <Map data={data.geoJSON} />
          </div>
        )} 
      </Box>*/}
    </div>
  )
}
