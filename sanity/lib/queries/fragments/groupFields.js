import groq from 'groq'
import { activityStreamFields } from './activityStreamFields'

export const groupFields = groq`
  ...,
  hasType[]->{
    ...
  },
  image {
    ...
  },
  referredToBy[] {
    ...
  },
  activityStream[]{
    ${activityStreamFields}
  },
  "birth": activityStream[_type == "Birth"][0]{...},
  "death": activityStream[_type == "Death"][0]{...},
  "hasMember": *[_type in ["Actor", "Group"] && references(^._id)]{ 
    _id,
    _type,
    label
  },
  "mentionedIn": *[_type in ["HumanMadeObject", "LinguisticDocument"] && references(^._id)]{ 
    _type == "HumanMadeObject" => {
      _id
    },
    _type == "LinguisticDocument" => {
      "_id": *[_type == "Route" && references(^._id)][0].slug.current
    },
    _type,
    label,
    preferredIdentifier,
    hasType[]->{
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
      _type in ["Production", "BeginningOfExistence"] => ^{
        "creators": contributionAssignedBy[]{
          "name": assignedActor->.label,
        	"_id": assignedActor->._id
        },
				timespan
      }
    },
    "aspectRatio": image.asset->.metadata.dimensions.aspectRatio,
  }
`
