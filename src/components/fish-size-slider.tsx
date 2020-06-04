import React from "react"
import { Box } from "rebass"
import { Slider } from "@material-ui/core"

export const SizeSlider: React.SFC<{
  onChange: (sizes: number[]) => void
}> = ({ onChange }) => (
  <Box
    className="slider"
    sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Box sx={{ color: "black", marginX: 15, fontSize: "10px" }}>
      <i className="fas fa-fish"></i>
    </Box>
    <Slider
      marks
      min={1}
      max={6}
      step={1}
      defaultValue={[1, 6]}
      onChangeCommitted={(_, value) => onChange(value as number[])}
    />
    <Box sx={{ color: "black", marginX: 15, fontSize: "22px" }}>
      <i className="fas fa-fish"></i>
    </Box>
  </Box>
)
