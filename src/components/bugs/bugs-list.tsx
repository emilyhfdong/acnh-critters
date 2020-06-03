import React from "react"
import { Box, Image } from "rebass"
import { IconContainer, Card } from "../shared/card"
import { IBug, BUG_LOCATION_TO_ICON } from "../../utils/format-bugs"

export const BugsList: React.SFC<{ list: IBug[] }> = ({ list }) => (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
    {list.map((bug) => (
      <BugCard key={bug.id} {...bug} />
    ))}
  </Box>
)

export const BugCard: React.SFC<IBug> = ({
  icon,
  isAvailable,
  price,
  location,
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
    <IconContainer position="bottomLeft">
      {BUG_LOCATION_TO_ICON[location]}
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
