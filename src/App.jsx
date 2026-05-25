import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import ResumeBuilderPage from './pages/ResumeBuilderPage.jsx'
import CoverLetterPage from './pages/CoverLetterPage.jsx'
import InterviewPrepPage from './pages/InterviewPrepPage.jsx'

function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume-builder" element={<ResumeBuilderPage />} />
        <Route path="/cover-letter-generator" element={<CoverLetterPage />} />
        <Route path="/interview-prep" element={<InterviewPrepPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  )
}

export default App
