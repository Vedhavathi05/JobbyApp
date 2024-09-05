import {FaMapMarkerAlt, FaBriefcase, FaStar} from 'react-icons/fa'

import './index.css'

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
    <div className="similar-jobs-container">
      <div className="similar-logo-alignment">
        <img src={companyLogoUrl} alt="similar job company logo" />
        <div>
          <h1 className="similar-heading-for-the">{title}</h1>
          <p className="similar-paragraph">
            <FaStar color="yellow" />
            {rating}
          </p>
        </div>
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <div className="displ">
        <div className="similar-side-by-side">
          <FaMapMarkerAlt />
          <p>{location}</p>
        </div>
        <div className="similar-side-by-side">
          <FaBriefcase />
          <p>{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobsCard
