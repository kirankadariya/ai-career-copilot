function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="page-header card">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  )
}

export default PageHeader
