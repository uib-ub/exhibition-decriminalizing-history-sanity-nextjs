import Timespan from '@/components/properties/timespan'
import { Badge } from '@/components/ui/badge'
import getLocalizedTypeLabel from '@/lib/getLocalizedTypeLabel'

export default function Production(props) {
  if (!props) {
    return null
  }

  const { _type, label, timespan, contributionAssignedBy, usedGeneralTechnique, locale = 'en' } = props

  return (
    <div className="flex flex-col">
      <h3 className="text-sm font-semibold pb-0 mb-0">
        {label?.[locale] ?? getLocalizedTypeLabel(_type, locale)?.[locale]}
      </h3>

      <div>
        {contributionAssignedBy?.length > 0 && contributionAssignedBy.map((assignment) => (
          <span key={assignment.assignedActor._id}>
            {assignment.assignedActor.label[locale]}
          </span>
        ))}
      </div>

      {timespan && <Timespan fontWeight="bolder" timespan={timespan} />}

      {usedGeneralTechnique?.length > 0 && (
        <div>
          {usedGeneralTechnique.map((i) => (
            <Badge key={i._id} className="rounded-full">
              {i.label[locale]}
            </Badge>
          ))}
        </div>
      )}
    </div >
  )
}
