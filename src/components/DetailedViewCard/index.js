import {FaMapMarkerAlt, FaBriefcase, FaStar} from 'react-icons/fa'

import './index.css'

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
    <div className="detailed-view-container">
      <div className="detailed-logo-alignment">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
          className="detailed-company-logo-styling"
        />
        <div>
          <h1 className="detailed-heading-for-the">{title}</h1>
          <p className="detailed-paragraph">
            <FaStar size={18} color="yellow" />
            {rating}
          </p>
        </div>
      </div>
      <div className="detailed-location-employment-styling">
        <div className="detailed-loca-emp">
          <div className="detailed-side-by-side">
            <FaMapMarkerAlt />
            <p>{location}</p>
          </div>
          <div className="detailed-side-by-side">
            <FaBriefcase />
            <p>{employmentType}</p>
          </div>
        </div>
        <p>{packagePerAnnum}</p>
      </div>
      <hr />
      <br />
      <div>
        <div className="detailed-loca-emp2">
          <h1 className="heading-for-the-detailed">Description</h1>
          <a href={companyWebsiteUrl}>Visit</a>
        </div>
        <p>{jobDescription}</p>
      </div>
      <div>
        <h1>Skills</h1>
        <div className="skills-container">
          {skills.map(each => (
            <div className="displaying-skills-side-by-side">
              <img src={each.imageUrl} alt={each.name} />
              <p className="applying-the-padding-for-skills">{each.name}</p>
            </div>
          ))}
        </div>
      </div>
      <h1>Life At Company</h1>
      <div className="life-at-company-styling">
        <p>{lifeAtCompany.description}</p>
        <img src={lifeAtCompany.imageUrl} alt="life at company" />
      </div>
    </div>
  )
}

export default DetailedViewCard
