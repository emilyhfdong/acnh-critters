import React, { useState, ReactNode } from "react"
import { Page } from "../components/page-container"
import { useHistory } from "react-router-dom"
import { PATH_NAMES } from "../App"
import { Box, SxStyleProp } from "rebass"
import { theme } from "../theme"
import { Button } from "../components/button"
import { CritterList } from "../components/critter-list"
import { getIsAvailableNow, ICritter } from "../utils/format-critters"
import { LOCATION_TO_ICON } from "../utils/location"
import { Input } from "../components/search-input"
import { Toggle } from "../components/toggle"
import Fuse from "fuse.js"

interface ISearchPageProps {
  critterList: ICritter[]
  locations: string[]
  headerText: string
  nextPage: keyof typeof PATH_NAMES
  sliderElement?: ReactNode
  locationContainerStyles?: SxStyleProp
}

export const SearchPage: React.SFC<ISearchPageProps> = ({
  critterList,
  locations,
  headerText,
  nextPage,
  sliderElement,
  locationContainerStyles,
}) => {
  const [onlyAvailable, setOnlyAvailable] = useState(true)
  const [locationFilter, setLocationFilter] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCritters = critterList.filter(
    ({ availableHours, availableMonths, location }) => {
      return (
        !(
          onlyAvailable && !getIsAvailableNow(availableMonths, availableHours)
        ) && !(locationFilter && locationFilter !== location)
      )
    }
  )

  const searchedCritters = searchTerm
    ? new Fuse(filteredCritters, {
        keys: ["name"],
        threshold: 0.5,
      })
        .search(searchTerm)
        .map(({ item }) => item)
    : filteredCritters

  const history = useHistory()
  return (
    <Page headerOnClick={() => history.push(nextPage)} headerText={headerText}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "60%",
          ...locationContainerStyles,
        }}
      >
        {locations.map((location) => (
          <Button
            key={location}
            sx={{
              marginTop: "3px",
            }}
            buttonType="circle"
            onClick={() =>
              setLocationFilter(locationFilter === location ? "" : location)
            }
            isActive={locationFilter === location}
          >
            {LOCATION_TO_ICON[location]}
          </Button>
        ))}
      </Box>
      {sliderElement}
      <Box
        sx={{
          display: "flex",
          marginBottom: theme.verticalSpacing,
          justifyContent: "center",
          paddingTop: "6px",
        }}
      >
        <Input value={searchTerm} onChange={setSearchTerm} />
        <Toggle
          isOn={onlyAvailable}
          onChange={() => setOnlyAvailable(!onlyAvailable)}
        />
      </Box>
      <CritterList list={searchedCritters} />
    </Page>
  )
}
