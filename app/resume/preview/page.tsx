"use client"

import { useEffect, useState } from "react"
import {
    Download,
    Loader2,
} from "lucide-react"
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    pdf,
} from "@react-pdf/renderer"
import { Button } from "@/components/ui/button"

type Experience = {
    company: string
    role: string
    location: string
    startDate: string
    endDate: string
    bullets: string[]
}

type Education = {
    institution: string
    degree: string
    fieldOfStudy: string
    startDate: string
    endDate: string
}

type Project = {
    name: string
    description: string
    technologies: string[]
}

type Certification = {
    name: string
    issuer: string
    date: string
}

type GeneratedResume = {
    personal: {
        name: string
        headline: string
        location: string
        linkedin: string
        email: string
        phone: string
    }

    summary: string

    experience: Experience[]

    education: Education[]

    projects: Project[]

    certifications: Certification[]

    skills: string[]
}




const pdfStyles = StyleSheet.create({

    page: {
        paddingTop: 48,
        paddingBottom: 48,
        paddingLeft: 54,
        paddingRight: 54,

        fontFamily: "Helvetica",

        fontSize: 9.5,

        color: "#111827",

        lineHeight: 1.45,
    },

    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#D1D5DB",
        paddingBottom: 14,
        marginBottom: 18,
    },

    name: {
        fontSize: 24,
        fontFamily: "Helvetica-Bold",
        color: "#111827",
    },

    headline: {
        marginTop: 5,
        fontSize: 10,
        color: "#374151",
    },

    contact: {
        marginTop: 7,
        fontSize: 8.5,
        color: "#4B5563",
    },

    section: {
        marginTop: 16,
    },

    sectionTitle: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",

        color: "#111827",

        textTransform: "uppercase",

        letterSpacing: 1,

        borderBottomWidth: 1,
        borderBottomColor: "#D1D5DB",

        paddingBottom: 4,

        marginBottom: 8,
    },

    summary: {
        fontSize: 9.5,
        color: "#374151",
        lineHeight: 1.5,
    },

    experienceItem: {
        marginBottom: 12,
    },

    experienceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",

        marginBottom: 2,
    },

    role: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        color: "#111827",
    },

    company: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        color: "#374151",
    },

    date: {
        fontSize: 8.5,
        color: "#6B7280",

        textAlign: "right",
    },

    location: {
        fontSize: 8.5,
        color: "#6B7280",

        textAlign: "right",

        marginTop: 2,
    },

    bulletContainer: {
        marginTop: 4,
        paddingLeft: 10,
    },

    bullet: {
        flexDirection: "row",

        marginBottom: 3,

        fontSize: 9,
        color: "#374151",
    },

    bulletPoint: {
        width: 10,
        fontSize: 9,
        color: "#374151",
    },

    bulletText: {
        flex: 1,
    },

    educationItem: {
        flexDirection: "row",
        justifyContent: "space-between",

        marginBottom: 8,
    },

    institution: {
        fontSize: 9.5,
        fontFamily: "Helvetica-Bold",
        color: "#111827",
    },

    degree: {
        marginTop: 2,
        fontSize: 9,
        color: "#374151",
    },

    projectItem: {
        marginBottom: 9,
    },

    projectName: {
        fontSize: 9.5,
        fontFamily: "Helvetica-Bold",
        color: "#111827",
    },

    projectDescription: {
        marginTop: 2,
        fontSize: 9,
        color: "#374151",
    },

    technologies: {
        marginTop: 2,
        fontSize: 8,
        color: "#6B7280",
    },

    certificationItem: {
        flexDirection: "row",
        justifyContent: "space-between",

        marginBottom: 5,
    },

    certificationName: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        color: "#111827",
    },

    certificationIssuer: {
        fontSize: 9,
        color: "#4B5563",
    },

    certificationDate: {
        fontSize: 8.5,
        color: "#6B7280",
    },

    skills: {
        fontSize: 9,
        color: "#374151",
        lineHeight: 1.5,
    },
})



function ResumePDF({
    resume,
}: {
    resume: GeneratedResume
}) {
    return (
        <Document>

            <Page
                size="A4"
                style={pdfStyles.page}
            >


                <View style={pdfStyles.header}>

                    <Text style={pdfStyles.name}>
                        {resume.personal.name}
                    </Text>

                    {resume.personal.headline && (
                        <Text
                            style={
                                pdfStyles.headline
                            }
                        >
                            {
                                resume.personal
                                    .headline
                            }
                        </Text>
                    )}

                    <Text
                        style={
                            pdfStyles.contact
                        }
                    >
                        {[
                            resume.personal
                                .location,

                            resume.personal
                                .email,

                            resume.personal
                                .phone,

                            resume.personal
                                .linkedin
                                ? "LinkedIn"
                                : "",
                        ]
                            .filter(Boolean)
                            .join("  •  ")}
                    </Text>

                </View>



                {resume.summary && (
                    <View style={pdfStyles.section}>

                        <Text
                            style={
                                pdfStyles.sectionTitle
                            }
                        >
                            Summary
                        </Text>

                        <Text
                            style={
                                pdfStyles.summary
                            }
                        >
                            {resume.summary}
                        </Text>

                    </View>
                )}



                {resume.experience.length >
                    0 && (

                        <View style={pdfStyles.section}>

                            <Text
                                style={
                                    pdfStyles.sectionTitle
                                }
                            >
                                Experience
                            </Text>


                            {resume.experience.map(
                                (
                                    experience,
                                    index
                                ) => (

                                    <View
                                        key={`${experience.company}-${index}`}
                                        style={
                                            pdfStyles.experienceItem
                                        }
                                        wrap={false}
                                    >

                                        <View
                                            style={
                                                pdfStyles.experienceHeader
                                            }
                                        >

                                            <View>

                                                <Text
                                                    style={
                                                        pdfStyles.role
                                                    }
                                                >
                                                    {
                                                        experience.role
                                                    }
                                                </Text>

                                                <Text
                                                    style={
                                                        pdfStyles.company
                                                    }
                                                >
                                                    {
                                                        experience.company
                                                    }
                                                </Text>

                                            </View>


                                            <View>

                                                <Text
                                                    style={
                                                        pdfStyles.date
                                                    }
                                                >
                                                    {
                                                        experience.startDate
                                                    }{" "}
                                                    –{" "}
                                                    {
                                                        experience.endDate
                                                    }
                                                </Text>

                                                {experience.location && (
                                                    <Text
                                                        style={
                                                            pdfStyles.location
                                                        }
                                                    >
                                                        {
                                                            experience.location
                                                        }
                                                    </Text>
                                                )}

                                            </View>

                                        </View>


                                        {experience.bullets.length >
                                            0 && (

                                                <View
                                                    style={
                                                        pdfStyles.bulletContainer
                                                    }
                                                >

                                                    {experience.bullets.map(
                                                        (
                                                            bullet,
                                                            bulletIndex
                                                        ) => (

                                                            <View
                                                                key={
                                                                    bulletIndex
                                                                }
                                                                style={
                                                                    pdfStyles.bullet
                                                                }
                                                            >

                                                                <Text
                                                                    style={
                                                                        pdfStyles.bulletPoint
                                                                    }
                                                                >
                                                                    •
                                                                </Text>

                                                                <Text
                                                                    style={
                                                                        pdfStyles.bulletText
                                                                    }
                                                                >
                                                                    {
                                                                        bullet
                                                                    }
                                                                </Text>

                                                            </View>

                                                        )
                                                    )}

                                                </View>

                                            )}

                                    </View>

                                )
                            )}

                        </View>

                    )}



                {resume.education.length >
                    0 && (

                        <View style={pdfStyles.section}>

                            <Text
                                style={
                                    pdfStyles.sectionTitle
                                }
                            >
                                Education
                            </Text>


                            {resume.education.map(
                                (
                                    education,
                                    index
                                ) => (

                                    <View
                                        key={`${education.institution}-${index}`}
                                        style={
                                            pdfStyles.educationItem
                                        }
                                        wrap={false}
                                    >

                                        <View>

                                            <Text
                                                style={
                                                    pdfStyles.institution
                                                }
                                            >
                                                {
                                                    education.institution
                                                }
                                            </Text>

                                            <Text
                                                style={
                                                    pdfStyles.degree
                                                }
                                            >
                                                {
                                                    education.degree
                                                }

                                                {education.fieldOfStudy &&
                                                    ` — ${education.fieldOfStudy}`}
                                            </Text>

                                        </View>


                                        <Text
                                            style={
                                                pdfStyles.date
                                            }
                                        >
                                            {
                                                education.startDate
                                            }{" "}
                                            –{" "}
                                            {
                                                education.endDate
                                            }
                                        </Text>

                                    </View>

                                )
                            )}

                        </View>

                    )}



                {resume.projects.length >
                    0 && (

                        <View style={pdfStyles.section}>

                            <Text
                                style={
                                    pdfStyles.sectionTitle
                                }
                            >
                                Projects
                            </Text>


                            {resume.projects.map(
                                (
                                    project,
                                    index
                                ) => (

                                    <View
                                        key={`${project.name}-${index}`}
                                        style={
                                            pdfStyles.projectItem
                                        }
                                        wrap={false}
                                    >

                                        <Text
                                            style={
                                                pdfStyles.projectName
                                            }
                                        >
                                            {
                                                project.name
                                            }
                                        </Text>

                                        <Text
                                            style={
                                                pdfStyles.projectDescription
                                            }
                                        >
                                            {
                                                project.description
                                            }
                                        </Text>

                                        {project
                                            .technologies
                                            .length >
                                            0 && (

                                                <Text
                                                    style={
                                                        pdfStyles.technologies
                                                    }
                                                >
                                                    Technologies:{" "}
                                                    {project.technologies.join(
                                                        " • "
                                                    )}
                                                </Text>

                                            )}

                                    </View>

                                )
                            )}

                        </View>

                    )}



                {resume.certifications.length >
                    0 && (

                        <View style={pdfStyles.section}>

                            <Text
                                style={
                                    pdfStyles.sectionTitle
                                }
                            >
                                Certifications
                            </Text>


                            {resume.certifications.map(
                                (
                                    certification,
                                    index
                                ) => (

                                    <View
                                        key={`${certification.name}-${index}`}
                                        style={
                                            pdfStyles.certificationItem
                                        }
                                        wrap={false}
                                    >

                                        <View>

                                            <Text
                                                style={
                                                    pdfStyles.certificationName
                                                }
                                            >
                                                {
                                                    certification.name
                                                }
                                            </Text>

                                            {certification.issuer && (
                                                <Text
                                                    style={
                                                        pdfStyles.certificationIssuer
                                                    }
                                                >
                                                    {
                                                        certification.issuer
                                                    }
                                                </Text>
                                            )}

                                        </View>


                                        {certification.date && (
                                            <Text
                                                style={
                                                    pdfStyles.certificationDate
                                                }
                                            >
                                                {
                                                    certification.date
                                                }
                                            </Text>
                                        )}

                                    </View>

                                )
                            )}

                        </View>

                    )}



                {resume.skills.length >
                    0 && (

                        <View style={pdfStyles.section}>

                            <Text
                                style={
                                    pdfStyles.sectionTitle
                                }
                            >
                                Skills
                            </Text>

                            <Text
                                style={
                                    pdfStyles.skills
                                }
                            >
                                {resume.skills.join(
                                    " • "
                                )}
                            </Text>

                        </View>

                    )}

            </Page>

        </Document>
    )
}



export default function ResumePreviewPage() {

    const [resume, setResume] =
        useState<GeneratedResume | null>(
            null
        )

    const [downloading, setDownloading] =
        useState(false)


    useEffect(() => {

        const storedResume =
            sessionStorage.getItem(
                "generatedResume"
            )

        if (!storedResume) {
            return
        }

        try {

            const parsedResume =
                JSON.parse(
                    storedResume
                )

            setResume(parsedResume)

        } catch (error) {

            console.error(
                "Failed to parse resume:",
                error
            )

        }

    }, [])



    const handleDownloadPDF =
        async () => {

            if (!resume) {
                return
            }

            try {

                setDownloading(true)

                const blob =
                    await pdf(
                        <ResumePDF
                            resume={resume}
                        />
                    ).toBlob()

                const url =
                    URL.createObjectURL(
                        blob
                    )

                const link =
                    document.createElement(
                        "a"
                    )

                link.href = url

                const safeName =
                    resume.personal.name
                        ?.replace(
                            /[^a-zA-Z0-9]/g,
                            "_"
                        ) ||
                    "Signal_Resume"

                link.download =
                    `${safeName}_Resume.pdf`

                document.body.appendChild(
                    link
                )

                link.click()

                link.remove()

                URL.revokeObjectURL(
                    url
                )

            } catch (error) {

                console.error(
                    "PDF generation failed:",
                    error
                )

            } finally {

                setDownloading(false)

            }

        }



    if (!resume) {

        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-950">

                <p className="text-gray-300">
                    Resume not found.
                </p>

            </main>
        )
    }




    return (

        <main className="min-h-screen bg-gray-950 py-10">


            <div className="mx-auto mb-6 flex w-full max-w-[794px] items-center justify-between">

                <div>

                    <h1 className="text-lg font-semibold text-white">
                        Resume Preview
                    </h1>

                    <p className="text-sm text-gray-400">
                        Your resume is ready.
                    </p>

                </div>


                <Button
                    onClick={
                        handleDownloadPDF
                    }
                    disabled={
                        downloading
                    }
                    className="gap-2"
                >

                    {downloading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />

                            Generating PDF...
                        </>
                    ) : (
                        <>
                            <Download className="h-4 w-4" />

                            Download PDF
                        </>
                    )}

                </Button>

            </div>

            <div className="mx-auto w-full max-w-[794px]">

                <div
                    className="
                        min-h-[1123px]
                        w-[794px]
                        bg-white
                        px-16
                        py-14
                        text-gray-900
                        shadow-2xl
                    "
                >

                    {/* HEADER */}

                    <header className="border-b border-gray-300 pb-5">

                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            {
                                resume.personal
                                    .name
                            }
                        </h1>

                        {resume.personal
                            .headline && (

                                <p className="mt-2 text-base text-gray-700">
                                    {
                                        resume
                                            .personal
                                            .headline
                                    }
                                </p>

                            )}

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">

                            {resume.personal
                                .location && (
                                    <span>
                                        {
                                            resume
                                                .personal
                                                .location
                                        }
                                    </span>
                                )}

                            {resume.personal
                                .email && (
                                    <span>
                                        {
                                            resume
                                                .personal
                                                .email
                                        }
                                    </span>
                                )}

                            {resume.personal
                                .phone && (
                                    <span>
                                        {
                                            resume
                                                .personal
                                                .phone
                                        }
                                    </span>
                                )}

                            {resume.personal
                                .linkedin && (
                                    <span>
                                        LinkedIn
                                    </span>
                                )}

                        </div>

                    </header>


                    {/* SUMMARY */}

                    {resume.summary && (
                        <section className="mt-7">

                            <SectionTitle>
                                Summary
                            </SectionTitle>

                            <p className="mt-3 text-sm leading-6 text-gray-700">
                                {
                                    resume.summary
                                }
                            </p>

                        </section>
                    )}


                    {/* EXPERIENCE */}

                    {resume.experience
                        .length >
                        0 && (

                            <section className="mt-7">

                                <SectionTitle>
                                    Experience
                                </SectionTitle>

                                <div className="mt-4 space-y-6">

                                    {resume.experience.map(
                                        (
                                            experience,
                                            index
                                        ) => (

                                            <div
                                                key={`${experience.company}-${index}`}
                                            >

                                                <div className="flex items-start justify-between gap-4">

                                                    <div>

                                                        <h3 className="font-semibold text-gray-900">
                                                            {
                                                                experience.role
                                                            }
                                                        </h3>

                                                        <p className="text-sm font-medium text-gray-700">
                                                            {
                                                                experience.company
                                                            }
                                                        </p>

                                                    </div>

                                                    <div className="shrink-0 text-right text-sm text-gray-500">

                                                        <p>
                                                            {
                                                                experience.startDate
                                                            }{" "}
                                                            –{" "}
                                                            {
                                                                experience.endDate
                                                            }
                                                        </p>

                                                        {experience.location && (
                                                            <p>
                                                                {
                                                                    experience.location
                                                                }
                                                            </p>
                                                        )}

                                                    </div>

                                                </div>


                                                {experience.bullets.length >
                                                    0 && (

                                                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-700">

                                                            {experience.bullets.map(
                                                                (
                                                                    bullet,
                                                                    bulletIndex
                                                                ) => (

                                                                    <li
                                                                        key={
                                                                            bulletIndex
                                                                        }
                                                                    >
                                                                        {
                                                                            bullet
                                                                        }
                                                                    </li>

                                                                )
                                                            )}

                                                        </ul>

                                                    )}

                                            </div>

                                        )
                                    )}

                                </div>

                            </section>

                        )}


                    {/* EDUCATION */}

                    {resume.education
                        .length >
                        0 && (

                            <section className="mt-7">

                                <SectionTitle>
                                    Education
                                </SectionTitle>

                                <div className="mt-4 space-y-4">

                                    {resume.education.map(
                                        (
                                            education,
                                            index
                                        ) => (

                                            <div
                                                key={`${education.institution}-${index}`}
                                                className="flex items-start justify-between gap-4"
                                            >

                                                <div>

                                                    <h3 className="font-semibold text-gray-900">
                                                        {
                                                            education.institution
                                                        }
                                                    </h3>

                                                    <p className="text-sm text-gray-700">

                                                        {
                                                            education.degree
                                                        }

                                                        {
                                                            education.fieldOfStudy &&
                                                            ` — ${education.fieldOfStudy}`
                                                        }

                                                    </p>

                                                </div>

                                                <p className="shrink-0 text-right text-sm text-gray-500">

                                                    {
                                                        education.startDate
                                                    }{" "}
                                                    –{" "}
                                                    {
                                                        education.endDate
                                                    }

                                                </p>

                                            </div>

                                        )
                                    )}

                                </div>

                            </section>

                        )}


                    {/* PROJECTS */}

                    {resume.projects
                        .length >
                        0 && (

                            <section className="mt-7">

                                <SectionTitle>
                                    Projects
                                </SectionTitle>

                                <div className="mt-4 space-y-4">

                                    {resume.projects.map(
                                        (
                                            project,
                                            index
                                        ) => (

                                            <div
                                                key={`${project.name}-${index}`}
                                            >

                                                <h3 className="font-semibold text-gray-900">
                                                    {
                                                        project.name
                                                    }
                                                </h3>

                                                <p className="mt-1 text-sm leading-6 text-gray-700">
                                                    {
                                                        project.description
                                                    }
                                                </p>

                                                {
                                                    project
                                                        .technologies
                                                        .length >
                                                    0 && (

                                                        <p className="mt-1 text-xs font-medium text-gray-500">

                                                            Technologies:{" "}

                                                            {
                                                                project
                                                                    .technologies
                                                                    .join(
                                                                        " • "
                                                                    )
                                                            }

                                                        </p>

                                                    )
                                                }

                                            </div>

                                        )
                                    )}

                                </div>

                            </section>

                        )}


                    {/* CERTIFICATIONS */}

                    {resume
                        .certifications
                        .length >
                        0 && (

                            <section className="mt-7">

                                <SectionTitle>
                                    Certifications
                                </SectionTitle>

                                <div className="mt-4 space-y-2">

                                    {resume.certifications.map(
                                        (
                                            certification,
                                            index
                                        ) => (

                                            <div
                                                key={`${certification.name}-${index}`}
                                                className="flex items-center justify-between gap-4 text-sm"
                                            >

                                                <div>

                                                    <span className="font-medium text-gray-900">
                                                        {
                                                            certification.name
                                                        }
                                                    </span>

                                                    {certification.issuer && (
                                                        <span className="text-gray-600">
                                                            {" "}
                                                            —{" "}
                                                            {
                                                                certification.issuer
                                                            }
                                                        </span>
                                                    )}

                                                </div>

                                                {certification.date && (
                                                    <span className="shrink-0 text-gray-500">
                                                        {
                                                            certification.date
                                                        }
                                                    </span>
                                                )}

                                            </div>

                                        )
                                    )}

                                </div>

                            </section>

                        )}


                    {/* SKILLS */}

                    {resume.skills
                        .length >
                        0 && (

                            <section className="mt-7">

                                <SectionTitle>
                                    Skills
                                </SectionTitle>

                                <p className="mt-3 text-sm leading-6 text-gray-700">
                                    {
                                        resume.skills.join(
                                            " • "
                                        )
                                    }
                                </p>

                            </section>

                        )}

                </div>

            </div>

        </main>
    )
}

function SectionTitle({
    children,
}: {
    children: React.ReactNode
}) {

    return (

        <h2 className="border-b border-gray-300 pb-2 text-sm font-bold uppercase tracking-widest text-gray-900">
            {children}
        </h2>

    )
}