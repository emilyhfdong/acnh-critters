import React, { useState } from "react"
import { Box } from "rebass"
import {
  TFishFilterName,
  FISH_FILTERS,
  FISH_FILTER_NAMES,
  getSizeFromFilters,
} from "../utils/fish-filters"
import { Button } from "../components/button"
import { SizeSlider } from "../components/fish-size-slider"
import { useHistory } from "react-router-dom"
import { PATH_NAMES } from "../App"
import { theme } from "../theme"
import { Page } from "../components/page-container"
import { CritterList } from "../components/critter-list"
import { formattedFishData } from "../utils/format-critters"
import { LOCATION_TO_ICON } from "../utils/location"

export const FishPage: React.SFC<{}> = () => {
  const [filters, setFilters] = useState<TFishFilterName[]>(["available"])

  const filteredFish = filters.reduce(
    (allFish, filterName) => allFish.filter(FISH_FILTERS[filterName].filter),
    formattedFishData
  )

  const selectFilter = (selectedFilterName: TFishFilterName) =>
    filters.includes(selectedFilterName)
      ? FISH_FILTERS[selectedFilterName].type === "size"
        ? null
        : setFilters(filters.filter((name) => name !== selectedFilterName))
      : setFilters([
          ...filters.filter(
            (filterName) =>
              FISH_FILTERS[filterName].type !==
              FISH_FILTERS[selectedFilterName].type
          ),
          selectedFilterName,
        ])

  const size = getSizeFromFilters(filters)
  const history = useHistory()

  return (
    <Page headerText="FISH" headerOnClick={() => history.push(PATH_NAMES.bugs)}>
      <Box sx={{ display: "flex" }}>
        {FISH_FILTER_NAMES.filter(
          (filterName) => FISH_FILTERS[filterName].type === "location"
        ).map((filterName) => (
          <Button
            key={filterName}
            buttonType="circle"
            isActive={filters.includes(filterName)}
            onClick={() => selectFilter(filterName)}
          >
            {LOCATION_TO_ICON[filterName]}
          </Button>
        ))}
      </Box>
      <SizeSlider
        disabled={size === null}
        onChange={(size) => selectFilter(`size${size}` as TFishFilterName)}
      />
      <Box sx={{ display: "flex", marginBottom: theme.verticalSpacing }}>
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
      <CritterList list={filteredFish} />
    </Page>
  )
}
