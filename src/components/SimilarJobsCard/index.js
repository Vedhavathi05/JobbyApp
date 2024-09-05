const SimilarJobsCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = details
  return (
    <div>
      <div>
        <img src={companyLogoUrl} alt="similar job company logo" />
        <h1>{title}</h1>
        <p>{rating}</p>
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <p>{location}</p>

      <p>{employmentType}</p>
    </div>
  )
}

export default SimilarJobsCard
