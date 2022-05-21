import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notfound__container">
    <div className="notfound_content">
      <img
        src="https://res.cloudinary.com/amst/image/upload/v1639762911/notfnd_e79uve.jpg"
        alt="not-found-pic"
        className="notfound__image"
      />

      <h1 className="notfound__title">PAGE NOT FOUND</h1>
      <p className="notfound__para">
        we are sorry, the page you requested could not be found
      </p>

      <div className="button__container">
        <Link to="/">
          <button type="button" className="home__button">
            Home
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default NotFound
