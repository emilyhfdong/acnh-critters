import { ICritter, getIsAvailableNow } from "./format-critters"

export const BUGS_FILTERS = {
  available: {
    filter: ({ availableHours, availableMonths }: ICritter) =>
      getIsAvailableNow(availableMonths, availableHours),
    type: "available",
  },
  flying: {
    filter: ({ location }: ICritter) => location === "flying",
    type: "location",
  },
  water: {
    filter: ({ location }: ICritter) => location === "water",
    type: "location",
  },
  trees: {
    filter: ({ location }: ICritter) => location === "trees",
    type: "location",
  },
  rocks: {
    filter: ({ location }: ICritter) => location === "rocks",
    type: "location",
  },
  flowers: {
    filter: ({ location }: ICritter) => location === "flowers",
    type: "location",
  },
  ground: {
    filter: ({ location }: ICritter) => location === "ground",
    type: "location",
  },
  other: {
    filter: ({ location }: ICritter) => location === "other",
    type: "location",
  },
}

export type TBugFilterName = keyof typeof BUGS_FILTERS

export const BUG_FILTER_NAMES = Object.keys(BUGS_FILTERS) as TBugFilterName[]

export const LOCATION_BUGS_FILTER_NAMES = BUG_FILTER_NAMES.filter(
  (filterName) => BUGS_FILTERS[filterName].type === "location"
)
