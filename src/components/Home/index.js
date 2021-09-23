import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="home">
          <div className="hero-side">
            <h1 className="heading">Find The Job That Fits Your Life</h1>
            <p className="heading">Millions of people are searching for jobs</p>
            <Link to="/jobs" className="nav-link">
              <button type="button" className="button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
