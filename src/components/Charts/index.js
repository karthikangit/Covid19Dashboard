import {Component} from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'

export const chartTypes = [
  {
    type: 'confirmed',
    barchartColor: '#9A0E31',
    graphColor: '#FF073A',
    capital: 'Confirmed',
    statColor: 'red',
    statPic:
      'https://res.cloudinary.com/amst/image/upload/v1639929248/conf_cof3e9.jpg',
  },
  {
    type: 'active',
    capital: 'Active',
    barchartColor: '#0A4FA0',
    graphColor: '#007BFF',
    statColor: 'blue',
    statPic:
      'https://res.cloudinary.com/amst/image/upload/v1639929248/act_kq7nfx.jpg',
  },
  {
    type: 'recovered',
    capital: 'Recovered',
    barchartColor: '#216837',
    graphColor: '#27A243',
    statColor: 'green',
    statPic:
      'https://res.cloudinary.com/amst/image/upload/v1639929248/uyf_ndpqov.jpg',
  },
  {
    type: 'deceased',
    capital: 'Deceased',
    barchartColor: '#474C57',
    graphColor: '#6C757D',
    statColor: 'gray',
    statPic:
      'https://res.cloudinary.com/amst/image/upload/v1639929248/dese_tgak4e.jpg',
  },
  {
    type: 'tested',
    capital: 'Tested',
    barchartColor: '#0A4FA0',
    graphColor: '#9673B9',
    statColor: '',
    statPic: '',
  },
]

const Graph = ({type, color, forOtherChart}) => (
  <div>
    <LineChart
      width={800}
      height={250}
      data={forOtherChart}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}
    >
      <XAxis
        dataKey="date"
        style={{
          fontFamily: 'Roboto',
          fontWeight: 500,
          textTransform: 'uppercase',
        }}
        dy={10}
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={type} stroke={color} />
    </LineChart>
  </div>
)

const BarChartDiv = ({allData, category}) => {
  const barChartType = category.toLowerCase()

  const toptendata = allData.slice(Math.max(allData.length - 10, 0))
  console.log(chartTypes.find(el => el.type === category))
  const colortype =
    chartTypes.find(el => el.type === barChartType)?.barchartColor || '#9A0E31'
  console.log(colortype, category)
  return (
    <div className="chart__wrapper">
      <BarChart width={700} height={450} data={toptendata} barSize={45}>
        <XAxis
          dataKey="date"
          stroke={`${colortype}`}
          style={{
            fontFamily: 'Roboto',
            fontWeight: 500,
            textTransform: 'uppercase',
          }}
          dy={10}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={`${barChartType}`}
          fill={`${colortype}`}
          label={{position: 'top', fill: '#fff'}}
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </div>
  )
}

class Charts extends Component {
  state = {
    allData: '',
    forOtherChart: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {stateCode} = this.props

    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data`,
      {
        method: 'GET',
      },
    )
    if (response.ok) {
      const data = await response.json()

      const dataDateWise = Object.keys(data[stateCode].dates)

      const particularState = dataDateWise.map(date => ({
        date,
        confirmed: data[stateCode].dates[date].total.confirmed,
        deceased: data[stateCode].dates[date].total.deceased,
        recovered: data[stateCode].dates[date].total.recovered,
        tested: data[stateCode].dates[date].total.tested,
        active:
          data[stateCode].dates[date].total.confirmed -
          (data[stateCode].dates[date].total.deceased +
            data[stateCode].dates[date].total.recovered),
      }))

      const particularStateForOtherChart = dataDateWise.map(date => ({
        date,
        confirmed: data[stateCode].dates[date].total.confirmed,
        deceased: data[stateCode].dates[date].total.deceased,
        recovered: data[stateCode].dates[date].total.recovered,
        tested: data[stateCode].dates[date].total.tested,
        active:
          data[stateCode].dates[date].total.confirmed -
          (data[stateCode].dates[date].total.deceased +
            data[stateCode].dates[date].total.recovered),
      }))

      this.setState({
        allData: particularState,
        forOtherChart: particularStateForOtherChart,
        isLoading: false,
      })
    }
  }

  renderLoader = () => (
    <div
      className="products-details-loader-container"
      testid="timelinesDataLoader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  allCharts = () => {
    const {forOtherChart, allData} = this.state
    const {category} = this.props
    return (
      <>
        <div className="barchart__container">
          <BarChartDiv allData={allData} category={category} />
        </div>

        <h1 className="charts__title">Spread Trends</h1>
        <div testid="lineChartsContainer" className="barcharts__container">
          {chartTypes.map(el => (
            <div className={`charts ${el.type}__background`} key={el.type}>
              <Graph
                forOtherChart={forOtherChart}
                color={el.graphColor}
                type={el.type}
              />
            </div>
          ))}
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    const showAllData = isLoading ? this.renderLoader() : this.allCharts()
    return <div className="charts__container">{showAllData}</div>
  }
}

export default Charts
