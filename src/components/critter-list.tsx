import { useState, useRef } from "react"
import { useDimensions } from "../utils/hooks"
import React from "react"
import { NORMAL_CARD_SIZE, CARD_MARGIN, Card, IconContainer } from "./card"
import { Box, Image } from "rebass"
import { formatMoney } from "accounting"
import { ICritter, getIsAvailableNow } from "../utils/format-critters"
import { LOCATION_TO_ICON } from "../utils/location"

export const CritterList: React.SFC<{ list: Array<ICritter> }> = ({ list }) => {
  const [activeId, setActiveId] = useState("")
  const componentRef = useRef()
  const { width } = useDimensions(componentRef)

  const numberOfCardsPerRow = Math.floor(
    width / (NORMAL_CARD_SIZE + CARD_MARGIN * 2)
  )

  return (
    <Box
      ref={componentRef}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {list.map((critter, idx) => (
        <CritterCard
          expandDirection={
            idx % numberOfCardsPerRow >= numberOfCardsPerRow / 2
              ? "left"
              : "right"
          }
          critter={critter}
          key={idx}
          isExpanded={critter.id === activeId}
          onClick={() => setActiveId(critter.id === activeId ? "" : critter.id)}
        />
      ))}
    </Box>
  )
}

export const CritterCard: React.SFC<{
  critter: ICritter
  onClick: () => void
  isExpanded: boolean
  expandDirection: "left" | "right"
}> = ({
  critter: {
    name,
    availabilityDetail,
    icon,
    rarity,
    availableHours,
    availableMonths,
    price,
    locationDetail,
    location,
    shadowSize,
  },
  isExpanded,
  onClick,
  expandDirection,
}) => {
  const iconColor = isExpanded ? "white" : "brown"

  return (
    <Card
      expandDirection={expandDirection}
      isExpanded={isExpanded}
      onClick={onClick}
      title={name}
      paragraph={`${availabilityDetail}\n${rarity}`}
    >
      <Image
        src={process.env.PUBLIC_URL + icon}
        sx={{
          width: 50,
          height: 50,
        }}
      />
      <IconContainer color={iconColor} position="topLeft">
        {isExpanded
          ? formatMoney(price, undefined, 0)
          : Array(getPriceRange(price))
              .fill(0)
              .map((_, idx) => (
                <i key={idx} className="fas fa-dollar-sign"></i>
              ))}
      </IconContainer>
      <IconContainer color={iconColor} position="topRight">
        {getIsAvailableNow(availableMonths, availableMonths) && (
          <i className="fas fa-check"></i>
        )}
      </IconContainer>
      <IconContainer color={iconColor} position="bottomLeft">
        {isExpanded ? locationDetail.toUpperCase() : LOCATION_TO_ICON[location]}
      </IconContainer>
      <IconContainer color={iconColor} fontSize="4px" position="bottomRight">
        {shadowSize &&
          Array(shadowSize)
            .fill(0)
            .map((_, idx) => <i key={idx} className="fas fa-circle"></i>)}
      </IconContainer>
    </Card>
  )
}

const getPriceRange = (price: number) => {
  if (price >= 10000) {
    return 4
  } else if (price >= 5000) {
    return 3
  } else if (price >= 1000) {
    return 2
  }
  return 1
}
