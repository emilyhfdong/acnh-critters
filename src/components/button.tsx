import React from "react"
import { Box, SxStyleProp, Text } from "rebass"
import { theme } from "../theme"

export const Button: React.SFC<{
  onClick: () => void
  isActive: boolean
  sx?: SxStyleProp
  label?: string
  size?: number
}> = ({
  onClick,
  isActive,
  sx,
  children,
  label,
  size = theme.buttonHeight,
}) => {
  const buttonSize = size === undefined ? theme.buttonHeight : size
  return (
    <Box
      sx={{
        marginX: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        onClick={onClick}
        sx={{
          backgroundColor: isActive ? "black" : "white",
          color: isActive ? "white" : "black",
          border: "1px solid black",
          borderColor: "black",
          borderRadius: buttonSize / 2,
          "&:hover": {
            cursor: "pointer",
          },
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          width: buttonSize,
          height: buttonSize,
          padding: 0,
          fontSize: `${buttonSize / 2.5}px`,
          ...sx,
        }}
      >
        {children}
      </Box>
      <Text
        sx={{
          fontSize: "8px",
          color: "black",
          opacity: 0.4,
          paddingTop: "1px",
        }}
      >
        {label}
      </Text>
    </Box>
  )
}
