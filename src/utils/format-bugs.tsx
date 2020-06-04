import bugsJSON from "../data/bugs.json"
import { getIsAvailableNow, getAvailabilityDetail } from "./formatting"

const rawBugsData = Object.values(bugsJSON)

export type TBugLocation =
  | "flying"
  | "water"
  | "trees"
  | "rocks"
  | "flowers"
  | "ground"
  | "other"

const mapRawLocationsToLocations: { [key: string]: TBugLocation } = {
  Flying: "flying",
  "Flying near hybrid flowers": "flowers",
  "Flying by light": "flying",
  "On trees": "trees",
  "On the ground": "ground",
  "On flowers": "flowers",
  "On white flowers": "flowers",
  "Shaking trees": "trees",
  Underground: "ground",
  "On ponds and rivers": "water",
  "On tree stumps": "trees",
  "On palm trees": "trees",
  "Under trees": "trees",
  "On rotten food": "other",
  "On the beach": "ground",
  "On beach rocks": "rocks",
  "Near trash": "other",
  "On villagers": "other",
  "On rocks (when raining)": "rocks",
  "Hitting rocks": "rocks",
}

export interface IBug {
  id: string
  name: string
  isAvailable: boolean
  price: number
  icon: string
  location: TBugLocation
  availabilityDetail: string
  rarity: string
  locationDetail: string
}

const formatBugsData = (data: typeof rawBugsData): IBug[] => {
  return data.map(({ id, name, icon_uri, availability, price }) => ({
    id: id.toString(),
    name: name["name-USen"],
    icon: icon_uri,
    isAvailable: getIsAvailableNow(
      availability["month-array-northern"],
      availability["time-array"]
    ),
    price,
    location: mapRawLocationsToLocations[availability.location],
    availabilityDetail: getAvailabilityDetail(
      availability["month-northern"],
      availability.time
    ),
    rarity: availability.rarity,
    locationDetail: availability.location,
  }))
}

export const formattedBugsData = formatBugsData(rawBugsData).sort(
  (a, b) => b.price - a.price
)
