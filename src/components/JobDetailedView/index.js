import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'
import DetailedViewCard from '../DetailedViewCard'
import SimilarJobsCard from '../SimilarJobsCard'

import './index.css'

class JobDetailedView extends Component {
  state = {
    jobsDetailsList: [],
    similarJobsDetailsList: [],
    activeState: 'INACTIVE',
  }

  componentDidMount() {
    this.getDetailsOfEachInDetail()
  }

  getDetailsOfEachInDetail = async () => {
    this.setState({activeState: 'PROGRESS'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const mainJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
        title: data.job_details.title,
      }
      const similarJobsDetails = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.onSuccessfulFetching(mainJobDetails, similarJobsDetails)
    } else {
      this.setState({activeState: 'FAILURE'})
    }
  }

  onSuccessfulFetching = (mainJobDetails, similarJobsDetails) => {
    this.setState({
      jobsDetailsList: mainJobDetails,
      similarJobsDetailsList: similarJobsDetails,
      activeState: 'SUCCESS',
    })
  }

  showTheDetails = () => {
    const {activeState} = this.state
    console.log(activeState)
    switch (activeState) {
      case 'PROGRESS':
        return this.showLoader()
      case 'SUCCESS':
        return this.showSuccessView()
      case 'FAILURE':
        return this.showFailure()
      default:
        return null
    }
  }

  showLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  showFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.getDetailsOfEachInDetail}>
        Retry
      </button>
    </div>
  )

  showSuccessView = () => {
    const {jobsDetailsList, similarJobsDetailsList} = this.state
    return (
      <div>
        <DetailedViewCard jobsDetails={jobsDetailsList} />
        <h1>Similar Jobs</h1>
        <ul className="similar-detail-view-list-items">
          {similarJobsDetailsList.map(each => (
            <li key={each.id}>
              <SimilarJobsCard details={each} key={each.id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Header />
        <div className="detailed-view">{this.showTheDetails()}</div>
      </div>
    )
  }
}

export default JobDetailedView
