import React from "react"

type LayoutProps = {
    children: React.ReactNode
}

const PresentationLayout = ({ children }: LayoutProps) => {
    return <div className="size-full overflow-x-hidden">{children}</div>
}

export default PresentationLayout
