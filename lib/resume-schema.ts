export type GeneratedResume = {
    personal: {
        name: string
        headline: string
        location: string
        linkedin: string
        email: string
        phone: string
    }

    summary: string

    experience: {
        company: string
        role: string
        location: string
        startDate: string
        endDate: string
        bullets: string[]
    }[]

    education: {
        institution: string
        degree: string
        fieldOfStudy: string
        startDate: string
        endDate: string
    }[]

    projects: {
        name: string
        description: string
        technologies: string[]
    }[]

    certifications: {
        name: string
        issuer: string
        date: string
    }[]

    skills: string[]
}