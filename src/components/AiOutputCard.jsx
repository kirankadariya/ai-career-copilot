function AiOutputCard({ title, output, error }) {
  return (
    <section className="card output-card" aria-live="polite">
      <h3>{title}</h3>
      {error ? <p className="error-text">{error}</p> : <pre>{output}</pre>}
    </section>
  )
}

export default AiOutputCard
