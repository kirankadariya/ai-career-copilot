import { useState } from 'react'
import AiGeneratorForm from '../components/AiGeneratorForm.jsx'
import AiOutputCard from '../components/AiOutputCard.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { generateCoverLetterDraft } from '../services/aiAssistant.js'

function CoverLetterPage() {
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [output, setOutput] = useState(
    'Your AI-generated cover letter draft will appear here after you provide context.',
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await generateCoverLetterDraft(details)
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
        eyebrow="Cover Letter Generator"
        title="Draft personalized cover letters quickly"
        description="Provide the role context, company focus, and your key achievements to create a polished first draft."
      />
      <div className="page-grid">
        <AiGeneratorForm
          title="Cover letter input"
          description="Mention role title, company mission, and the top outcomes you want to emphasize."
          label="Role and achievement context"
          placeholder="Example: Applying for Senior Frontend Engineer at a health-tech company. Led migration to React + TypeScript and improved Core Web Vitals by 30%."
          buttonText="Generate cover letter"
          value={details}
          onChange={setDetails}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <AiOutputCard title="AI cover letter draft" output={output} error={error} />
      </div>
    </>
  )
}

export default CoverLetterPage
