import { IBug } from "./format-bugs"

export const BUGS_FILTERS = {
  available: {
    filter: (bug: IBug) => bug.isAvailable,
    type: "available",
  },
  flying: {
    filter: (bug: IBug) => bug.location === "flying",
    type: "location",
  },
  water: {
    filter: (bug: IBug) => bug.location === "water",
    type: "location",
  },
  trees: {
    filter: (bug: IBug) => bug.location === "trees",
    type: "location",
  },
  rocks: {
    filter: (bug: IBug) => bug.location === "rocks",
    type: "location",
  },
  flowers: {
    filter: (bug: IBug) => bug.location === "flowers",
    type: "location",
  },
  ground: {
    filter: (bug: IBug) => bug.location === "ground",
    type: "location",
  },
  other: {
    filter: (bug: IBug) => bug.location === "other",
    type: "location",
  },
}

export type TBugFilterName = keyof typeof BUGS_FILTERS

export const BUG_FILTER_NAMES = Object.keys(BUGS_FILTERS) as TBugFilterName[]

export const LOCATION_BUGS_FILTER_NAMES = BUG_FILTER_NAMES.filter(
  (filterName) => BUGS_FILTERS[filterName].type === "location"
)
