import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchResult = props => {
  const {stateName, stateCode, id} = props

  return (
    <li>
      <Link to={`/state/${id}`} className="link__search">
        <div className="search__result">
          <h1 className="search__result__heading">{stateName}</h1>

          <button type="button" className="search__button">
            {stateCode}
            <BiChevronRightSquare
              testid="searchResultChevronRightIcon"
              alt="line icon"
              className="icon__right"
            />
          </button>
        </div>
      </Link>
    </li>
  )
}

export default SearchResult
