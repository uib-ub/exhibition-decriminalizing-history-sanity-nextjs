import { Link } from '@/i18n/navigation'
import Timespan from '@/components/properties/timespan'
import { Badge } from '@/components/ui/badge'
import getLocalizedTypeLabel from '@/lib/getLocalizedTypeLabel'

export default function Production(props) {
  if (!props) {
    return null
  }

  const { _type, label, timespan, contributionAssignedBy, usedGeneralTechnique, locale = 'en' } = props

  return (
    <div>
      <h3 className="text-sm font-semibold pb-2">
        {label?.[locale] ?? getLocalizedTypeLabel(_type, locale)?.[locale]}
      </h3>

      {timespan && <Timespan fontWeight="bolder" timespan={timespan} />}

      <div className="flex flex-wrap gap-2 mt-3">
        {contributionAssignedBy?.length > 0 && (
          <>
            {contributionAssignedBy.map((assignment) => (
              <Badge key={assignment.assignedActor._id} className="rounded-full text-md">
                <Link href={`/id/${assignment.assignedActor._id}`}>
                  {assignment.assignedActor.label[locale]}
                </Link>
              </Badge>
            ))}
          </>
        )}

        {usedGeneralTechnique?.length > 0 && (
          <>
            {usedGeneralTechnique.map((i) => (
              <Badge key={i._id} className="rounded-full text-xl">
                {i.label[locale]}
              </Badge>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
