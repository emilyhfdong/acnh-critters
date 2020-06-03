import moment from "moment"
import fishJSON from "../data/fish.json"

import React from "react"
import { ReactNode } from "react"

export const locationToIcon: { [key: string]: ReactNode } = {
  pond: <i className="fas fa-splotch"></i>,
  river: <i className="fas fa-bacon"></i>,
  sea: <i className="fas fa-water"></i>,
  pier: <i className="fas fa-map-signs"></i>,
}

export type TLocation = keyof typeof locationToIcon

const rawFishData = Object.values(fishJSON)

export interface IFish {
  id: number
  name: string
  isAvailable: boolean
  price: number
  icon: string
  locations: TLocation[]
  shadowSize?: number
}

const getLocations = (locationString: string) =>
  Object.keys(locationToIcon).reduce(
    (locationList, location) =>
      locationString.toLowerCase().includes(location)
        ? [...locationList, location]
        : locationList,
    [] as Array<string>
  )

const getIsAvailableNow = (monthArray: number[], timeArray: number[]) => {
  const currentTime = moment()
  return (
    monthArray.includes(currentTime.month() + 1) &&
    timeArray.includes(currentTime.hour())
  )
}
export const getFormattedData = (data: typeof rawFishData): IFish[] => {
  return data.map(({ id, name, icon_uri, availability, price, shadow }) => ({
    id,
    name: name["name-USen"],
    icon: icon_uri,
    isAvailable: getIsAvailableNow(
      availability["month-array-northern"],
      availability["time-array"]
    ),
    price,
    locations: getLocations(availability.location),
    shadowSize: shadow.split(/\(|\)/g)[1]
      ? Number(shadow.split(/\(|\)/g)[1])
      : undefined,
  }))
}
