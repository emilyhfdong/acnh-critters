import React from "react"
import { formattedBugData } from "../utils/format-critters"
import { BUG_LOCATIONS } from "../utils/location"
import { SearchPage } from "../components/search-page"
import { theme } from "../theme"

export const BugsPage: React.SFC<{}> = () => (
  <SearchPage
    critterList={formattedBugData}
    headerText={"BUGS"}
    nextPage="fish"
    locations={BUG_LOCATIONS}
    locationContainerStyles={{ marginBottom: theme.verticalSpacing }}
  />
)
