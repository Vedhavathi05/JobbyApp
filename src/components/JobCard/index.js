import {Link} from 'react-router-dom'

import {FaMapMarkerAlt, FaBriefcase, FaStar} from 'react-icons/fa'

import './index.css'

const JobCard = props => {
  const {details} = props
  const {
    title,
    rating,
    packagePerAnnum,
    location,
    jobDescription,
    employmentType,
    companyLogoUrl,
    id,
  } = details

  return (
    <Link to={`/jobs/${id}`} className="Link-ele">
      <div className="container">
        <div className="logo-alignment">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-styling"
          />
          <div>
            <h1 className="heading-for-the-jobcard">{title}</h1>
            <div>
              <p className="paragraph">
                <FaStar size={18} color="yellow" /> {rating}
              </p>
            </div>
          </div>
        </div>
        <div className="location-employment-styling">
          <div className="loca-emp">
            <div className="side-by-side">
              <FaMapMarkerAlt />
              <p>{location}</p>
            </div>
            <div className="side-by-side">
              <FaBriefcase />
              <p>{employmentType}</p>
            </div>
          </div>
          <div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <div>
          <h1 className="heading-for-the-jobCard">Description</h1>
          <p className="para">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobCard
