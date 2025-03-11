"use client"

import { FileUploaderRegular } from "@uploadcare/react-uploader/next"
import "@uploadcare/react-uploader/core.css"
import React from "react"

type UploadImageProps = {
    contentId: string
    onContentChange: (
        contentID: string,
        newContent: string | string[] | string[][]
    ) => void
}

const UploadImage = ({ contentId, onContentChange }: UploadImageProps) => {
    const handelChangeEvent = (event: {
        status: "success"
        internalId: string
        name: string
        size: number
        isImage: boolean
        mimeType: string
        metadata: any
        file: File | Blob | null
        externalUrl: string | null
        uploadProgress: number
        fullPath: string | null
        source: any
    }) => {
        const cdnUrl = event.externalUrl || event.fullPath

        if (cdnUrl) {
            onContentChange(contentId, cdnUrl)
        }
    }

    return (
        <div>
            <FileUploaderRegular
                sourceList="local, camera, facebook, gdrive"
                cameraModes="photo, video"
                pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!}
                multiple={false}
                onFileUploadSuccess={handelChangeEvent}
                maxLocalFileSizeBytes={10485760}
            />
        </div>
    )
}

export default UploadImage
