import React from "react"
import { TLocation, locationToIcon } from "../utils/format-fish"
import { Button } from "./button"

export const LocationFilterButton: React.SFC<{
  isActive: boolean
  onClick: () => void
  locationName: TLocation
}> = ({ isActive, onClick, locationName }) => {
  return (
    <Button
      isActive={isActive}
      onClick={onClick}
      sx={{
        width: 40,
        height: 40,
        borderRadius: 20,
        padding: 0,
      }}
    >
      {locationToIcon[locationName]}
    </Button>
  )
}
