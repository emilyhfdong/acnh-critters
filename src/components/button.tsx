import React from "react"
import { Box, SxStyleProp } from "rebass"

export type TButtonType = "pill" | "circle"

const buttonStyles = {
  pill: {
    height: 30,
    paddingX: 20,
    paddingY: 0,
  },
  circle: {
    width: 40,
    height: 40,
    padding: 0,
  },
}

export const Button: React.SFC<{
  onClick: () => void
  isActive: boolean
  sx?: SxStyleProp
  buttonType?: TButtonType
}> = ({ onClick, isActive, sx, children, buttonType = "pill" }) => (
  <Box
    onClick={onClick}
    sx={{
      marginX: "8px",
      backgroundColor: isActive ? "black" : "white",
      color: isActive ? "white" : "black",
      border: "1px solid black",
      borderColor: "black",
      borderRadius: 20,
      "&:hover": {
        cursor: "pointer",
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...buttonStyles[buttonType],
      ...sx,
    }}
  >
    {children}
  </Box>
)
