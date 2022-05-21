import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {ImMenu2} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {isToggleActive: false}

  onToggle = () => {
    this.setState(prevState => ({isToggleActive: !prevState.isToggleActive}))
  }

  showDropDownMenu = () => (
    <>
      <ul className="navbar__list">
        <Link to="/" className="link">
          <li className="item">Home</li>
        </Link>
        <Link to="/about" className="link">
          <li className="item">About</li>
        </Link>
        <Link to="/vaccination" className="link">
          <li className="item">Vaccination</li>
        </Link>
      </ul>
    </>
  )

  render() {
    const {isToggleActive} = this.state
    return (
      <>
        <div className="header__container">
          <Link to="/" className="link">
            <h1 className="logo">
              COVID19<span className="india">INDIA</span>
            </h1>
          </Link>
          <ul className="navbar__list">
            <Link to="/" className="link">
              <li className="item">Home</li>
            </Link>
            <Link to="/about" className="link">
              <li className="item">About</li>
            </Link>

            <Link to="/vaccination" className="link">
              <li className="item">Vaccination</li>
            </Link>
          </ul>
        </div>
        <div className="mobile__menu">
          <div className="mobile__header__container">
            <Link to="/" className="link">
              <h1 className="logo">
                COVID19<span className="india">INDIA</span>
              </h1>
            </Link>
            <button
              type="button"
              className="toggle__button"
              onClick={this.onToggle}
            >
              <ImMenu2 className="menuicon" alt="menu" />
            </button>
          </div>
          <div className="menu">
            {isToggleActive && this.showDropDownMenu()}
          </div>
        </div>
      </>
    )
  }
}

export default Header
