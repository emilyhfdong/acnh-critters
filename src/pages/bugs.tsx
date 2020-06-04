import React, { useState } from "react"
import { Page } from "../components/page-container"
import { useHistory } from "react-router-dom"
import { PATH_NAMES } from "../App"
import { Box } from "rebass"
import { theme } from "../theme"
import { Button } from "../components/button"
import { CritterList } from "../components/critter-list"
import { formattedBugData, getIsAvailableNow } from "../utils/format-critters"
import { LOCATION_TO_ICON, BUG_LOCATIONS } from "../utils/location"
import { Input } from "../components/search-input"
import { Toggle } from "../components/toggle"
import Fuse from "fuse.js"

export const BugsPage: React.SFC<{}> = () => {
  const [onlyAvailable, setOnlyAvailable] = useState(true)
  const [locationFilter, setLocationFilter] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBugs = formattedBugData.filter(
    ({ availableHours, availableMonths, location }) => {
      return (
        !(
          onlyAvailable && !getIsAvailableNow(availableMonths, availableHours)
        ) && !(locationFilter && locationFilter !== location)
      )
    }
  )

  const searchedBugs = searchTerm
    ? new Fuse(filteredBugs, { keys: ["name"], threshold: 0.5 })
        .search(searchTerm)
        .map(({ item }) => item)
    : filteredBugs

  const history = useHistory()
  return (
    <Page headerOnClick={() => history.push(PATH_NAMES.fish)} headerText="BUGS">
      <Box
        sx={{
          display: "flex",
          marginBottom: theme.verticalSpacing,
          flexWrap: "wrap",
          justifyContent: "center",
          width: "60%",
          paddingBottom: "6px",
        }}
      >
        {BUG_LOCATIONS.map((location) => (
          <Button
            key={location}
            sx={{ marginTop: "3px" }}
            buttonType="circle"
            onClick={() => setLocationFilter(location)}
            isActive={locationFilter === location}
          >
            {LOCATION_TO_ICON[location]}
          </Button>
        ))}
      </Box>
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
      <CritterList list={searchedBugs} />
    </Page>
  )
}
