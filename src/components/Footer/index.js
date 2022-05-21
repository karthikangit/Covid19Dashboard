import {VscGithubAlt} from 'react-icons/vsc'
import {FaTwitter} from 'react-icons/fa'
import {FiInstagram} from 'react-icons/fi'
import './index.css'

const Footer = () => (
  <div className="footer__container">
    <div className="footer__mobile">
      <h1 className="footer__head">
        COVID19<span>INDIA</span>
      </h1>
      <p className="footer__content">
        we stand with everyone fighting on the front lines
      </p>
      <div className="footer__icons__container">
        <VscGithubAlt fontSize="48" color="#CBD5E1" />
        <FiInstagram fontSize="48" color="#CBD5E1" />
        <FaTwitter fontSize="48" color="#CBD5E1" />
      </div>
    </div>
  </div>
)

export default Footer
