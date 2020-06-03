import React from "react"
import { Box, Image } from "rebass"
import { IFish, FISH_LOCATION_TO_ICON } from "../../utils/format-fish"
import { IconContainer, Card } from "../shared/card"

export const FishList: React.SFC<{ list: IFish[] }> = ({ list }) => (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
    {list.map((fish) => (
      <FishCard key={fish.id} {...fish} />
    ))}
  </Box>
)

export const FishCard: React.SFC<IFish> = ({
  icon,
  isAvailable,
  price,
  locations,
  shadowSize,
}) => (
  <Card>
    <Image src={icon} sx={{ width: 50, height: 50 }} />
    <IconContainer position="topLeft">
      {Array(getPriceRange(price))
        .fill(0)
        .map(() => (
          <i className="fas fa-dollar-sign"></i>
        ))}
    </IconContainer>
    <IconContainer position="topRight">
      {isAvailable && <i className="fas fa-check"></i>}
    </IconContainer>
    <IconContainer fontSize="4px" position="bottomRight">
      {Array(shadowSize)
        .fill(0)
        .map(() => (
          <i className="fas fa-circle"></i>
        ))}
    </IconContainer>
    <IconContainer position="bottomLeft">
      {locations.map((location) => FISH_LOCATION_TO_ICON[location])}
    </IconContainer>
  </Card>
)

const getPriceRange = (price: number) => {
  if (price >= 10000) {
    return 4
  } else if (price >= 5000) {
    return 3
  } else if (price >= 1000) {
    return 2
  }
  return 1
}
