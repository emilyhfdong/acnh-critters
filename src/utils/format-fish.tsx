import fishJSON from "../data/fish.json"
import {
  getIsAvailableNow,
  getAvailabilityDetail,
  getLocalImagePath,
} from "./formatting"

export type TFishLocation = "river" | "pond" | "sea" | "pier"

const rawFishData = Object.values(fishJSON)

const mapRawFishLocationToLocation: { [key: string]: TFishLocation } = {
  River: "river",
  Pond: "pond",
  "River (Clifftop)": "river",
  "River (Clifftop) & Pond": "river",
  "River (Mouth)": "river",
  Sea: "sea",
  Pier: "pier",
  "Sea (when raining or snowing)": "sea",
}

export interface IFish {
  id: string
  name: string
  isAvailable: boolean
  price: number
  icon: string
  location: TFishLocation
  shadowSize?: number
  locationDetail: string
  availabilityDetail: string
  rarity: string
}

const formatFishData = (data: typeof rawFishData): IFish[] => {
  return data.map(({ id, name, icon_uri, availability, price, shadow }) => ({
    id: id.toString(),
    name: name["name-USen"],
    icon: getLocalImagePath(icon_uri),
    isAvailable: getIsAvailableNow(
      availability["month-array-northern"],
      availability["time-array"]
    ),
    price,
    location: mapRawFishLocationToLocation[availability.location],
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
