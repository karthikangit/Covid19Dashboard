import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import StatsCards from '../StatsCards'
import SearchResult from '../SearchResult'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'
import {chartTypes} from '../Charts'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    isLoading: true,
    caseStats: {
      totalActiveCases: 0,
      totalConfirmedCases: 0,
      totalRecoveredCases: 0,
      totalDeceasedCases: 0,
    },
    search: '',
    filteredSearchList: [],
    statesInfo: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/covid19-state-wise-data',
      {
        method: 'GET',
      },
    )
    if (response.ok === true) {
      const data = await response.json()
      let nationalWideConfirmedCases = 0
      let nationalWideRecoveredCases = 0
      let nationalWideDeceasedCases = 0
      let nationalWideActiveCases = 0

      statesList.forEach(state => {
        if (data[state.state_code]) {
          const {total} = data[state.state_code]
          nationalWideConfirmedCases += total.confirmed ? total.confirmed : 0
          nationalWideDeceasedCases += total.deceased ? total.deceased : 0
          nationalWideRecoveredCases += total.recovered ? total.recovered : 0
        }
      })

      nationalWideActiveCases +=
        nationalWideConfirmedCases -
        (nationalWideRecoveredCases + nationalWideDeceasedCases)

      const states = statesList.map(eachState => ({
        stateName: eachState.state_name,
        stateCode: eachState.state_code,
        confirmed: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.confirmed),
        recovered: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.recovered),
        deceased: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.deceased),
        other: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.other),
        population: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].meta.population),
      }))

      this.setState({
        caseStats: {
          totalActiveCases: nationalWideActiveCases,
          totalRecoveredCases: nationalWideRecoveredCases,
          totalDeceasedCases: nationalWideDeceasedCases,
          totalConfirmedCases: nationalWideConfirmedCases,
        },
        isLoading: false,
        statesInfo: states,
      })
    }
  }

  onSearch = event => {
    const searchItem = event.target.value
    const searchResult = statesList.filter(data =>
      data.state_name.toLowerCase().includes(searchItem.toLowerCase()),
    )

    return this.setState({
      search: event.target.value,
      filteredSearchList: searchResult,
    })
  }

  showSearchList = () => {
    const {filteredSearchList} = this.state

    return (
      <ul
        className="search__result__container"
        testid="searchResultsUnorderedList"
      >
        {filteredSearchList.map(each => (
          <SearchResult
            key={each.state_code}
            stateName={each.state_name}
            stateCode={each.state_code}
            id={each.state_code}
          />
        ))}
      </ul>
    )
  }

  renderAllNationalData = () => {
    const {caseStats} = this.state

    return (
      <>
        {chartTypes
          .filter(el => el.type !== 'tested')
          .map(el => (
            <div
              testid={`countryWide${el.capital}Cases`}
              className="stats__block__column"
              key={el.type}
            >
              <p className={`stats__title ${el.statColor}`}>{el.capital}</p>
              <img
                src={el.statPic}
                className="stats__icon"
                alt={`country wide ${el.type} cases pic`}
              />
              <p className={`stats__number ${el.statColor}`}>
                {caseStats[`total${el.capital}Cases`]}
              </p>
            </div>
          ))}
      </>
    )
  }

  sortButtonClicked = () => {
    const {statesInfo} = this.state
    const sortedList = statesInfo.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x > y ? 1 : -1
    })
    this.setState({statesInfo: sortedList})
  }

  rsortButtonClicked = () => {
    const {statesInfo} = this.state
    const sortedList = statesInfo.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x < y ? 1 : -1
    })
    this.setState({statesInfo: sortedList})
  }

  renderLoader = () => (
    <div
      className="products-details-loader-container loader-container"
      testid="homeRouteLoader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllStates = () => {
    const {statesInfo} = this.state
    return (
      <div className="all-states-table" testid="stateWiseCovidDataTable">
        <div className="table-header">
          <div className="state-name-heading">
            <button
              className="order"
              type="button"
              testid="ascendingSort"
              onClick={this.sortButtonClicked}
            >
              <FcGenericSortingAsc className="order-icon" />
            </button>
            <p className="table-header-title ">States/UT</p>
            <button
              className="order"
              type="button"
              testid="descendingSort"
              onClick={this.rsortButtonClicked}
            >
              <FcGenericSortingDesc className="order-icon" />
            </button>
          </div>
          {chartTypes
            .filter(el => el.type !== 'tested')
            .map(el => (
              <div className="other-tables-bar" key={el.type}>
                <p className="table-header-title">
                  {el.type.charAt(0).toUpperCase() + el.type.slice(1)}
                </p>
              </div>
            ))}
          <div className="other-tables-bar">
            <p className="table-header-title">Population</p>
          </div>
          <div className="other-tables-bar">
            <p className="table-header-title">Others</p>
          </div>
        </div>
        <div className="state-wise-data-container">
          <ul className="other-tables">
            {statesInfo.map(each => (
              <StatsCards key={each.stateCode} data={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  removeFilteredList = () => {
    this.setState({filteredSearchList: []})
  }

  render() {
    const {isLoading, filteredSearchList, search} = this.state
    const showSearchList =
      filteredSearchList.length !== 0 && this.showSearchList()
    return (
      <>
        <Header />
        <div className="home__container">
          <div className="home__content__container">
            <div className="search__container">
              <BsSearch testid="searchIcon" className="search__icon" />
              <input
                type="search"
                placeholder="Enter the State"
                className="search__bar"
                onChange={this.onSearch}
                onAbort={this.removeFilteredList}
              />
            </div>
            {search.length > 0 ? showSearchList : ''}
            {isLoading ? (
              this.renderLoader()
            ) : (
              <div className="dataview">
                <div className="country__stats">
                  {this.renderAllNationalData()}
                </div>
                <div className="state__table">{this.renderAllStates()}</div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
