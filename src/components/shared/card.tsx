import React from "react"
import { Box } from "rebass"

interface IProps {}

export const Card: React.SFC<{}> = ({ children }) => (
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
    {children}
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
