import {Component} from 'react'
import {FaStar, FaLocationArrow, FaShoppingBag} from 'react-icons/fa'
import './index.css'

class SimilarJob extends Component {
  render() {
    const {simjobData} = this.props
    const {
      companyUrlLogo,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
    } = simjobData
    return (
      <div className="job-details-similar">
        <div className="company-name">
          <div className="company-logo">
            <img
              className="company-img"
              alt="similar job company logo"
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
        <div className="desc">
          <div className="desc-vist">
            <h1 className="heading-desc">Description</h1>
          </div>
          <p className="heading-desc-similar">{jobDescription}</p>
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
        </div>
      </div>
    )
  }
}
export default SimilarJob
