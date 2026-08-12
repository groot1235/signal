import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
})

const resumeSchema = {
    type: "object",
    additionalProperties: false,

    properties: {
        personal: {
            type: "object",
            additionalProperties: false,

            properties: {
                name: {
                    type: "string",
                },

                headline: {
                    type: "string",
                },

                location: {
                    type: "string",
                },

                linkedin: {
                    type: "string",
                },

                email: {
                    type: "string",
                },

                phone: {
                    type: "string",
                },
            },

            required: [
                "name",
                "headline",
                "location",
                "linkedin",
                "email",
                "phone",
            ],
        },

        summary: {
            type: "string",
        },

        experience: {
            type: "array",

            items: {
                type: "object",
                additionalProperties: false,

                properties: {
                    company: {
                        type: "string",
                    },

                    role: {
                        type: "string",
                    },

                    location: {
                        type: "string",
                    },

                    startDate: {
                        type: "string",
                    },

                    endDate: {
                        type: "string",
                    },

                    bullets: {
                        type: "array",

                        items: {
                            type: "string",
                        },
                    },
                },

                required: [
                    "company",
                    "role",
                    "location",
                    "startDate",
                    "endDate",
                    "bullets",
                ],
            },
        },

        education: {
            type: "array",

            items: {
                type: "object",
                additionalProperties: false,

                properties: {
                    institution: {
                        type: "string",
                    },

                    degree: {
                        type: "string",
                    },

                    fieldOfStudy: {
                        type: "string",
                    },

                    startDate: {
                        type: "string",
                    },

                    endDate: {
                        type: "string",
                    },
                },

                required: [
                    "institution",
                    "degree",
                    "fieldOfStudy",
                    "startDate",
                    "endDate",
                ],
            },
        },

        projects: {
            type: "array",

            items: {
                type: "object",
                additionalProperties: false,

                properties: {
                    name: {
                        type: "string",
                    },

                    description: {
                        type: "string",
                    },

                    technologies: {
                        type: "array",

                        items: {
                            type: "string",
                        },
                    },
                },

                required: [
                    "name",
                    "description",
                    "technologies",
                ],
            },
        },

        certifications: {
            type: "array",

            items: {
                type: "object",
                additionalProperties: false,

                properties: {
                    name: {
                        type: "string",
                    },

                    issuer: {
                        type: "string",
                    },

                    date: {
                        type: "string",
                    },
                },

                required: [
                    "name",
                    "issuer",
                    "date",
                ],
            },
        },

        skills: {
            type: "array",

            items: {
                type: "string",
            },
        },
    },

    required: [
        "personal",
        "summary",
        "experience",
        "education",
        "projects",
        "certifications",
        "skills",
    ],
}

export async function POST(req: Request) {
    try {


        if (!process.env.OPENROUTER_API_KEY) {
            console.error(
                "OPENROUTER_API_KEY is missing"
            )

            return NextResponse.json(
                {
                    success: false,
                    error:
                        "OpenRouter configuration is missing.",
                },
                {
                    status: 500,
                }
            )
        }


        const body = await req.json()

        const { resumeInput } = body

        if (!resumeInput) {
            return NextResponse.json(
                {
                    success: false,
                    error:
                        "Resume input is required.",
                },
                {
                    status: 400,
                }
            )
        }

        console.log(
            "Starting AI resume generation..."
        )


        const systemPrompt = `
You are Signal, an expert professional resume writer
specializing in ATS-friendly resumes.

Your task is to transform verified LinkedIn profile
information into a polished professional resume.

The source information is the ONLY source of truth.

==================================================
ABSOLUTE ACCURACY RULES
==================================================

1. NEVER invent information.

2. NEVER invent:
   - companies
   - job titles
   - dates
   - degrees
   - certifications
   - technologies
   - achievements
   - metrics
   - responsibilities
   - skills

3. Never create a metric unless the source explicitly
   provides that metric.

4. You MAY rewrite existing information to make it:
   - clearer
   - shorter
   - more professional
   - more achievement-oriented

5. Preserve factual meaning when rewriting.

6. If information is missing, return an empty string
   or omit the item when allowed by the schema.

==================================================
PERSONAL INFORMATION
==================================================

Use the candidate's actual name.

Use their LinkedIn headline only if it is useful.

Do not invent an email address or phone number.

If email or phone is not present in the source,
return an empty string.

Do not include:
- follower count
- connection count
- profile ID
- object URN
- profile picture
- cover picture
- LinkedIn internal metadata

==================================================
SUMMARY
==================================================

Write a concise professional summary.

The summary should be approximately 2-3 sentences.

Focus on:
- current professional/academic identity
- strongest technical areas
- strongest relevant experience
- major areas of specialization

Do NOT use exaggerated phrases such as:

"proven expert"

"industry-leading"

"highly accomplished"

"exceptional professional"

unless the source clearly supports such a statement.

Prefer factual language such as:

"experienced in"

"worked on"

"developed"

"specializes in"

"has hands-on experience with"

==================================================
EXPERIENCE
==================================================

Select the most relevant professional experiences.

Prioritize:
1. Technical internships
2. Engineering roles
3. Research roles
4. Relevant project internships

Avoid including weak or irrelevant positions.

Do not include generic student organizations,
clubs, or unrelated activities unless they provide
meaningful professional value.

If two entries are clearly duplicates of the same
company/role/project, combine them where appropriate.

For each selected experience:

Create approximately 2-4 bullets.

For particularly important technical experiences,
you may create up to 5 bullets.

Each bullet should:

- begin with a strong action verb
- explain what was done
- mention relevant technologies when useful
- mention measurable results ONLY when supported
- remain concise
- avoid repeating the same information

Prefer this style:

"Engineered a three-tier AI pipeline using Python,
REST APIs, MCP, and Prometheus for natural-language
GPU diagnostics."

over:

"Worked on a project involving Python and REST APIs."

Use concrete technical details from the source.

If the source contains legitimate metrics such as:

"60+ YAML mappings"

"80% test coverage"

"10+ XID codes"

those metrics MAY be preserved.

==================================================
EDUCATION
==================================================

Prioritize university/college education.

If the candidate has a Bachelor's, Master's,
PhD, or other higher education, DO NOT include
school/high-school education unless it is specifically
important to the candidate's professional profile.

For example:

If the source contains:

B.Tech
Kendriya Vidyalaya

return only:

B.Tech

Do not include secondary school education by default.

Preserve the actual degree and field of study
from the source.

DO NOT change "Electrical" to "Electronics &
Telecommunication Engineering" unless the source
explicitly supports that wording.

==================================================
PROJECTS
==================================================

Select the strongest 3-4 projects.

Prioritize projects that demonstrate:

- software engineering
- AI/ML
- computer vision
- embedded systems
- cybersecurity
- hardware/software integration
- technically meaningful engineering work

Do not include trivial or outdated projects if
stronger projects are available.

Project descriptions should be 1-2 concise sentences.

Mention only technologies actually supported
by the source.

Do not invent technologies.

==================================================
CERTIFICATIONS
==================================================

Include relevant certifications.

Do not invent certifications.

If there are many certifications, prioritize
the most relevant ones.

==================================================
SKILLS
==================================================

This is VERY IMPORTANT.

Do NOT return every LinkedIn skill.

Return ONLY the most relevant skills.

Maximum: 15 skills.

Prioritize:

1. Programming languages
2. Frameworks
3. AI/ML technologies
4. Databases
5. Cloud/devops/tools
6. Hardware/embedded technologies
7. Relevant engineering technologies

Remove:

- generic soft skills
- hobbies
- unrelated activities
- duplicate technologies
- awkward LinkedIn-generated names
- overly verbose skill names

Examples:

Instead of:

"Representational State Transfer (REST)"

use:

"REST APIs"

Instead of:

"Python (Programming Language)"

use:

"Python"

Instead of:

"Application Programming Interfaces (API)"

use:

"APIs"

Instead of:

"Continuous Integration and Continuous Delivery (CI/CD)"

use:

"CI/CD"

Instead of:

"Multiple Object Tracking , Higher Object Tracking, IDF1"

use:

"Multi-Object Tracking"

ONLY make these simplifications when they
preserve the meaning of the source.

Do NOT introduce technologies that aren't present
in the source.

==================================================
ATS OPTIMIZATION
==================================================

The resume should be:

- concise
- professional
- easy to scan
- ATS-friendly
- technically specific
- free of unnecessary LinkedIn metadata

Avoid:
- emojis
- excessive adjectives
- first-person language
- long paragraphs
- unnecessary repetition
- decorative text
- fake achievements

==================================================
OUTPUT
==================================================

Return ONLY the requested JSON structure.

Do not return Markdown.

Do not return explanations.

Do not return commentary.

Follow the supplied JSON schema exactly.
`



        const completion =
            await openai.chat.completions.create({
                model: "google/gemini-2.5-flash",


                max_tokens: 4000,

                messages: [
                    {
                        role: "system",
                        content: systemPrompt,
                    },

                    {
                        role: "user",
                        content: `
Here is the verified LinkedIn profile data:

${JSON.stringify(
                            resumeInput,
                            null,
                            2
                        )}

Create the best possible ATS-friendly resume
from this information.

Remember:

- Do not invent information.
- Select only the strongest experiences.
- Remove school education when higher education exists.
- Select only the strongest 3-4 projects.
- Return no more than 15 skills.
- Preserve legitimate metrics from the source.
- Keep the resume concise.
                        `,
                    },
                ],

                response_format: {
                    type: "json_schema",

                    json_schema: {
                        name: "signal_resume",

                        strict: true,

                        schema: resumeSchema,
                    },
                },

                temperature: 0.3,
            })



        const content =
            completion.choices[0]?.message?.content

        if (!content) {
            console.error(
                "OpenRouter returned no content:",
                completion
            )

            throw new Error(
                "AI returned an empty response."
            )
        }



        let generatedResume

        try {
            generatedResume =
                JSON.parse(content)
        } catch (parseError) {
            console.error(
                "Invalid AI JSON:",
                content
            )

            console.error(
                "JSON parse error:",
                parseError
            )

            throw new Error(
                "AI returned invalid resume data."
            )
        }


        if (
            Array.isArray(
                generatedResume.skills
            )
        ) {
            generatedResume.skills =
                generatedResume.skills
                    .filter(
                        (skill: unknown) =>
                            typeof skill === "string" &&
                            skill.trim().length > 0
                    )
                    .slice(0, 15)
        }


        if (
            Array.isArray(
                generatedResume.projects
            )
        ) {
            generatedResume.projects =
                generatedResume.projects.slice(0, 4)
        }

        if (
            Array.isArray(
                generatedResume.certifications
            )
        ) {
            generatedResume.certifications =
                generatedResume.certifications.slice(0, 5)
        }


        console.log(
            "Generated resume:",
            generatedResume
        )


        return NextResponse.json({
            success: true,
            data: generatedResume,
        })

    } catch (error) {
        console.error(
            "Resume generation error:",
            error
        )

        return NextResponse.json(
            {
                success: false,

                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to generate resume.",
            },
            {
                status: 500,
            }
        )
    }
}