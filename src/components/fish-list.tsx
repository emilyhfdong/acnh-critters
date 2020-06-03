import React from "react"
import { Box, Image } from "rebass"
import { IFish, locationToIcon } from "../utils/format-fish"

export const FishList: React.SFC<{ list: IFish[] }> = ({ list }) => (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
    {list.map((fish) => (
      <Fish key={fish.id} {...fish} />
    ))}
  </Box>
)

export const Fish: React.SFC<IFish> = ({
  icon,
  isAvailable,
  price,
  locations,
  shadowSize,
}) => (
  <Box
    sx={{
      width: 80,
      height: 80,
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      backgroundColor: "rgb(255, 255, 255)",
      borderRadius: "8px",
      margin: "6px",
      border: "1px solid rgba(214, 157, 123, 50)",
      boxShadow: "2px 2px 1px rgba(214, 157, 123, 0.25)",
    }}
  >
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
      {locations.map((location) => locationToIcon[location])}
    </IconContainer>
  </Box>
)

const ICON_PADDING = "5px"

const positionToStyle = {
  topLeft: {
    top: ICON_PADDING,
    left: ICON_PADDING,
  },
  topRight: {
    top: ICON_PADDING,
    right: ICON_PADDING,
  },
  bottomLeft: {
    bottom: ICON_PADDING,
    left: ICON_PADDING,
  },
  bottomRight: {
    bottom: ICON_PADDING,
    right: ICON_PADDING,
  },
}

export const IconContainer: React.SFC<{
  position: keyof typeof positionToStyle
  fontSize?: string
}> = ({ position, children, fontSize = "8px" }) => (
  <Box
    sx={{
      position: "absolute",
      ...positionToStyle[position],
      color: "brown",
      fontSize,
      letterSpacing: 1,
    }}
  >
    {children}
  </Box>
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
