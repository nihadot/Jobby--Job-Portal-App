import {Component} from 'react'
import {FaHome, FaShoppingBag, FaAngleDoubleRight} from 'react-icons/fa'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  whileClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <>
        <div className="navbar-media">
          <div className="navBar">
            <div className="logo-image">
              <Link to="/" className="sm-nav-link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                  alt="website logo"
                  className="logo"
                />
              </Link>
            </div>
            <ul className="menuOptions">
              <Link to="/" className="nav-link">
                <li className="menu-link">Home</li>
              </Link>
              <Link to="/jobs" className="nav-link">
                <li className="menu-link">Jobs</li>
              </Link>
            </ul>
            <div className="button-div">
              <button
                type="button"
                className="button"
                onClick={this.whileClickLogOut}
              >
                LogOut
              </button>
            </div>
          </div>
        </div>
        <div className="sm-navbar">
          <div className="sm-navbar-main">
            <div className="sm-logo-image">
              <Link to="/" className="sm-nav-link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                  alt="website Logo"
                  className="sm-logo"
                />
              </Link>
            </div>
            <div className="icon-container">
              <ul className="sm-menu-options">
                <Link to="/" className="sm-nav-link">
                  <li className="sm-menu-link">
                    <FaHome />
                  </li>
                </Link>
                <Link to="/jobs" className="sm-nav-link">
                  <li className="sm-menu-link">
                    <FaShoppingBag />
                  </li>
                </Link>
                <Link to="/jobs" className="sm-nav-link">
                  <li className="sm-menu-link" onClick={this.whileClickLogOut}>
                    <FaAngleDoubleRight />
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Header)
