import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaStar, FaLocationArrow, FaShoppingBag} from 'react-icons/fa'
import './index.css'

class JobItem extends Component {
  render() {
    const {jobItem} = this.props
    const {
      companyUrlLogo,
      employmentType,
      jobDescription,
      location,
      id,
      packagePerAnnum,
      rating,
      title,
    } = jobItem
    return (
      <Link to={`/jobs/${id}`} className="sm-nav-link">
        <div className="jobitem-card">
          <div className="company-name">
            <div className="company-logo">
              <img
                className="company-img"
                alt="company logo"
                src={companyUrlLogo}
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
              <h1 className="detail-title-salary">{packagePerAnnum}</h1>
            </div>
          </div>
          <hr className="line" />
          <div className="desc">
            <h1 className="heading-desc">Description</h1>
            <p className="describtion">{jobDescription}</p>
          </div>
        </div>
      </Link>
    )
  }
}

export default JobItem
