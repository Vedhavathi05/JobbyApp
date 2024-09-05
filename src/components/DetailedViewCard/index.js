const DetailedViewCard = props => {
  const {jobsDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,

    jobDescription,
    lifeAtCompany,
    location,
    packagePerAnnum,
    rating,
    skills,
    title,
  } = jobsDetails
  return (
    <div>
      <div>
        <img src={companyLogoUrl} alt="job details company logo" />
        <div>
          <h1>{title}</h1>
          <p>{rating}</p>
        </div>
      </div>
      <div>
        <div>
          <p>{location}</p>
          <p>{employmentType}</p>
        </div>
        <p>{packagePerAnnum}</p>
      </div>
      <hr />
      <div>
        <div>
          <h1>Description</h1>
          <a href={companyWebsiteUrl}>Visit</a>
        </div>
        <p>{jobDescription}</p>
      </div>
      <div>
        <h1>Skills</h1>
        {skills.map(each => (
          <div>
            <p>{each.name}</p>
            <img src={each.imageUrl} alt={each.name} />
          </div>
        ))}
      </div>
      <div>
        <h1>Life At Company</h1>
        <p>{lifeAtCompany.description}</p>
        <img src={lifeAtCompany.imageUrl} alt="life at company" />
      </div>
    </div>
  )
}

export default DetailedViewCard
