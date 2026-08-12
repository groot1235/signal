"use client"

import { useRef, useState } from "react"
import { FileText, Upload, XIcon } from "lucide-react"

import {
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentTitle,
} from "@/components/ui/attachment"

export function AttachmentPDF() {
    const [file, setFile] = useState<File | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFile = (selectedFile: File | null) => {
        if (!selectedFile) return

        if (selectedFile.type !== "application/pdf") {
            alert("Please upload a PDF file.")
            return
        }

        setFile(selectedFile)
    }

    const removeFile = () => {
        setFile(null)

        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    const formatSize = (bytes: number) => {
        if (bytes < 1024 * 1024) {
            return `${Math.round(bytes / 1024)} KB`
        }

        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    const handlePost = () => {
        if (!file) return

        console.log("Posting:", file)


    }

    return (
        <div className="mx-auto w-full max-w-sm py-12">


            {!file && (
                <>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => {
                            handleFile(e.target.files?.[0] || null)
                            e.target.value = ""
                        }}
                    />

                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 px-4 py-8 text-sm text-zinc-400 transition hover:border-blue-500 hover:text-white"
                    >
                        <Upload className="h-5 w-5" />
                        Upload PDF
                    </button>
                </>
            )}


            {file && (
                <>
                    <AttachmentGroup className="w-full">
                        <Attachment>
                            <AttachmentMedia>
                                <FileText className="h-5 w-5" />
                            </AttachmentMedia>

                            <AttachmentContent>
                                <AttachmentTitle>
                                    {file.name}
                                </AttachmentTitle>

                                <AttachmentDescription>
                                    PDF · {formatSize(file.size)}
                                </AttachmentDescription>
                            </AttachmentContent>

                            <AttachmentActions>
                                <AttachmentAction
                                    type="button"
                                    aria-label="Remove PDF"
                                    onClick={removeFile}
                                >
                                    <XIcon />
                                </AttachmentAction>
                            </AttachmentActions>
                        </Attachment>
                    </AttachmentGroup>

                    <button
                        type="button"
                        onClick={handlePost}
                        className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition hover:bg-blue-600"
                    >
                        Post
                    </button>
                </>
            )}
        </div>
    )
}