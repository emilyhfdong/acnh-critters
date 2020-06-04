import React from "react"
import { Box, Text } from "rebass"
import { theme } from "../theme"

export const Page: React.SFC<{
  headerText: string
  headerOnClick: () => void
}> = ({ children, headerOnClick, headerText }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: theme.colors.white,
      minHeight: "100vh",
      paddingY: theme.verticalSpacing,
      maxWidth: "700px",
      margin: "auto",
    }}
  >
    <Box
      sx={{
        display: "flex",
        marginBottom: "5px",
        color: theme.colors.brown,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ArrowButtons type="left" onClick={headerOnClick} />
      <Text
        as="h1"
        sx={{
          letterSpacing: 2,
          marginX: "10px",
        }}
      >
        {headerText}
      </Text>
      <ArrowButtons type="right" onClick={headerOnClick} />
    </Box>
    {children}
  </Box>
)

export const ArrowButtons: React.SFC<{
  type: "left" | "right"
  onClick: () => void
}> = ({ onClick, type }) => (
  <Box
    onClick={onClick}
    sx={{
      "&:hover": {
        cursor: "pointer",
        opacity: 0.5,
        "&:active": { opacity: 0.3 },
      },
    }}
  >
    <i className={`fas fa-chevron-${type}`} />
  </Box>
)
