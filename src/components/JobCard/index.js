import {Link} from 'react-router-dom'

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
    <Link to={`/jobs/${id}`}>
      <div className="container">
        <div>
          <img src={companyLogoUrl} alt="company logo" />
          <div>
            <h1>{title}</h1>
            <div>
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <p>{location}</p>
            </div>
            <div>
              <p>{employmentType}</p>
            </div>
          </div>
          <div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <div>
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobCard
