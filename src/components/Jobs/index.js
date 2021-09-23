import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import {FaSearch} from 'react-icons/fa'
import Header from '../Header'
import JobItem from '../JobItem'
import FilterAndProfile from '../FilterAndProfile'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    employmentType: '',
    salaryType: '',
  }

  componentDidMount = () => {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput, employmentType, salaryType} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryType}&search=${searchInput}`
    const response = await fetch(jobsApiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyUrlLogo: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        id: job.id,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  setEmploymentType = type => {
    this.setState(
      {
        employmentType: type,
      },
      this.getProfile,
    )
  }

  salaryUpdate = salary => {
    this.setState(
      {
        salaryType: salary,
      },
      this.getProfile,
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProductsList = () => {
    const {jobsList} = this.state
    const showJobs = jobsList.length > 0
    return showJobs ? (
      jobsList.map(each => <JobItem key={each.id} jobItem={each} />)
    ) : (
      <div className="not-found-div">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
          className="not-found-img"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  searchInput = event => {
    event.preventDefault()
    this.getProfile()
  }

  getDataSearch = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  retry = () => {
    this.getProfile()
  }

  renderFailureView = () => (
    <div className="faliure-div">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="faliure-img"
      />
      <h1 className="title-nothing">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="btn" type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div>
        <Header />
        <div className="jobs-page">
          <div className="filter">
            <FilterAndProfile
              employmentTypes={employmentTypesList}
              salaryRanges={salaryRangesList}
              employmentTypeAssign={this.setEmploymentType}
              salaryAssign={this.salaryUpdate}
            />
          </div>
          <div className="filter2">
            <form className="search-box" onSubmit={this.searchInput}>
              <input
                type="search"
                className="search-bar"
                onChange={this.getDataSearch}
                value={searchInput}
              />
              <button
                type="submit"
                testId="searchButton"
                className="search-icon"
              >
                <FaSearch />
              </button>
            </form>
            <div className="job-card">{this.renderAll()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
