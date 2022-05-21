import {Link} from 'react-router-dom'
import {chartTypes} from '../Charts'
import './index.css'

const StatsCards = props => {
  const {data} = props
  const {
    stateName,
    confirmed,
    recovered,
    deceased,
    other,
    population,
    stateCode,
  } = data
  const active = confirmed - recovered - deceased - other

  return (
    <>
      <li className="list-all-cases ">
        <div className="states__container__home">
          <Link to={`/state/${stateCode}`} className="link__home">
            <p className="states-names-home">{stateName}</p>
          </Link>
        </div>
        {chartTypes
          .filter(el => el.type !== 'tested')
          .map(el => (
            <div className="home__columns" key={el.type}>
              <p className={`${el.type}__home`}>
                {el.type === 'active' ? active : data[`${el.type}`]}
              </p>
            </div>
          ))}
        <div className="home__columns">
          <p className="population__home">{population}</p>
        </div>
        <div className="home__columns">
          <p className="population__home">{other}</p>
        </div>
      </li>
    </>
  )
}

export default StatsCards
