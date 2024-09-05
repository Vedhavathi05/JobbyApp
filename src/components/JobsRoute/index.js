import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ProfileCard from '../ProfileCard'
import TypeOfEmployment from '../TypeOfEmployment'
import SalaryList from '../SalaryList'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

class JobsRoute extends Component {
  state = {
    jobsList: [],
    apiStatus: 'INACTIVE',
    employmentType: [],
    minimumPackage: '',
    searchInput: '',
    profileImageUrl: '', // Add state for profile image URL
  }

  componentDidMount() {
    this.getJobsDDetailsList()
    this.getProfileDetails() // Fetch profile details
  }

  getJobsDDetailsList = async () => {
    const {employmentType, minimumPackage, searchInput} = this.state
    const employmentTypeStr = employmentType.join(',')
    this.setState({apiStatus: 'PROGRESS'})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeStr}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      headers: {authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        const updatedList = data.jobs.map(each => ({
          title: each.title,
          rating: each.rating,
          packagePerAnnum: each.package_per_annum,
          location: each.location,
          jobDescription: each.job_description,
          id: each.id,
          employmentType: each.employment_type,
          companyLogoUrl: each.company_logo_url,
        }))
        this.setState({apiStatus: 'SUCCESS', jobsList: updatedList})
      } else {
        this.setState({apiStatus: 'FAILURE'})
      }
    } catch (error) {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        this.setState({profileImageUrl: data.profile_image_url})
      }
    } catch (error) {
      // Handle error if needed
    }
  }

  jobsView = () => {
    const {apiStatus, jobsList} = this.state
    switch (apiStatus) {
      case 'PROGRESS':
        return this.showLoader()
      case 'SUCCESS':
        return this.onSuccessfulFetchingTheJobs(jobsList)
      case 'FAILURE':
        return this.onJobFetchingFailure()
      default:
        return null
    }
  }

  showLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onSuccessfulFetchingTheJobs = jobsList => {
    if (jobsList.length !== 0) {
      return (
        <ul>
          {jobsList.map(each => (
            <li key={each.id}>
              <JobCard details={each} />
            </li>
          ))}
        </ul>
      )
    }
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  onJobFetchingFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.getJobsDDetailsList}>
        Retry
      </button>
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeSalaryRange = salaryRangeId => {
    this.setState({minimumPackage: salaryRangeId}, this.getJobsDDetailsList)
  }

  onChangeEmploymentType = (employmentTypeId, isChecked) => {
    this.setState(prevState => {
      const updatedEmploymentTypes = isChecked
        ? [...prevState.employmentType, employmentTypeId]
        : prevState.employmentType.filter(id => id !== employmentTypeId)
      return {employmentType: updatedEmploymentTypes}
    }, this.getJobsDDetailsList)
  }

  render() {
    const {searchInput, profileImageUrl} = this.state
    return (
      <div>
        <Header />
        <div className="jobs-main-section">
          <div className="jobs-bottom-section">
            <div>
              <div className="search-for-small">
                <input type="search" />
                <BsSearch
                  className="search-icon"
                  onClick={this.getJobsDDetailsList}
                />
              </div>
              <ProfileCard />
              <br />
              <hr className="horizontal-line-class" />
              <h1 style={{color: 'white'}}>Type of Employment</h1>
              <ul>
                {employmentTypesList.map(each => (
                  <li key={each.employmentTypeId}>
                    <TypeOfEmployment
                      details={each}
                      onChangeEmploymentType={this.onChangeEmploymentType}
                    />
                  </li>
                ))}
              </ul>
              <br />
              <hr className="horizontal-line-class" />
              <div>
                <br />
                <h1 style={{color: 'white'}}>Salary range</h1>
                <ul>
                  {salaryRangesList.map(each => (
                    <li key={each.salaryRangeId}>
                      <SalaryList
                        details={each}
                        onChangeSalaryRange={this.onChangeSalaryRange}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="search-for-large">
              <input
                type="search"
                className="input-element"
                placeholder="search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                aria-label="Search"
                className="button-element"
                onClick={this.getJobsDDetailsList} // Trigger search on click
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div>{this.jobsView()}</div>
          </div>
          {/* Render profile image if available */}
          {profileImageUrl && <img src={profileImageUrl} alt="profile" />}
        </div>
      </div>
    )
  }
}

export default JobsRoute
