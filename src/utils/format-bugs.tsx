import React, { ReactNode } from "react"
import bugsJSON from "../data/bugs.json"
import { getIsAvailableNow, getAvailabilityDetail } from "./formatting"

const rawBugsData = Object.values(bugsJSON)

export const BUG_LOCATION_TO_ICON: { [key: string]: ReactNode } = {
  flying: <i className="fas fa-cloud"></i>,
  water: <i className="fas fa-water"></i>,
  trees: <i className="fas fa-tree"></i>,
  rocks: <i className="fas fa-egg"></i>, // HELP IDK
  flowers: <i className="fas fa-seedling"></i>, // seedling, spa, sun
  ground: <i className="fas fa-shoe-prints"></i>,
  other: <i className="fas fa-ellipsis-h" />,
}

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
  id: number
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
    id,
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
