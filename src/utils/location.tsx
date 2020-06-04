import React, { ReactNode } from "react"

export type TLocation =
  // bug locations
  | "flying"
  | "water"
  | "trees"
  | "rocks"
  | "flowers"
  | "ground"
  | "other"
  // fish locations
  | "river"
  | "pond"
  | "sea"
  | "pier"

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
