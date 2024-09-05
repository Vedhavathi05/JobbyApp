import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class ProfileCard extends Component {
  state = {
    name: '',
    profileImageUrl: '',
    shortBio: '',
    errorOccurred: false,
  }

  componentDidMount() {
    this.getTheProfileDetails()
  }

  getTheProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setDetails(data.profile_details)
    } else {
      this.setState({errorOccurred: true})
    }
  }

  setDetails = profile => {
    this.setState({
      errorOccurred: false,
      name: profile.name,
      profileImageUrl: profile.profile_image_url,
      shortBio: profile.short_bio,
    })
  }

  render() {
    const {name, profileImageUrl, shortBio, errorOccurred} = this.state
    return (
      <div>
        {!errorOccurred && (
          <div className="profile-background">
            <img src={profileImageUrl} alt="profile" />
            <h1>{name}</h1>
            <p>{shortBio}</p>
          </div>
        )}
        {errorOccurred && (
          <button type="button" onClick={this.getTheProfileDetails}>
            Retry
          </button>
        )}
      </div>
    )
  }
}

export default ProfileCard
