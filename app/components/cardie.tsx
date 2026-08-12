"use client"

import React, { useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AttachmentPDF } from "./attachmentpdf"

type Props = {}

const CardComponent = (props: Props) => {
    const [linkedinUrl, setLinkedinUrl] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const isValidLinkedInUrl = (value: string) => {
        try {
            const url = new URL(value.trim())

            const isLinkedInDomain =
                url.hostname === "linkedin.com" ||
                url.hostname === "www.linkedin.com"

            const isProfile =
                url.pathname.startsWith("/in/") &&
                url.pathname
                    .split("/")
                    .filter(Boolean)
                    .length >= 2

            return isLinkedInDomain && isProfile
        } catch {
            return false
        }
    }

    const handleBuildResume = async () => {
        setError("")

        if (loading) return

        if (!linkedinUrl.trim()) {
            setError(
                "Please enter your LinkedIn profile URL."
            )
            return
        }

        if (!isValidLinkedInUrl(linkedinUrl)) {
            setError(
                "Please enter a valid LinkedIn profile URL."
            )
            return
        }

        try {
            setLoading(true)

            const response = await fetch(
                "/api/resume",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        linkedinUrl:
                            linkedinUrl.trim(),
                    }),
                }
            )

            const data =
                await response.json()

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Failed to fetch LinkedIn profile."
                )
            }

            console.log(
                "LinkedIn data:",
                data.data
            )


            const generateResponse =
                await fetch(
                    "/api/generate",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            resumeInput:
                                data.data,
                        }),
                    }
                )

            const generatedData =
                await generateResponse.json()

            if (!generateResponse.ok) {
                throw new Error(
                    generatedData.error ||
                    "Failed to generate resume."
                )
            }

            console.log(
                "Generated resume:",
                generatedData.data
            )

            sessionStorage.setItem(
                "generatedResume",
                JSON.stringify(
                    generatedData.data
                )
            )

            console.log(
                "Resume saved to sessionStorage"
            )

            window.location.href =
                "/resume/preview"

        } catch (error) {
            console.error(
                "Build resume error:",
                error
            )

            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while building your resume."
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="mt-16 flex flex-col items-center justify-center gap-4">
                <Card className="w-[800px]">
                    <CardHeader>
                        <CardTitle>
                            Build Your Resume
                        </CardTitle>

                        <CardDescription>
                            Paste your LinkedIn URL.
                            Signal handles the rest.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="m-5">
                            <div className="flex gap-3">
                                <Input
                                    type="url"
                                    placeholder="Paste your LinkedIn URL"
                                    value={linkedinUrl}
                                    disabled={loading}
                                    onChange={(e) => {
                                        setLinkedinUrl(
                                            e.target.value
                                        )
                                        setError("")
                                    }}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key ===
                                            "Enter"
                                        ) {
                                            handleBuildResume()
                                        }
                                    }}
                                />

                                <Button
                                    onClick={
                                        handleBuildResume
                                    }
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Building..."
                                        : "Build Resume"}
                                </Button>
                            </div>

                            {error && (
                                <p className="mt-2 text-sm text-red-400">
                                    {error}
                                </p>
                            )}
                        </div>

                        <Separator className="mb-5" />

                        <AttachmentPDF />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default CardComponent