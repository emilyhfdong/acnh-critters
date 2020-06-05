import React, { ReactNode } from "react"

export type TLocation = TFishLocation | TBugLocation

export type TFishLocation = "river" | "pond" | "sea" | "pier"

export type TBugLocation =
  | "flying"
  | "water"
  | "trees"
  | "rocks"
  | "flowers"
  | "ground"
  | "other"

export const RAW_LOCATION_TO_LOCATION: { [key: string]: TLocation } = {
  // bug locations
  Flying: "flying",
  "Flying near hybrid flowers": "flowers",
  "Flying by light": "flying",
  "On trees": "trees",
  "On the ground": "ground",
  "On flowers": "flowers",
  "On white flowers": "flowers",
  "Shaking trees": "trees",
  Underground: "ground",
  "On ponds and rivers": "water",
  "On tree stumps": "trees",
  "On palm trees": "trees",
  "Under trees": "trees",
  "On rotten food": "other",
  "On the beach": "ground",
  "On beach rocks": "rocks",
  "Near trash": "other",
  "On villagers": "other",
  "On rocks (when raining)": "rocks",
  "Hitting rocks": "rocks",
  // fish locations
  River: "river",
  Pond: "pond",
  "River (Clifftop)": "river",
  "River (Clifftop) & Pond": "river",
  "River (Mouth)": "river",
  Sea: "sea",
  Pier: "pier",
  "Sea (when raining or snowing)": "sea",
}

const FISH_LOCATION_TO_ICON = {
  sea: <i className="fas fa-water"></i>,
  river: <i className="fas fa-bacon"></i>,
  pond: <i className="fas fa-splotch"></i>,
  pier: <i className="fas fa-map-signs"></i>,
}

const BUG_LOCATION_TO_ICON = {
  flying: <i className="fas fa-cloud"></i>,
  water: <i className="fas fa-water"></i>,
  trees: <i className="fas fa-tree"></i>,
  rocks: <i className="fas fa-egg"></i>, // HELP IDK
  flowers: <i className="fas fa-seedling"></i>, // seedling, spa, sun
  ground: <i className="fas fa-shoe-prints"></i>,
  other: <i className="fas fa-ellipsis-h" />,
}

export const FISH_LOCATIONS = Object.keys(FISH_LOCATION_TO_ICON)
export const BUG_LOCATIONS = Object.keys(BUG_LOCATION_TO_ICON)

export const LOCATION_TO_ICON: { [key: string]: ReactNode } = {
  ...FISH_LOCATION_TO_ICON,
  ...BUG_LOCATION_TO_ICON,
}
