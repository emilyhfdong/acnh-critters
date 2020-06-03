import React, { useState } from "react"
import { Box, Text } from "rebass"
import fishJSON from "./data/fish.json"
import { getFormattedData } from "./utils/format-fish"
import { FishList } from "./components/fish-list"
import {
  TFilterName,
  FILTERS,
  FILTER_NAMES,
  getSizeFromFilters,
} from "./utils/filters"
import { LocationFilterButton } from "./components/location-filter-button"
import { Button } from "./components/button"
import { SizeSlider } from "./components/size-slider"

const rawFishData = Object.values(fishJSON)
const fishData = getFormattedData(rawFishData).sort((a, b) => b.price - a.price)

export const App: React.SFC<{}> = () => {
  const [filters, setFilters] = useState<TFilterName[]>([])

  const filteredFish = filters.reduce(
    (allFish, filterName) => allFish.filter(FILTERS[filterName].filter),
    fishData
  )

  const selectFilter = (selectedFilterName: TFilterName) =>
    filters.includes(selectedFilterName)
      ? FILTERS[selectedFilterName].type === "size"
        ? null
        : setFilters(filters.filter((name) => name !== selectedFilterName))
      : setFilters([
          ...filters.filter(
            (filterName) =>
              FILTERS[filterName].type !== FILTERS[selectedFilterName].type
          ),
          selectedFilterName,
        ])

  const size = getSizeFromFilters(filters)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        minHeight: "100vh",
        paddingY: "10px",
        maxWidth: "700px",
        margin: "auto",
      }}
    >
      <Text
        as="h1"
        sx={{ color: "brown", marginBottom: "5px", letterSpacing: 2 }}
      >
        ANIMAL CROSSING FISH
      </Text>
      <Box sx={{ display: "flex" }}>
        {FILTER_NAMES.filter(
          (filterName) => FILTERS[filterName].type === "location"
        ).map((filterName) => (
          <LocationFilterButton
            isActive={filters.includes(filterName)}
            onClick={() => selectFilter(filterName)}
            locationName={filterName}
          />
        ))}
      </Box>
      <SizeSlider
        disabled={size === null}
        onChange={(size) => selectFilter(`size${size}` as TFilterName)}
      />
      <Box sx={{ display: "flex", marginBottom: 10 }}>
        <Button
          isActive={size === null}
          onClick={() =>
            size === null
              ? selectFilter("size1")
              : setFilters(filters.filter((name) => !name.includes("size")))
          }
        >
          all sizes
        </Button>
        <Button
          isActive={filters.includes("available")}
          onClick={() => selectFilter("available")}
        >
          available now
        </Button>
      </Box>
      <FishList list={filteredFish} />
    </Box>
  )
}
