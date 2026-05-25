import FeatureCard from '../components/FeatureCard.jsx'

const features = [
  {
    title: 'Resume Builder',
    description:
      'Turn your background into stronger, targeted resume content with AI-assisted structure and language.',
    href: '/resume-builder',
    cta: 'Build my resume',
  },
  {
    title: 'Cover Letter Generator',
    description:
      'Draft role-specific cover letters in seconds, then refine them to match your voice and achievements.',
    href: '/cover-letter-generator',
    cta: 'Generate letter',
  },
  {
    title: 'Interview Prep',
    description:
      'Practice likely interview questions, shape STAR stories, and prepare confident responses.',
    href: '/interview-prep',
    cta: 'Start prep',
  },
]

function HomePage() {
  return (
    <>
      <section className="hero card">
        <p className="eyebrow">Built for modern job seekers</p>
        <h2>Navigate your next career move with AI Career Copilot</h2>
        <p>
          AI Career Copilot is an AI-powered job search assistant that helps users create
          stronger resumes, improve cover letters, and prepare for interviews with personalized
          support.
        </p>
      </section>

      <section className="feature-grid" aria-label="Core features">
        {features.map((feature) => (
          <FeatureCard key={feature.href} {...feature} />
        ))}
      </section>
    </>
  )
}

export default HomePage
