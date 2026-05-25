import { useState } from 'react'
import AiGeneratorForm from '../components/AiGeneratorForm.jsx'
import AiOutputCard from '../components/AiOutputCard.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { generateInterviewPrepPlan } from '../services/aiAssistant.js'

function InterviewPrepPage() {
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [output, setOutput] = useState(
    'Your interview prep prompts and practice plan will appear here after you add role details.',
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await generateInterviewPrepPlan(details)
      setOutput(response)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Interview Prep"
        title="Practice with focused interview prompts"
        description="Use AI-guided questions and a prep structure tailored to your role goals and background."
      />
      <div className="page-grid">
        <AiGeneratorForm
          title="Interview context"
          description="Share role title, level, and interview style to generate focused practice prompts."
          label="Role and interview details"
          placeholder="Example: Staff Data Engineer interview focused on system design, stakeholder collaboration, and leadership examples."
          buttonText="Generate interview prep"
          value={details}
          onChange={setDetails}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <AiOutputCard title="AI interview prep" output={output} error={error} />
      </div>
    </>
  )
}

export default InterviewPrepPage
