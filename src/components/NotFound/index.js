import './index.css'
import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <h1>Page Not Found</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-img"
      />

      <p>we’re sorry, the page you requested could not be found</p>
      <button className="btn" type="button">
        Retry
      </button>
    </div>
  </>
)

export default NotFound
