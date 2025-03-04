"use client"

import { getProjectById } from "@/actions/projects"
import { themes } from "@/lib/constant"
import { useSlideStore } from "@/store/useSlideStore"
import { Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { redirect, useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Navbar from "./_components/navbar/navbar"
import LayoutPreview from "./_components/editor-sidebar/left-sidebar/layoutPreview"
import Editor from "./_components/editor/editor"

const Page = () => {
  const params = useParams()
  const [isLoading, setLoading] = useState(true)
  const { setTheme } = useTheme()
  const { curretntTheme, setCurrentTheme, setProject, setSlides } =
    useSlideStore()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await getProjectById(params.presentationID as string)

        if (response.status !== 200 || !response.data) {
          toast.error("Oops!", {
            description: "Unable to fetch project.",
          })

          redirect("/dashboard")
        }

        const findTheme = themes.find(
          (theme) => theme.name === response?.data?.themeName
        )

        setCurrentTheme(findTheme || themes[0])
        setTheme(findTheme?.type === "dark" ? "dark" : "light")
        setProject(response.data)
        setSlides(JSON.parse(JSON.stringify(response.data.slides)))
      } catch (error) {
        console.error("Error fetching project:", error)
        toast.error("Error!", {
          description: "An unexpected error occurred.",
        })
      } finally {
        setLoading(false)
      }
    })()
  }, [params.presentationID, setCurrentTheme, setTheme, setProject, setSlides])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col">
        <Navbar presentationID={params.presentationID as string} />
        <div
          className="flex-1 flex overflow-hidden pt-16"
          style={{
            backgroundColor: curretntTheme.backgroundColor,
            color: curretntTheme.accentColor,
            fontFamily: curretntTheme.fontFamily,
          }}
        >
          <LayoutPreview />
          <div className="flex-1 ml-64 pr-16">
            <Editor />
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default Page
