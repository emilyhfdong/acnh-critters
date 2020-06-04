import React from "react"
import { Box, Text } from "rebass"
import { theme } from "../../theme"

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
      <i className="fas fa-chevron-left" />
      <Text
        as="h1"
        sx={{
          letterSpacing: 2,
          "&:hover": { cursor: "pointer" },
          marginX: "10px",
        }}
        onClick={headerOnClick}
      >
        {headerText}
      </Text>
      <i className="fas fa-chevron-right" />
    </Box>
    {children}
  </Box>
)
