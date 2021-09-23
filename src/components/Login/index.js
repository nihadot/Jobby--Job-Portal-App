import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isError: '',
    errorMessage: '',
  }

  userNameChange = event => {
    const {value} = event.target
    this.setState({username: value})
  }

  passwordChange = event => {
    const {value} = event.target
    this.setState({password: value})
  }

  submitFormData = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  whileSubmit = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const url = 'https://apis.ccbp.in/login'

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitFormData(data.jwt_token)
    } else {
      this.setState({
        isError: true,
        errorMessage: data.error_msg,
      })
    }
  }

  render() {
    const {isError, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-form">
          <div className="logo-image">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website Logo"
            />
          </div>
          <form className="form-container" onSubmit={this.whileSubmit}>
            <label className="label" htmlFor="userName">
              USERNAME
            </label>
            <input
              onChange={this.userNameChange}
              id="userName"
              className="input-user"
              type="text"
              placeholder="Username"
            />
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              onChange={this.passwordChange}
              id="password"
              className="input-user"
              type="password"
            />
            <button className="button" type="submit">
              Login
            </button>
            {isError && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
