import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GoHome} from 'react-icons/go'
import {IoBagCheckOutline} from 'react-icons/io5'
import {IoIosLogOut} from 'react-icons/io'
import './index.css'

const Header = props => {
  const callingRemoveCookie = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav>
      <div className="header-container">
        <Link to="/" className="link-styling">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="link-for-md"
          />
        </Link>
        <ul className="list-container-styling">
          <Link to="/" className="link-styling">
            <li className="link-for-md route-styling">Home</li>
          </Link>
          <Link to="/jobs" className="link-styling">
            <li className="link-for-md route-styling">Jobs</li>
          </Link>
        </ul>
        <button
          type="button"
          className="link-for-md button-styling"
          onClick={callingRemoveCookie}
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
      {/* Mobile View */}
      <div className="link-for-small header-container">
        <Link to="/" className="link-styling">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="link-for-small"
          />
        </Link>
        <ul>
          <Link to="/" className="link-styling">
            <li>
              <GoHome className="link-for-small" />
            </li>
          </Link>
          <Link to="/jobs" className="link-styling">
            <li>
              <IoBagCheckOutline className="link-for-small" />
            </li>
          </Link>
        </ul>
        <button
          type="button"
          aria-label="Logout"
          className="link-for-small"
          onClick={callingRemoveCookie}
        >
          <IoIosLogOut />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
