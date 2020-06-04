import { ReactElement, useState, useRef } from "react"
import { useDimensions } from "../../utils/hooks"
import React from "react"
import { NORMAL_CARD_SIZE, CARD_MARGIN } from "./card"
import { Box } from "rebass"

interface IExpandableListProps<T> {
  list: T[]
  renderItem: (props: {
    item: T
    numberOfCardsPerRow: number
    onClick: () => void
    isExpanded: boolean
    idx: number
  }) => ReactElement
}

type TExpandableList = <D>(
  props: IExpandableListProps<D>
) => React.ReactElement<IExpandableListProps<D>>

export const ExpandableList: TExpandableList = ({ list, renderItem }) => {
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
      {list.map((item, idx) =>
        renderItem({
          item,
          numberOfCardsPerRow,
          // @ts-ignore
          onClick: () => setActiveId(item.id === activeId ? "" : item.id),
          // @ts-ignore
          isExpanded: item.id === activeId,
          idx,
        })
      )}
    </Box>
  )
}
