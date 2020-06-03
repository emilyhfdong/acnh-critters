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
    <Text
      as="h1"
      sx={{
        color: theme.colors.brown,
        marginBottom: "5px",
        letterSpacing: 2,
        "&:hover": { cursor: "pointer" },
      }}
      onClick={headerOnClick}
    >
      {headerText}
    </Text>
    {children}
  </Box>
)
