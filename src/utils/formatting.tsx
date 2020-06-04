import React from "react"
import moment from "moment"
import { ReactNode } from "react"

export const LOCATION_TO_ICON: { [key: string]: ReactNode } = {
  flying: <i className="fas fa-cloud"></i>,
  water: <i className="fas fa-water"></i>,
  trees: <i className="fas fa-tree"></i>,
  rocks: <i className="fas fa-egg"></i>, // HELP IDK
  flowers: <i className="fas fa-seedling"></i>, // seedling, spa, sun
  ground: <i className="fas fa-shoe-prints"></i>,
  other: <i className="fas fa-ellipsis-h" />,
  pond: <i className="fas fa-splotch"></i>,
  river: <i className="fas fa-bacon"></i>,
  sea: <i className="fas fa-water"></i>,
  pier: <i className="fas fa-map-signs"></i>,
}

export const getLocalImagePath = (uri: string) =>
  uri.replace("https://acnhapi.com/v1/", "assets/").concat(".png")

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

const getMonthName = (month: string) =>
  moment(month, "M").format("MMM").toLowerCase()

export const getAvailabilityDetail = (
  monthDetail: string,
  timeDetail: string
) => {
  const months = monthDetail.split("-")
  const monthString = monthDetail
    ? monthDetail.length === 1
      ? getMonthName(months[0])
      : `${getMonthName(months[0])}-${getMonthName(months[1])}`
    : "all year"

  const timeString = timeDetail ? timeDetail.replace(" ", "") : "all day"
  return `${monthString} ${timeString}`
}

export const getPriceRange = (price: number) => {
  if (price >= 10000) {
    return 4
  } else if (price >= 5000) {
    return 3
  } else if (price >= 1000) {
    return 2
  }
  return 1
}
