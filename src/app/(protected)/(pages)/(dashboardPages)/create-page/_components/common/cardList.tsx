"use client"

import { OutlineCard } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"
import React, { useRef, useState } from "react"
import Card from "./card"
import AddCardButton from "./addCardButton"
import { toast } from "sonner"

type CardListProps = {
  outlines: OutlineCard[] | []
  editingCard: string | null
  selectedCard: string | null
  onCardSelect: (cardId: string) => void
  onCardDoubleClick: (cardId: string) => void
  setEditingCard: (cardId: string | null) => void
  setSelectedCard: (cardId: string | null) => void
  addMultipleOutlines: (outlines: OutlineCard[] | []) => void
}

const CardList = ({
  outlines,
  editingCard,
  selectedCard,
  addMultipleOutlines,
  onCardDoubleClick,
  onCardSelect,
  setEditingCard,
  setSelectedCard,
}: CardListProps) => {
  const [draggedItem, setDraggedItem] = useState<OutlineCard | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [editText, setEditText] = useState<string | null>(null)
  const dataOffsetY = useRef<number>(0)

  const onDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()

    if (!draggedItem) {
      return
    }

    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    const threshold = rect.height / 2

    if (y < threshold) {
      setDragOverIndex(index)
    } else {
      setDragOverIndex(index + 1)
    }
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (!draggedItem || dragOverIndex === null) {
      return
    }

    const updatedCards = [...outlines]
    const draggedIndex = updatedCards.indexOf(draggedItem)

    if (draggedIndex === -1 || dragOverIndex === draggedIndex) {
      return
    }

    const removedCard = updatedCards.splice(draggedIndex, 1)

    updatedCards.splice(
      dragOverIndex > draggedIndex ? dragOverIndex - 1 : dragOverIndex,
      0,
      ...removedCard
    )

    addMultipleOutlines(
      updatedCards.map((card, index) => ({ ...card, order: index + 1 }))
    )

    setDraggedItem(null)
    setDragOverIndex(null)
  }

  const onCardUpdate = (cardId: string, newTitle: string | null) => {
    if (!newTitle) return

    addMultipleOutlines(
      outlines.map((card) =>
        card.id === cardId ? { ...card, title: newTitle } : card
      )
    )
    setEditingCard(null)
    setSelectedCard(null)
    setEditText(null)
  }

  const onCardDelete = (cardId: string) => {
    addMultipleOutlines(
      outlines
        .filter((card) => card.id !== cardId)
        .map((card, index) => ({ ...card, order: index + 1 }))
    )
  }

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    card: OutlineCard
  ) => {
    setDraggedItem(card)
    e.dataTransfer.effectAllowed = "move"

    const rect = e.currentTarget.getBoundingClientRect()
    dataOffsetY.current = e.clientY - rect.top

    const draggedElement = e.currentTarget.cloneNode(true) as HTMLElement

    draggedElement.style.position = "absolute"
    draggedElement.style.top = "-1000px"
    draggedElement.style.opacity = "0.8"
    draggedElement.style.width = `${e.currentTarget.offsetWidth}px`
    document.body.appendChild(draggedElement)

    e.dataTransfer.setDragImage(draggedElement, 0, dataOffsetY.current)

    setTimeout(() => {
      setDragOverIndex(outlines.findIndex((c) => c.id === card.id))
      document.body.removeChild(draggedElement)
    }, 0)
  }

  const onDragEnd = () => {
    setDraggedItem(null)
    setDragOverIndex(null)
  }

  const getDragOverStyles = (cardIndex: number) => {
    if (dragOverIndex === null || draggedItem === null) {
      return {}
    }

    if (dragOverIndex === cardIndex) {
      return {
        borderTop: "2px solid #000",
        marginTop: "0.5rem",
        transition: "margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }
    } else if (dragOverIndex === cardIndex + 1) {
      return {
        borderBottom: "2px solid #000",
        marginBottom: "0.5rem",
        transition: "margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }
    }

    return {}
  }

  const onAddCard = (cardIndex?: number) => {
    if (outlines.length === 15) {
      toast.error("You can't add more than 15 cards.", {
        description:
          "Please delete some cards to add more or generate project.",
      })
      return
    }

    const newCard: OutlineCard = {
      id: Math.random().toString().substr(2, 9),
      order: cardIndex === undefined ? outlines.length + 1 : cardIndex + 2,
      title: editText || "New Section",
    }

    const updatedCards =
      cardIndex === undefined
        ? [...outlines, newCard]
        : [
            ...outlines.slice(0, cardIndex + 1),
            newCard,
            ...outlines.slice(cardIndex + 1).map((card) => ({
              ...card,
              order: card.order + 1,
            })),
          ]

    addMultipleOutlines(updatedCards)
    setEditText("")
  }

  return (
    <motion.div
      className="space-y-2 -my-2"
      layout
      onDragOver={(e) => {
        e.preventDefault()
        if (
          outlines.length === 0 ||
          e.clientY > e.currentTarget.getBoundingClientRect().bottom - 20
        ) {
          onDragOver(e, outlines.length)
        }
      }}
      onDrop={(e) => {
        e.preventDefault()
        onDrop(e)
      }}
    >
      <AnimatePresence>
        {outlines.map((card, index) => {
          return (
            <React.Fragment key={card.id}>
              <Card
                key={card.id}
                onDragOver={(e) => onDragOver(e, index)}
                card={card}
                isEditing={editingCard === card.id}
                isSelected={selectedCard === card.id}
                editText={editText}
                onEditChange={setEditText}
                onEditBlur={() => onCardUpdate(card.id, editText)}
                onEditKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onCardUpdate(card.id, editText)
                  }
                }}
                onCardClick={() => onCardSelect(card.id)}
                onCardDoubleClick={() => onCardDoubleClick(card.id)}
                onDeleteClick={() => {
                  onCardDelete(card.id)
                }}
                dragHandlers={{
                  onDragStart: (e) => {
                    onDragStart(e, card)
                  },
                  onDragEnd: onDragEnd,
                }}
                dragOverStyle={getDragOverStyles(index)}
              />
              <AddCardButton onAddCard={() => onAddCard(index)} />
            </React.Fragment>
          )
        })}
      </AnimatePresence>
    </motion.div>
  )
}

export default CardList
