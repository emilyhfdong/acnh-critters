import moment from "moment"

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
    ? `${getMonthName(months[0])}-${getMonthName(months[1])}`
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
