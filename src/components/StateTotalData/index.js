import {Component} from 'react'
import {chartTypes} from '../Charts'
import './index.css'

class StateTotalData extends Component {
  state = {
    caseData: {
      confirmed: 0,
      recovered: 0,
      active: 0,
      deceased: 0,
    },
  }

  componentDidMount() {
    this.getStateData()
  }

  getStateData = async () => {
    const {eachStateTotalData} = this.props
    const stat = {
      confirmed: eachStateTotalData.confirmed,
      recovered: eachStateTotalData.recovered,
      deceased: eachStateTotalData.deceased,
      active:
        eachStateTotalData.confirmed -
        eachStateTotalData.recovered -
        eachStateTotalData.deceased,
    }

    this.setState({
      caseData: stat,
    })
  }

  getTotal = value => {
    const {onGetCategory} = this.props
    onGetCategory(value)
  }

  render() {
    const {active} = this.props
    console.log(active)
    const itActiveOnLoad = active ? 'confirmed__block' : ''
    const {caseData} = this.state
    return (
      <>
        <ul className="ul__list__each__state ">
          {chartTypes
            .filter(el => el.type !== 'tested')
            .map(el => (
              <li
                className={`category__item ${el.type} ${
                  el.type === 'confirmed' ? itActiveOnLoad : ''
                } `}
                tabIndex="-1"
                key={el.type}
                value={el.capital}
                onClick={() => this.getTotal(el.capital)}
              >
                <div testid={`stateSpecific${el.capital}CasesContainer`}>
                  <p className="stats__title">{el.capital}</p>
                  <img
                    src={el.statPic}
                    alt={`state specific ${el.type} cases pic`}
                    className="stats__icon"
                  />
                  <p className="stats__number">{caseData[el.type]}</p>
                </div>
              </li>
            ))}
        </ul>
      </>
    )
  }
}
export default StateTotalData
