import React from "react"
import { Box } from "rebass"
import { Slider } from "@material-ui/core"

export const SizeSlider: React.SFC<{
  onChange: (size: number) => void
  disabled: boolean
}> = ({ onChange, disabled }) => (
  <Box
    className="slider"
    sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      opacity: disabled ? 0.4 : 1,
    }}
  >
    <Box sx={{ color: "black", marginX: 15, fontSize: "10px" }}>
      <i className="fas fa-fish"></i>
    </Box>
    <Slider
      disabled={disabled}
      marks
      min={1}
      max={6}
      step={1}
      onChangeCommitted={(_, value) => onChange(value as number)}
    />
    <Box sx={{ color: "black", marginX: 15, fontSize: "22px" }}>
      <i className="fas fa-fish"></i>
    </Box>
  </Box>
)
