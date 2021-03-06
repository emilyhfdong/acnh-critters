import React from "react"
import { Box, Text } from "rebass"
import { theme } from "../theme"

export const NORMAL_CARD_SIZE = 80
export const CARD_MARGIN = 6
const SIZE_RATIO = 2

const EXPANDED_SIZE =
  NORMAL_CARD_SIZE * SIZE_RATIO + CARD_MARGIN * ((SIZE_RATIO - 1) * 2)

export const Card: React.SFC<{
  onClick?: () => void
  isExpanded?: boolean
  expandDirection?: "left" | "right"
  title?: string
  paragraph?: string
}> = ({
  children,
  onClick,
  isExpanded,
  expandDirection = "right",
  title,
  paragraph,
}) => (
  <Box
    sx={{
      width: NORMAL_CARD_SIZE,
      height: NORMAL_CARD_SIZE,
      position: "relative",
      borderRadius: "8px",
      margin: `${CARD_MARGIN}px`,
    }}
  >
    <Box
      onClick={onClick}
      sx={{
        zIndex: isExpanded ? 1 : 0,
        position: "absolute",
        width: isExpanded ? EXPANDED_SIZE : NORMAL_CARD_SIZE,
        height: isExpanded ? EXPANDED_SIZE : NORMAL_CARD_SIZE,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        backgroundColor: isExpanded ? theme.colors.brown : "rgb(255, 255, 255)",
        borderRadius: "8px",
        border: "1px solid rgba(214, 157, 123, 50)",
        boxShadow: "2px 2px 1px rgba(214, 157, 123, 0.25)",
        top: 0,
        ...(expandDirection === "right" ? { left: 0 } : { right: 0 }),
        ...(onClick ? { "&:hover": { cursor: "pointer" } } : {}),
        transition:
          "width 0.2s, height 0.2s, z-index 0.2s, background-color 0.2s",
      }}
    >
      <Text
        sx={{
          color: "white",
          opacity: isExpanded ? 1 : 0,
          fontSize: isExpanded ? "14px" : "0px",
          transition: "font-size 0.2s, opacity 0.2s",
          fontWeight: 600,
          paddingX: 2,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      {children}
    </Box>
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
  color?: string
  letterSpacing?: number
}> = ({
  position,
  children,
  fontSize = "8px",
  color = "brown",
  letterSpacing = 1,
}) => (
  <Box
    sx={{
      position: "absolute",
      ...positionToStyle[position],
      color,
      fontSize,
      letterSpacing,
      fontWeight: 900,
      maxWidth: EXPANDED_SIZE / 1.5,
    }}
  >
    {children}
  </Box>
)
