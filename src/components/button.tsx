import React from "react"
import { Box, SxStyleProp } from "rebass"

export const Button: React.SFC<{
  onClick: () => void
  isActive: boolean
  sx?: SxStyleProp
}> = ({ onClick, isActive, sx, children }) => (
  <Box
    onClick={onClick}
    sx={{
      marginX: "8px",
      backgroundColor: isActive ? "black" : "white",
      color: isActive ? "white" : "black",
      border: "1px solid black",
      borderColor: "black",
      height: 30,
      paddingX: 20,
      paddingY: 0,
      borderRadius: 20,
      "&:hover": {
        cursor: "pointer",
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...sx,
    }}
  >
    {children}
  </Box>
)
