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
