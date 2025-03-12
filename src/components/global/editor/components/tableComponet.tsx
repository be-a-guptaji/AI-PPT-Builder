"use client"

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useSlideStore } from "@/store/useSlideStore"
import React, { useEffect, useState } from "react"

interface TableComponetProps {
    content: string[][]
    isPreview?: boolean
    isEditable?: boolean
    initialRowSize?: number
    initialColumnSize?: number
    onChange: (content: string[][]) => void
}

const TableComponet = ({
    content,
    isPreview,
    isEditable,
    initialRowSize,
    initialColumnSize,
    onChange,
}: TableComponetProps) => {
    const [colSizes, setColSizes] = useState<number[]>([])
    const [rowSizes, setRowSizes] = useState<number[]>([])
    const [tableData, setTableData] = useState<string[][]>(() => {
        if (content.length === 0 || content[0].length === 0) {
            return Array(initialRowSize).fill(Array(initialColumnSize).fill(""))
        }

        if (!Array.isArray(content) || !Array.isArray(content[0])) {
            return Array(initialRowSize).fill(Array(initialColumnSize).fill(""))
        }

        return content
    })
    const { currentTheme } = useSlideStore()

    const handelResizeColumn = (index: number, newSize: number) => {
        if (isEditable) {
            const newSizes = [...colSizes]
            newSizes[index] = newSize
            setColSizes(newSizes)
        }
    }

    const updateCell = (rowIndex: number, colIndex: number, value: string) => {
        if (isEditable) {
            const newData = tableData.map((row, rIndex) => {
                if (rIndex === rowIndex) {
                    return row.map((cell, cIndex) => {
                        return cIndex === colIndex ? value : cell
                    })
                }
                return row
            })

            setTableData(newData)
            onChange(newData)
        }
    }

    useEffect(() => {
        setRowSizes(new Array(tableData.length).fill(100 / tableData.length))
        setColSizes(
            new Array(tableData[0].length).fill(100 / tableData[0].length)
        )
    }, [tableData])

    if (isPreview) {
        return (
            <div className="w-full overflow-x-auto text-sm">
                <table className="w-full">
                    <thead>
                        <tr>
                            {tableData[0].map((cell, index) => (
                                <th
                                    key={index}
                                    className="p-2 border"
                                    style={{ width: `${colSizes[index]}%` }}
                                >
                                    {cell || "Type here"}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.slice(1).map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                style={{ height: `${rowSizes[rowIndex + 1]}%` }}
                            >
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="p-2 border">
                                        {cell || "Type here"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div
            className="realative size-full"
            style={{
                background:
                    currentTheme.gradientBackground ||
                    currentTheme.backgroundColor,
                borderRadius: "8px",
            }}
        >
            <ResizablePanelGroup
                direction="vertical"
                className={`size-full rounded-lg border 
          ${
              initialColumnSize === 2
                  ? "min-h-[100px]"
                  : initialColumnSize === 3
                    ? "min-h-[150px]"
                    : initialColumnSize === 4
                      ? "min-h-[200px]"
                      : "min-h-[100px]"
          }`}
                onLayout={(sizes) => {
                    setRowSizes(sizes)
                }}
            >
                {tableData.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        {rowIndex > 0 && <ResizableHandle />}
                        <ResizablePanelGroup
                            direction="horizontal"
                            onLayout={(sizes) => {
                                setColSizes(sizes)
                            }}
                            className="size-full"
                        >
                            {row.map((cell, colIndex) => (
                                <React.Fragment key={colIndex}>
                                    {colIndex > 0 && <ResizableHandle />}
                                    <ResizablePanel
                                        defaultSize={colSizes[colIndex]}
                                        onResize={(sizes) => {
                                            handelResizeColumn(colIndex, sizes)
                                        }}
                                        className="size-full min-h-9"
                                    >
                                        <div className="size-full relative min-h-3">
                                            <input
                                                value={cell}
                                                onChange={(e) => {
                                                    updateCell(
                                                        rowIndex,
                                                        colIndex,
                                                        e.target.value
                                                    )
                                                }}
                                                className="size-full p-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                                                style={{
                                                    color: currentTheme.fontColor,
                                                }}
                                                readOnly={!isEditable}
                                            />
                                        </div>
                                    </ResizablePanel>
                                </React.Fragment>
                            ))}
                        </ResizablePanelGroup>
                    </React.Fragment>
                ))}
            </ResizablePanelGroup>
        </div>
    )
}

export default TableComponet
