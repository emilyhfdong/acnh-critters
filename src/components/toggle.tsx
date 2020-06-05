import React from "react"
import { Box, Text } from "rebass"
import { theme } from "../theme"

const TOGGLE_PADDING = 7
const TOGGLE_SIZE = theme.buttonHeight - TOGGLE_PADDING * 2

export const Toggle: React.SFC<{
  isOn: boolean
  onChange: () => void
}> = ({ isOn, onChange }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      fontSize: 10,
      alignItems: "center",
      marginX: 10,
      cursor: "pointer",
    }}
    onClick={onChange}
  >
    <Box
      sx={{
        backgroundColor: "rgba(214, 157, 123, 0.15)",
        height: theme.buttonHeight,
        width: TOGGLE_SIZE * 2 + TOGGLE_PADDING * 3,
        borderRadius: theme.buttonHeight / 2,
        display: "flex",
        alignItems: "center",
        position: "relative",
        paddingX: "7px",
        marginX: "5px",
        justifyContent: "space-between",
        textAlign: "center",
        color: "black",
      }}
    >
      <Text
        sx={{
          width: "50%",
          opacity: isOn ? 0 : 1,
          transition: "0.25s opacity",
        }}
      >
        ALL DAY
      </Text>
      <Text
        sx={{
          width: "50%",
          opacity: isOn ? 1 : 0,
          transition: "0.25s opacity",
        }}
      >
        NOW
      </Text>
      <Box
        sx={{
          left: isOn ? `${TOGGLE_PADDING}px` : TOGGLE_PADDING * 2 + TOGGLE_SIZE,
          position: "absolute",
          backgroundColor: "brown",
          height: TOGGLE_SIZE,
          width: TOGGLE_SIZE,
          borderRadius: TOGGLE_SIZE / 2,
          transition: "0.25s left",
        }}
      />
    </Box>
  </Box>
)
