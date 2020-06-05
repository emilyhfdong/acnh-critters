import React, { useState } from "react"

import { SizeSlider } from "../components/fish-size-slider"
import { formattedFishData } from "../utils/format-critters"
import { FISH_LOCATIONS } from "../utils/location"

import { SearchPage } from "../components/search-page"

export const FishPage: React.SFC<{}> = () => {
  const [sizeRange, setSizeRange] = useState([1, 6])
  const filteredFish = formattedFishData.filter(({ shadowSize = 6 }) => {
    const [minSize, maxSize] = sizeRange
    return shadowSize >= minSize && shadowSize <= maxSize
  })

  return (
    <SearchPage
      sliderElement={<SizeSlider onChange={setSizeRange} />}
      headerText="FISH"
      nextPage="bugs"
      critterList={filteredFish}
      locations={FISH_LOCATIONS}
    />
  )
}
