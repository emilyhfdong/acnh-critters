import React from "react"
import { Image } from "rebass"
import { IFish, FISH_LOCATION_TO_ICON } from "../../utils/format-fish"
import { IconContainer, Card } from "../shared/card"
import { formatMoney } from "accounting"
import { ExpandableList } from "../shared/expandable-list"
import { getPriceRange } from "../../utils/formatting"

export const FishList: React.SFC<{ list: IFish[] }> = ({ list }) => (
  <ExpandableList
    list={list}
    renderItem={({
      item: {
        availabilityDetail,
        icon,
        name,
        rarity,
        price,
        isAvailable,
        shadowSize,
        locationDetail,
        locations,
      },
      isExpanded,
      onClick,
      idx,
      numberOfCardsPerRow,
    }) => {
      const expandDirection =
        idx % numberOfCardsPerRow >= numberOfCardsPerRow / 2 ? "left" : "right"
      const iconColor = isExpanded ? "white" : "brown"

      return (
        <Card
          expandDirection={expandDirection}
          isExpanded={isExpanded}
          onClick={onClick}
          title={name}
          paragraph={`${availabilityDetail}\n${rarity}`}
          key={idx}
        >
          <Image src={icon} sx={{ width: 50, height: 50 }} />
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
            {isAvailable && <i className="fas fa-check"></i>}
          </IconContainer>
          <IconContainer
            color={iconColor}
            fontSize="4px"
            position="bottomRight"
          >
            {Array(shadowSize)
              .fill(0)
              .map((_, idx) => (
                <i key={idx} className="fas fa-circle"></i>
              ))}
          </IconContainer>
          <IconContainer color={iconColor} position="bottomLeft">
            {isExpanded
              ? locationDetail.toUpperCase()
              : locations.map((location) => FISH_LOCATION_TO_ICON[location])}
          </IconContainer>
        </Card>
      )
    }}
  />
)
