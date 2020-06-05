import React from "react"
import { Box } from "rebass"

import { theme } from "../theme"
import { Input as RInput } from "@rebass/forms"

const ICON_FONT_SIZE = 16
const ICON_PADDING = 10

export const Input: React.SFC<{
  onChange: (text: string) => void
  value: string
}> = ({ onChange, value }) => {
  return (
    <Box
      sx={{
        height: theme.buttonHeight,
        borderRadius: 20,
        width: "70%",
        backgroundColor: "rgba(214, 157, 123, 0.15)",
        position: "relative",
        fontSize: ICON_FONT_SIZE,
        color: "black",
      }}
    >
      <i
        style={{
          position: "absolute",
          top: theme.buttonHeight / 2 - ICON_FONT_SIZE / 2,
          left: ICON_PADDING,
        }}
        className="fas fa-search"
      ></i>

      <Box></Box>
      <i
        onClick={() => onChange("")}
        className="fas fa-times-circle"
        style={{
          position: "absolute",
          top: theme.buttonHeight / 2 - ICON_FONT_SIZE / 2,
          right: ICON_PADDING,
          opacity: value ? 1 : 0,
          transition: "opacity 0.1s",
          cursor: "pointer",
        }}
      ></i>
      <RInput
        value={value}
        onChange={(event) => onChange(event.target.value)}
        sx={{
          borderRadius: 20,
          height: 40,
          borderWidth: 0,
          paddingX: ICON_PADDING * 3,
          outline: "none",
          caretColor: theme.colors.black,
          "&:focus": {
            border: "1.5px solid rgba(214, 157, 123, 0.3)",
          },
        }}
      ></RInput>
    </Box>
  )
}
