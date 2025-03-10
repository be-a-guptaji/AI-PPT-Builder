import { cn } from "@/lib/utils"
import { useSlideStore } from "@/store/useSlideStore"
import React from "react"

type ListProps = {
  items: string[]
  className?: string
  onChange: (items: string[]) => void
  isEditable?: boolean
}

type ListItemProps = {
  item: string
  index: number
  fontColor: string
  isEditable: boolean
  onChange: (index: number, value: string) => void
  onKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  fontColor,
  index,
  isEditable,
  onChange,
  onKeyDown,
}) => (
  <input
    type="text"
    value={item}
    onChange={(e) => onChange(index, e.target.value)}
    onKeyDown={(e) => onKeyDown(e, index)}
    style={{ color: fontColor }}
    className="bg-transparent outline-none w-full py-1"
    readOnly={!isEditable}
  />
)

const NumberedList: React.FC<ListProps> = ({
  items,
  className,
  isEditable = true,
  onChange,
}) => {
  const { currentTheme } = useSlideStore()

  const handleChange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items]
      newItems[index] = value
      onChange(newItems)
    }
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      event.preventDefault()
      const newItems = [...items]
      newItems.splice(index + 1, 0, "")
      onChange(newItems)
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLInputElement

        if (nextInput) {
          nextInput.focus()
        }
      }, 0)
    } else if (
      event.key === "Backspace" &&
      items[index] === "" &&
      items.length > 1
    ) {
      event.preventDefault()
      const newItems = [...items]
      newItems.splice(index, 1)
      onChange(newItems)
    }
  }

  return (
    <ol
      className={cn("list-decimal list-inside space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li key={index}>
          <ListItem
            item={item}
            index={index}
            fontColor={currentTheme.fontColor}
            isEditable={isEditable}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </li>
      ))}
    </ol>
  )
}

export const BulletList: React.FC<ListProps> = ({
  className,
  items,
  isEditable = true,
  onChange,
}) => {
  const { currentTheme } = useSlideStore()

  const handleChange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items]
      newItems[index] = value
      onChange(newItems)
    }
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      event.preventDefault()
      const newItems = [...items]
      newItems.splice(index + 1, 0, "")
      onChange(newItems)
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLInputElement

        if (nextInput) {
          nextInput.focus()
        }
      }, 0)
    } else if (
      event.key === "Backspace" &&
      items[index] === "" &&
      items.length > 1
    ) {
      event.preventDefault()
      const newItems = [...items]
      newItems.splice(index, 1)
      onChange(newItems)
    }
  }

  return (
    <ul
      className={cn("list-disc pl-5 space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li key={index} className="pl-1 marker:text-current">
          <ListItem
            item={item}
            index={index}
            fontColor={currentTheme.fontColor}
            isEditable={isEditable}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </li>
      ))}
    </ul>
  )
}

export default NumberedList
