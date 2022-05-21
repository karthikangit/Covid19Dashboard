import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import FactsList from '../FactsList'
import FaqsList from '../FaqsList'
import Header from '../Header'
import './index.css'

class About extends Component {
  state = {
    isLoading: true,
    faqData: {},
    factsData: {},
  }

  componentDidMount() {
    this.getData()
  }

  renderLoader = () => (
    <>
      <div className="loader-container" testid="aboutRouteLoader">
        <Loader type="ThreeDots" color="blue" height="50" width="50" />
      </div>
    </>
  )

  getData = async () => {
    const response = await fetch('https://apis.ccbp.in/covid19-faqs', {
      method: 'GET',
    })
    if (response.ok) {
      const data = await response.json()
      const updateFactoidsData = data.factoids.map(each => ({
        banner: each.banner,
        id: each.id,
      }))
      const updateFaqsData = data.faq.map(each => ({
        answer: each.answer,
        category: each.category,
        qno: each.qno,
        question: each.question,
      }))

      this.setState({
        faqData: updateFaqsData,
        factsData: updateFactoidsData,
        isLoading: false,
      })
    } else {
      console.log('About Data error', response)
    }
  }

  renderAllData = () => {
    const {faqData, factsData} = this.state
    return (
      <>
        <ul testid="faqsUnorderedList" className="factlist">
          {faqData.map(each => (
            <FaqsList
              key={each.qno}
              answer={each.answer}
              question={each.question}
            />
          ))}
        </ul>

        <h1 className="vaccine__title">Facts</h1>
        <ul className="fact__list">
          {factsData.map(each => (
            <FactsList key={each.id} banner={each.banner} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="about__container">
          {isLoading ? (
            this.renderLoader()
          ) : (
            <div className="about___content__container">
              <h1 className="about__title">About</h1>
              <p className="about__content">
                Last update on December 25th 2021.
              </p>
              <p className="about__vaccine__title">
                COVID-19 vaccines be ready for distribution
              </p>
              <div className="fact__list">{this.renderAllData()}</div>
            </div>
          )}
        </div>

        <Footer />
      </>
    )
  }
}

export default About
