import { useState } from 'react'
import AiGeneratorForm from '../components/AiGeneratorForm.jsx'
import AiOutputCard from '../components/AiOutputCard.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { generateResumeSuggestions } from '../services/aiAssistant.js'

function ResumeBuilderPage() {
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [output, setOutput] = useState(
    'Your resume suggestions will appear here after you provide your background.',
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await generateResumeSuggestions(details)
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
        eyebrow="Resume Builder"
        title="Create stronger resume content"
        description="Paste your role, results, and target job details to generate tailored resume direction."
      />
      <div className="page-grid">
        <AiGeneratorForm
          title="Resume input"
          description="Include your current role, achievements, and target position for better recommendations."
          label="Career background"
          placeholder="Example: Product analyst with 3 years of SaaS experience, improved trial-to-paid conversion by 18%, applying for Growth PM roles."
          buttonText="Generate resume suggestions"
          value={details}
          onChange={setDetails}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <AiOutputCard title="AI resume guidance" output={output} error={error} />
      </div>
    </>
  )
}

export default ResumeBuilderPage
