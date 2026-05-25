function AiGeneratorForm({
  title,
  description,
  label,
  placeholder,
  buttonText,
  value,
  onChange,
  onSubmit,
  loading,
}) {
  return (
    <section className="card">
      <h3>{title}</h3>
      <p className="card-description">{description}</p>
      <form className="generator-form" onSubmit={onSubmit}>
        <label htmlFor="prompt-input">{label}</label>
        <textarea
          id="prompt-input"
          rows="7"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : buttonText}
        </button>
      </form>
    </section>
  )
}

export default AiGeneratorForm
