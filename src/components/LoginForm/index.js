import {Redirect} from 'react-router-dom'

import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    errorMsg: '',
    username: '',
    password: '',
    showErrorMessage: false,
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const details = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({showErrorMessage: false})
      this.onSuccessfulLogin(data)
    } else {
      this.setState({showErrorMessage: true, errorMsg: data.error_msg})
    }
  }

  onSuccessfulLogin = data => {
    const {history} = this.props
    const jwtToken = data.jwt_token
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  render() {
    const {errorMsg, username, password, showErrorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container-bg">
        <form className="login-form" onSubmit={this.onFormSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo-styling"
          />
          <label className="paragraph" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="user-name"
            value={username}
            onChange={this.onChangeUserName}
          />
          <label className="paragraph" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="pass-word"
            value={password}
            onChange={this.onChangePassword}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMessage && <p className="paragraph2">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
