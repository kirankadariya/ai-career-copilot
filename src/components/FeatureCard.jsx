import { Link } from 'react-router-dom'

function FeatureCard({ title, description, href, cta }) {
  return (
    <article className="card feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={href}>{cta}</Link>
    </article>
  )
}

export default FeatureCard
