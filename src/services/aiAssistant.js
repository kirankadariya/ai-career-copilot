const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const cleanInput = (input) => input.trim()

export async function generateResumeSuggestions(background) {
  const details = cleanInput(background)
  if (!details) {
    throw new Error('Add your current role, skills, and goals to generate resume guidance.')
  }

  await wait(650)

  return [
    'Professional Summary: Build a 2-3 line summary focused on measurable impact and role fit.',
    'Top Skills Section: Highlight the strongest role-specific keywords from the job description.',
    'Experience Bullets: Use action verbs plus metrics (revenue, speed, quality, or adoption).',
    `Tailoring Tip: Mirror hiring language tied to this context: ${details}`,
  ].join('\n\n')
}

export async function generateCoverLetterDraft(details) {
  const input = cleanInput(details)
  if (!input) {
    throw new Error('Provide role context and achievements to generate a cover letter draft.')
  }

  await wait(700)

  return `Dear Hiring Team,\n\nI am excited to apply for this opportunity. With experience aligned to ${input}, I bring a strong track record of delivering impact in fast-moving teams.\n\nIn recent roles, I improved outcomes through cross-functional collaboration, clear communication, and data-informed execution. I am particularly motivated by your mission and believe my background can help your team achieve its next milestones.\n\nThank you for your consideration. I would welcome the opportunity to discuss how I can contribute.\n\nSincerely,\nYour Name`
}

export async function generateInterviewPrepPlan(inputContext) {
  const context = cleanInput(inputContext)
  if (!context) {
    throw new Error('Share role details to generate interview practice guidance.')
  }

  await wait(600)

  return [
    `Role Focus: ${context}`,
    'Question 1: Tell me about a project where you drove measurable business impact.',
    'Question 2: Describe a challenge and how you handled trade-offs under pressure.',
    'Question 3: Why this role and how does your background align?',
    'Practice Plan: Record 3 STAR responses and review clarity, metrics, and confidence.',
  ].join('\n\n')
}
