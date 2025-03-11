"use client"

import { OutlineCard } from "@/lib/types"
import React, { useRef } from "react"
import { motion } from "framer-motion"
import { Card as UICard } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

type CardProps = {
    card: OutlineCard
    isEditing: boolean
    isSelected: boolean
    editText: string | null
    dragOverStyle: React.CSSProperties
    dragHandlers: {
        onDragStart: (event: React.DragEvent<HTMLDivElement>) => void
        onDragEnd: () => void
    }
    onEditChange: (value: string) => void
    onEditBlur: () => void
    onEditKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    onCardClick: () => void
    onCardDoubleClick: () => void
    onDeleteClick: () => void
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void
}

const Card = ({
    card,
    dragHandlers,
    dragOverStyle,
    editText,
    isEditing,
    isSelected,
    onCardClick,
    onCardDoubleClick,
    onDeleteClick,
    onDragOver,
    onEditBlur,
    onEditChange,
    onEditKeyDown,
}: CardProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 1,
            }}
            className="relative"
        >
            <div
                draggable
                style={dragOverStyle}
                onDragOver={onDragOver}
                {...dragHandlers}
            >
                <UICard
                    className={`p-4 cursor-grab active:cursor-grabbing bg-primary/10 ${isEditing || isSelected ? "border-primary bg-transparent" : ""}`}
                    onClick={onCardClick}
                    onDoubleClick={onCardDoubleClick}
                >
                    <div className="flex justify-between items-center">
                        {isEditing ? (
                            <Input
                                ref={inputRef}
                                value={editText || ""}
                                onChange={(e) => onEditChange(e.target.value)}
                                onBlur={onEditBlur}
                                onKeyDown={onEditKeyDown}
                                className="text-base sm:text-lg"
                            />
                        ) : (
                            <div className="flex items-center gap-2">
                                <span
                                    className={`text-base sm:text-lg py-1 px-4 rounded-xl bg-primary/20 ${isEditing || isSelected ? "bg-secondary/20 dark:text-black" : ""}`}
                                >
                                    {card.order}
                                </span>
                                <span className="text-base sm:text-lg">
                                    {card.title}
                                </span>
                            </div>
                        )}
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            aria-label={`Delete card ${card.title}`}
                            onClick={(e) => {
                                e.stopPropagation()
                                onDeleteClick()
                            }}
                            className="border border-black/20 dark:border-white/20 cursor-pointer"
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </div>
                </UICard>
            </div>
        </motion.div>
    )
}

export default Card
