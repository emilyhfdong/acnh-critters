import fishJSON from "../data/fish.json"

import React from "react"
import { ReactNode } from "react"
import { getIsAvailableNow, getAvailabilityDetail } from "./formatting"

export const FISH_LOCATION_TO_ICON: { [key: string]: ReactNode } = {
  pond: <i className="fas fa-splotch"></i>,
  river: <i className="fas fa-bacon"></i>,
  sea: <i className="fas fa-water"></i>,
  pier: <i className="fas fa-map-signs"></i>,
}

export type TFishLocation = keyof typeof FISH_LOCATION_TO_ICON

const rawFishData = Object.values(fishJSON)

export interface IFish {
  id: string
  name: string
  isAvailable: boolean
  price: number
  icon: string
  locations: TFishLocation[]
  shadowSize?: number
  locationDetail: string
  availabilityDetail: string
  rarity: string
}

const getFishLocations = (locationString: string) =>
  Object.keys(FISH_LOCATION_TO_ICON).reduce(
    (locationList, location) =>
      locationString.toLowerCase().includes(location)
        ? [...locationList, location]
        : locationList,
    [] as Array<string>
  )

const formatFishData = (data: typeof rawFishData): IFish[] => {
  return data.map(({ id, name, icon_uri, availability, price, shadow }) => ({
    id: id.toString(),
    name: name["name-USen"],
    icon: icon_uri,
    isAvailable: getIsAvailableNow(
      availability["month-array-northern"],
      availability["time-array"]
    ),
    price,
    locations: getFishLocations(availability.location),
    shadowSize: shadow.split(/\(|\)/g)[1]
      ? Number(shadow.split(/\(|\)/g)[1])
      : undefined,
    locationDetail: availability.location,
    availabilityDetail: getAvailabilityDetail(
      availability["month-northern"],
      availability.time
    ),
    rarity: availability.rarity.toLowerCase(),
  }))
}

export const formattedFishData = formatFishData(rawFishData).sort(
  (a, b) => b.price - a.price
)
