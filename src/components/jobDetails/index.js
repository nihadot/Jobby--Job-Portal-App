import {Component} from 'react'
import {
  FaStar,
  FaLocationArrow,
  FaShoppingBag,
  FaExternalLinkAlt,
} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import {v4 as uuidv4} from 'uuid'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'
import SimilarJob from '../similarJob'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetail extends Component {
  state = {
    jobData: {},
    apiStatus: apiStatusConstants.initial,
    skillData: [],
    lifeData: {},
    similarJobData: [],
  }

  componentDidMount = () => {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const modifiedData = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        location: fetchedData.job_details.location,
        rating: fetchedData.job_details.rating,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        title: fetchedData.job_details.title,
      }
      const updatedSkillData = fetchedData.job_details.skills.map(job => ({
        id: uuidv4(),
        skillImageUrl: job.image_url,
        skillName: job.name,
      }))
      console.log(fetchedData.job_details.similar_jobs)
      const updatedSimilarJobData = fetchedData.similar_jobs.map(job => ({
        companyUrlLogo: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        idJob: job.id,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))

      const updatedLifeData = {
        lifeDescription: fetchedData.job_details.life_at_company.description,
        lifeImageUrl: fetchedData.job_details.life_at_company.image_url,
      }

      this.setState({
        jobData: modifiedData,
        apiStatus: apiStatusConstants.success,
        skillData: updatedSkillData,
        lifeData: updatedLifeData,
        similarJobData: updatedSimilarJobData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCardDetails = () => {
    const {jobData, skillData, lifeData, similarJobData} = this.state
    const {lifeDescription, lifeImageUrl} = lifeData

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      packagePerAnnum,
      title,
    } = jobData
    return (
      <div className="job-detials">
        <div className="jobitem-card">
          <div className="company-name">
            <div className="company-logo">
              <img
                className="company-img"
                alt="job details company logo"
                src={companyLogoUrl}
              />
            </div>
            <div className="company-title">
              <h1 className="job-title">{title}</h1>
              <div className="star">
                <FaStar />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="detail-card">
            <div className="details-two">
              <FaLocationArrow />
              <p className="detail-title">{location}</p>
            </div>
            <div className="details-two">
              <FaShoppingBag />
              <p className="detail-title">{employmentType}</p>
            </div>
            <div className="details-one">
              <p className="detail-title-salary">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="line" />
          <div className="desc">
            <div className="desc-vist">
              <h1 className="heading-desc">Description</h1>
              <a className="linkout" href={companyWebsiteUrl}>
                Visit
                <FaExternalLinkAlt className="external-icon" />
              </a>
            </div>
            <p className="describtion">{jobDescription}</p>
          </div>
          <div className="job-detials-skill">
            <h1 className="skill-head">Skills</h1>
            <ul className="skill-contianer">
              {skillData.map(each => (
                <li className="skill-data" key={each.skillName}>
                  <img
                    className="skill-image"
                    src={each.skillImageUrl}
                    alt={each.skillName}
                  />
                  <h1 className="skill-nama">{each.skillName}</h1>
                </li>
              ))}
            </ul>
          </div>
          <div className="job-detials-skill">
            <h1 className="skill-head">Life At Company</h1>
            <div className="content-div-jobdetail">
              <div className="desc-life-head">
                <p className="desc-things">{lifeDescription}</p>
              </div>
              <div className="desc-life-head">
                <img
                  className="life-image"
                  src={lifeImageUrl}
                  alt="life at company"
                />
              </div>
            </div>
          </div>
        </div>
        <h1 className="skill-head-similar">Similar Jobs</h1>
        <div className="similarJobs">
          {similarJobData.map(each => (
            <SimilarJob simjobData={each} />
          ))}
        </div>
      </div>
    )
  }

  renderDetailFailure = () => (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="not-found-img"
      />

      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="btn" type="button" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  renderProgressDetail = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCardDetails()
      case apiStatusConstants.failure:
        return this.renderDetailFailure()
      case apiStatusConstants.inProgress:
        return this.renderProgressDetail()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderAllDetails()}
      </>
    )
  }
}

export default JobDetail
