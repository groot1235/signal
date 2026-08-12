import { NextResponse } from "next/server"
import { ApifyClient } from "apify-client"

const apify = new ApifyClient({
    token: process.env.APIFY_API_TOKEN,
})

function isValidLinkedInUrl(value: string) {
    try {
        const url = new URL(value.trim())

        const isLinkedInDomain =
            url.hostname === "linkedin.com" ||
            url.hostname === "www.linkedin.com"

        const isProfile =
            url.pathname.startsWith("/in/") &&
            url.pathname.split("/").filter(Boolean).length >= 2

        return isLinkedInDomain && isProfile
    } catch {
        return false
    }
}

export async function POST(req: Request) {
    try {


        const body = await req.json()

        const { linkedinUrl } = body

        console.log(
            "Received LinkedIn URL:",
            linkedinUrl
        )



        if (
            !linkedinUrl ||
            !isValidLinkedInUrl(linkedinUrl)
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error:
                        "Please provide a valid LinkedIn profile URL.",
                },
                {
                    status: 400,
                }
            )
        }



        if (!process.env.APIFY_API_TOKEN) {
            console.error(
                "APIFY_API_TOKEN is missing"
            )

            return NextResponse.json(
                {
                    success: false,
                    error:
                        "Apify configuration is missing.",
                },
                {
                    status: 500,
                }
            )
        }



        const input = {
            profileScraperMode:
                "Profile details no email ($4 per 1k)",

            queries: [linkedinUrl],
        }

        console.log(
            "Apify input:",
            input
        )



        console.log(
            "Starting Apify LinkedIn scraper..."
        )

        const run = await apify
            .actor(
                "harvestapi/linkedin-profile-scraper"
            )
            .call(input)

        console.log(
            "Apify run completed:",
            run.id
        )



        const { items } = await apify
            .dataset(run.defaultDatasetId)
            .listItems()

        console.log(
            "LinkedIn profile data:",
            items
        )



        if (
            !items ||
            items.length === 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error:
                        "No profile information was found.",
                },
                {
                    status: 404,
                }
            )
        }



        const profile = items[0] as any



        const resumeInput = {
            name:
                `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim(),

            headline:
                profile.headline ?? "",

            location:
                profile.location?.linkedinText ?? "",

            linkedinUrl:
                profile.linkedinUrl ?? "",

            about:
                profile.about ?? "",

            experience:
                profile.experience ?? [],

            education:
                profile.education ?? [],

            certifications:
                profile.certifications ?? [],

            projects:
                profile.projects ?? [],

            skills:
                profile.skills ?? [],
        }

        console.log(
            "Clean resume input:",
            resumeInput
        )



        return NextResponse.json({
            success: true,
            data: resumeInput,
        })

    } catch (error) {
        console.error(
            "Apify LinkedIn scraper error:",
            error
        )

        return NextResponse.json(
            {
                success: false,
                error:
                    "Unable to retrieve this LinkedIn profile.",
            },
            {
                status: 500,
            }
        )
    }
}