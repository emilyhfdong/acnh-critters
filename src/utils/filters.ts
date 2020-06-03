import { IFish } from "./format-fish"

export const FILTERS = {
  available: {
    filter: (fish: IFish) => fish.isAvailable,
    type: "available",
  },
  sea: {
    filter: (fish: IFish) => fish.locations.includes("sea"),
    type: "location",
  },
  river: {
    filter: (fish: IFish) => fish.locations.includes("river"),
    type: "location",
  },
  pond: {
    filter: (fish: IFish) => fish.locations.includes("pond"),
    type: "location",
  },
  pier: {
    filter: (fish: IFish) => fish.locations.includes("pier"),
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

export type TFilterName = keyof typeof FILTERS

export const FILTER_NAMES = Object.keys(FILTERS) as TFilterName[]

const getSizeFromFilterName = (filterName?: TFilterName) =>
  filterName ? Number(filterName.replace("size", "")) : null

export const getSizeFromFilters = (filters: TFilterName[]) =>
  getSizeFromFilterName(
    filters.find((filterName) => FILTERS[filterName].type === "size")
  )
