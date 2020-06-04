import React, { useState } from "react"
import { Page } from "../components/shared/page-container"
import { useHistory } from "react-router-dom"
import { PATH_NAMES } from "../App"
import { BugsList } from "../components/bugs/bugs-list"
import { formattedBugsData, BUG_LOCATION_TO_ICON } from "../utils/format-bugs"
import {
  TBugFilterName,
  BUGS_FILTERS,
  LOCATION_BUGS_FILTER_NAMES,
} from "../utils/bug-filters"
import { Box } from "rebass"
import { theme } from "../theme"
import { Button } from "../components/shared/button"

export const BugsPage: React.SFC<{}> = () => {
  const [filters, setFilters] = useState<TBugFilterName[]>([])

  const filteredBugs = filters.reduce(
    (allFish, filterName) => allFish.filter(BUGS_FILTERS[filterName].filter),
    formattedBugsData
  )
  const selectFilter = (selectedFilterName: TBugFilterName) =>
    filters.includes(selectedFilterName)
      ? setFilters(filters.filter((name) => name !== selectedFilterName))
      : setFilters([
          ...filters.filter(
            (filterName) =>
              BUGS_FILTERS[filterName].type !==
              BUGS_FILTERS[selectedFilterName].type
          ),
          selectedFilterName,
        ])
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
        {LOCATION_BUGS_FILTER_NAMES.map((location) => (
          <Button
            key={location}
            sx={{ marginTop: "3px" }}
            buttonType="circle"
            onClick={() => selectFilter(location)}
            isActive={filters.includes(location)}
          >
            {BUG_LOCATION_TO_ICON[location]}
          </Button>
        ))}
      </Box>
      <Box sx={{ display: "flex", marginBottom: theme.verticalSpacing }}>
        <Button
          isActive={filters.includes("available")}
          onClick={() => selectFilter("available")}
        >
          available now
        </Button>
      </Box>
      <BugsList list={filteredBugs} />
    </Page>
  )
}
