import { IFish } from "./format-fish"

export const FISH_FILTERS = {
  available: {
    filter: (fish: IFish) => fish.isAvailable,
    type: "available",
  },
  sea: {
    filter: (fish: IFish) => fish.location === "sea",
    type: "location",
  },
  river: {
    filter: (fish: IFish) => fish.location === "river",
    type: "location",
  },
  pond: {
    filter: (fish: IFish) => fish.location === "pond",
    type: "location",
  },
  pier: {
    filter: (fish: IFish) => fish.location === "pier",
    type: "location",
  },
  size1: {
    filter: (fish: IFish) => fish.shadowSize === 1,
    type: "size",
  },
  size2: {
    filter: (fish: IFish) => fish.shadowSize === 2,
    type: "size",
  },
  size3: {
    filter: (fish: IFish) => fish.shadowSize === 3,
    type: "size",
  },
  size4: {
    filter: (fish: IFish) => fish.shadowSize === 4,
    type: "size",
  },
  size5: {
    filter: (fish: IFish) => fish.shadowSize === 5,
    type: "size",
  },
  size6: {
    filter: (fish: IFish) => fish.shadowSize === 6,
    type: "size",
  },
}

export type TFishFilterName = keyof typeof FISH_FILTERS

export const FISH_FILTER_NAMES = Object.keys(FISH_FILTERS) as TFishFilterName[]

const getSizeFromFilterName = (filterName?: TFishFilterName) =>
  filterName ? Number(filterName.replace("size", "")) : null

export const getSizeFromFilters = (filters: TFishFilterName[]) =>
  getSizeFromFilterName(
    filters.find((filterName) => FISH_FILTERS[filterName].type === "size")
  )
