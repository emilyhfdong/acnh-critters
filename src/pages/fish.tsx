import React, { useState } from "react"
import { Box } from "rebass"

import { Button } from "../components/button"
import { SizeSlider } from "../components/fish-size-slider"
import { useHistory } from "react-router-dom"
import { PATH_NAMES } from "../App"
import { Page } from "../components/page-container"
import { CritterList } from "../components/critter-list"
import { formattedFishData, getIsAvailableNow } from "../utils/format-critters"
import { LOCATION_TO_ICON, FISH_LOCATIONS } from "../utils/location"
import Fuse from "fuse.js"
import { Input } from "../components/search-input"
import { theme } from "../theme"
import { Toggle } from "../components/toggle"

export const FishPage: React.SFC<{}> = () => {
  const [onlyAvailable, setOnlyAvailable] = useState(true)
  const [locationFilter, setLocationFilter] = useState("")
  const [sizeRange, setSizeRange] = useState([1, 6])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFish = formattedFishData.filter(
    ({ availableHours, availableMonths, location, shadowSize = 6 }) => {
      const [minSize, maxSize] = sizeRange

      return (
        !(
          onlyAvailable && !getIsAvailableNow(availableMonths, availableHours)
        ) &&
        !(locationFilter && locationFilter !== location) &&
        shadowSize >= minSize &&
        shadowSize <= maxSize
      )
    }
  )

  const searchedFish = searchTerm
    ? new Fuse(filteredFish, { keys: ["name"], threshold: 0.5 })
        .search(searchTerm)
        .map(({ item }) => item)
    : filteredFish

  const history = useHistory()

  return (
    <Page headerText="FISH" headerOnClick={() => history.push(PATH_NAMES.bugs)}>
      <Box sx={{ display: "flex" }}>
        {FISH_LOCATIONS.map((location) => (
          <Button
            key={location}
            buttonType="circle"
            isActive={locationFilter === location}
            onClick={() =>
              setLocationFilter(locationFilter === location ? "" : location)
            }
          >
            {LOCATION_TO_ICON[location]}
          </Button>
        ))}
      </Box>
      <SizeSlider onChange={setSizeRange} />

      <Box
        sx={{
          display: "flex",
          marginBottom: theme.verticalSpacing,
          justifyContent: "center",
        }}
      >
        <Input onChange={setSearchTerm} />
        <Toggle
          isOn={onlyAvailable}
          onChange={() => setOnlyAvailable(!onlyAvailable)}
        />
      </Box>
      <CritterList list={searchedFish} />
    </Page>
  )
}
