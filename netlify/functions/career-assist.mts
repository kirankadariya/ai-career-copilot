import type { Context } from '@netlify/functions'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

type ResumePayload = {
  resumeText: string
  jobTitle?: string
  industry?: string
}

type CoverLetterPayload = {
  jobDescription: string
  background: string
  tone?: string
}

type InterviewPayload = {
  jobTitle: string
  jobDescription: string
  background?: string
}

function buildResumePrompt({ resumeText, jobTitle, industry }: ResumePayload) {
  return {
    system: `You are an expert career coach and professional resume writer with 15+ years of experience helping candidates land roles at top companies. You provide specific, actionable feedback — always referencing the actual content of the resume rather than offering generic advice. Be direct, honest, and encouraging.`,
    user: `Please analyze this resume and provide comprehensive feedback.

RESUME:
${resumeText}
${jobTitle ? `\nTARGET ROLE: ${jobTitle}` : ''}
${industry ? `INDUSTRY: ${industry}` : ''}

Structure your response with these sections:

**Overall Assessment**
First impression and overall strength (2-3 sentences).

**What's Working Well**
Specific things that are effective — reference actual content.

**Critical Improvements**
The most impactful changes to make, in priority order. Be specific.

**Content & Language**
Suggested rewrites, metrics to add, achievements to strengthen. Use examples.

**Format & Structure**
Layout, length, scannability recommendations.

**ATS Optimization**
Keywords and formatting tips for applicant tracking systems${jobTitle ? ` targeting a ${jobTitle} role` : ''}.

**Quick Wins**
3–5 immediate changes with the highest impact.

Reference specific lines and sections from their resume throughout.`,
  }
}

function buildCoverLetterPrompt({ jobDescription, background, tone }: CoverLetterPayload) {
  return {
    system: `You are an expert cover letter writer who crafts compelling, personalized letters that get hiring managers' attention. Your letters are specific and authentic — no clichés, no generic openers, no filler. You connect real experience to real requirements.`,
    user: `Write a compelling cover letter based on the details below.

JOB DESCRIPTION:
${jobDescription}

CANDIDATE BACKGROUND:
${background}

TONE: ${tone || 'Professional, confident, and personable'}

Requirements:
- Open with a strong hook (NOT "I am writing to apply for..." or "I am excited to...")
- Connect specific experiences to the role's key requirements
- Highlight 2–3 quantified achievements most relevant to this role
- Show genuine understanding of what the company/team needs
- Close with a confident, forward-looking call to action
- Length: 3–4 paragraphs, approximately 300–380 words

Write only the letter body — start directly with the opening line. Make it feel authentic and tailored, not AI-generated.`,
  }
}

function buildInterviewPrompt({ jobTitle, jobDescription, background }: InterviewPayload) {
  return {
    system: `You are an expert interview coach who has helped thousands of candidates succeed at top companies. You provide realistic, challenging questions specific to the role — and model answers that are concrete, not vague. Your guidance is immediately practical.`,
    user: `Create a comprehensive interview preparation guide for this role.

ROLE: ${jobTitle}

JOB DESCRIPTION:
${jobDescription}
${background ? `\nCANDIDATE BACKGROUND:\n${background}` : ''}

Include these sections:

**Behavioral Questions (STAR Format)**
5 behavioral questions specific to this role. For each: the question, what the interviewer is really assessing, and how to structure a strong answer.

**Technical & Role-Specific Questions**
5 questions that test core competencies for this role. For each: the question and what a strong answer should cover.

**Questions to Ask the Interviewer**
5 thoughtful questions that demonstrate genuine interest and sharp thinking — avoid generic questions like "What does success look like?"

**Key Themes to Emphasize**
Based on the job description, 3–4 qualities/themes to weave throughout all answers.

**Common Mistakes to Avoid**
3–4 pitfalls specific to candidates for this type of role.

Be specific to this role and job description — avoid advice that could apply to any job interview.`,
  }
}

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return new Response('Invalid JSON body', { status: 400 })
  }

  const { mode, ...rest } = body as { mode: string } & Record<string, unknown>

  let system: string
  let user: string

  try {
    if (mode === 'resume') {
      const payload = rest as ResumePayload
      if (!payload.resumeText) return new Response('resumeText is required', { status: 400 });
      ({ system, user } = buildResumePrompt(payload))
    } else if (mode === 'cover-letter') {
      const payload = rest as CoverLetterPayload
      if (!payload.jobDescription || !payload.background) {
        return new Response('jobDescription and background are required', { status: 400 })
      };
      ({ system, user } = buildCoverLetterPrompt(payload))
    } else if (mode === 'interview') {
      const payload = rest as InterviewPayload
      if (!payload.jobTitle || !payload.jobDescription) {
        return new Response('jobTitle and jobDescription are required', { status: 400 })
      };
      ({ system, user } = buildInterviewPrompt(payload))
    } else {
      return new Response('Invalid mode. Must be resume, cover-letter, or interview.', { status: 400 })
    }
  } catch (err) {
    console.error('Prompt build error:', err)
    return new Response('Failed to process request', { status: 500 })
  }

  try {
    const stream = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system,
      messages: [{ role: 'user', content: user }],
      stream: true,
    })

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(new TextEncoder().encode(event.delta.text))
            }
          }
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (err) {
    console.error('Anthropic stream error:', err)
    return new Response('AI service error. Please try again.', { status: 502 })
  }
}

export const config = {
  path: '/api/career-assist',
}
