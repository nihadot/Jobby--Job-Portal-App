import {Component} from 'react'
// import {FaStar} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

let arr = []

class FilterAndProfile extends Component {
  state = {
    userData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok) {
      const data = await response.json()

      const modifiedData = {
        name: data.profile_details.name,
        profile: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        userData: modifiedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onCheckedBoxItem = event => {
    const {employmentTypeAssign} = this.props
    if (arr.includes(event.target.value)) {
      arr = arr.filter(each => event.target.value !== each)
    } else {
      arr.push(event.target.value)
    }
    const filterData = arr.join()
    employmentTypeAssign(filterData)
  }

  onCheckedBoxSalary = event => {
    const {salaryAssign} = this.props
    salaryAssign(event.target.value)
  }

  renderSuccess = () => {
    const {userData} = this.state
    const {name, profile, shortBio} = userData
    return (
      <div className="user-profile">
        <img src={profile} alt="profile" className="profile-photo" />
        <h1 className="title">{name}</h1>
        <p className="role">{shortBio}</p>
      </div>
    )
  }

  renderProgress = () => (
    <div className="user-profile-f">
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  retryProfile = () => {
    this.getProfile()
  }

  renderFailure = () => (
    <div className="user-profile-f">
      <button className="btn" type="button" onClick={this.retryProfile}>
        Retry
      </button>
    </div>
  )

  renderAllProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderProgress()
      default:
        return null
    }
  }

  render() {
    const {employmentTypes, salaryRanges} = this.props

    return (
      <div className="side-card">
        {this.renderAllProfile()}
        <hr />
        <h1 className="filter-title">Type of Employment</h1>
        <ul className="list-content-style">
          {employmentTypes.map(each => (
            <li key={each.employmentTypeId} className="content-job">
              <input
                className="checkBox"
                type="checkbox"
                value={each.employmentTypeId}
                onChange={this.onCheckedBoxItem}
                id="byu"
              />
              <label htmlFor="byu" className="filter-elemet">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
        <h1 className="filter-title">Salary Range</h1>
        <fleidset id="radiobuttons" className="list-content-style">
          {salaryRanges.map(each => (
            <li key={each.employmentTypeId} className="content-job">
              <input
                className="checkBox"
                type="radio"
                value={each.salaryRangeId}
                onChange={this.onCheckedBoxSalary}
                name="radiobuttons"
                id="btu"
              />
              <label htmlFor="btu" className="filter-elemet">
                {each.label}
              </label>
            </li>
          ))}
        </fleidset>
      </div>
    )
  }
}

export default FilterAndProfile
