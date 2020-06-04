import { TLocation, RAW_LOCATION_TO_LOCATION } from "./location"
import fishJSON from "../data/fish.json"
import bugJSON from "../data/bugs.json"

import moment from "moment"
import Fuse from "fuse.js"

const rawFishData = Object.values(fishJSON)
const rawBugData = Object.values(bugJSON)

export interface ICritter {
  id: string
  name: string
  price: number
  icon: string
  location: TLocation
  shadowSize?: number
  locationDetail: string
  availabilityDetail: string
  rarity: string
  availableMonths: number[]
  availableHours: number[]
}

export const getLocalImagePath = (uri: string) =>
  uri.replace("https://acnhapi.com/v1/", "assets/").concat(".png")

const getMonthName = (month: string) =>
  moment(month, "M").format("MMM").toLowerCase()

const getAvailabilityDetail = (monthDetail: string, timeDetail: string) => {
  const months = monthDetail.split("-")
  const monthString = monthDetail
    ? monthDetail.length === 1
      ? getMonthName(months[0])
      : `${getMonthName(months[0])}-${getMonthName(months[1])}`
    : "all year"

  const timeString = timeDetail ? timeDetail.replace(" ", "") : "all day"
  return `${monthString} ${timeString}`
}

const formatCritterData = (data: any): ICritter[] =>
  data
    .map(
      ({ id, name, icon_uri, availability, price, shadow }: any): ICritter => ({
        id: id.toString(),
        name: name["name-USen"],
        icon: getLocalImagePath(icon_uri),
        availableMonths: availability["month-array-northern"],
        availableHours: availability["time-array"],
        price,
        location: RAW_LOCATION_TO_LOCATION[availability.location],
        shadowSize:
          shadow && shadow.split(/\(|\)/g)[1]
            ? Number(shadow.split(/\(|\)/g)[1])
            : undefined,
        locationDetail: availability.location,
        availabilityDetail: getAvailabilityDetail(
          availability["month-northern"],
          availability.time
        ),
        rarity: availability.rarity.toLowerCase(),
      })
    )
    .sort((a: ICritter, b: ICritter) => b.price - a.price)

export const formattedBugData = formatCritterData(rawBugData)
export const formattedFishData = formatCritterData(rawFishData)

export const getIsAvailableNow = (
  monthArray: number[],
  timeArray: number[]
) => {
  const currentTime = moment()
  return (
    monthArray.includes(currentTime.month() + 1) &&
    timeArray.includes(currentTime.hour())
  )
}
