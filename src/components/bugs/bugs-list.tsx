import React from "react"
import { Image } from "rebass"
import { IconContainer, Card } from "../shared/card"
import { IBug, BUG_LOCATION_TO_ICON } from "../../utils/format-bugs"
import { ExpandableList } from "../shared/expandable-list"
import { getPriceRange } from "../../utils/formatting"

export const BugsList: React.SFC<{ list: IBug[] }> = ({ list }) => (
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
        locationDetail,
        location,
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
          key={idx}
          expandDirection={expandDirection}
          isExpanded={isExpanded}
          onClick={onClick}
          title={name}
          paragraph={`${availabilityDetail}\n${rarity}`}
        >
          <Image src={icon} sx={{ width: 50, height: 50 }} />
          <IconContainer color={iconColor} position="topLeft">
            {Array(getPriceRange(price))
              .fill(0)
              .map((_, idx) => (
                <i key={idx} className="fas fa-dollar-sign"></i>
              ))}
          </IconContainer>
          <IconContainer color={iconColor} position="topRight">
            {isAvailable && <i className="fas fa-check"></i>}
          </IconContainer>
          <IconContainer color={iconColor} position="bottomLeft">
            {isExpanded
              ? locationDetail.toUpperCase()
              : BUG_LOCATION_TO_ICON[location]}
          </IconContainer>
        </Card>
      )
    }}
  />
)
