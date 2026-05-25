import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Resume Builder', to: '/resume-builder' },
  { label: 'Cover Letter', to: '/cover-letter-generator' },
  { label: 'Interview Prep', to: '/interview-prep' },
]

function SiteLayout({ children }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand-wrap">
          <p className="eyebrow">AI Career Copilot</p>
          <h1>Your AI-powered job search assistant</h1>
        </div>
        <nav className="site-nav" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <p>
          AI Career Copilot helps users create stronger resumes, improve cover letters, and
          prepare for interviews with personalized support.
        </p>
      </footer>
    </div>
  )
}

export default SiteLayout
