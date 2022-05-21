import './index.css'

const DistrictData = props => {
  const {number, name} = props

  return (
    <li className="list-style">
      <p className="district__data">{number}</p>
      <p className="district">{name}</p>
    </li>
  )
}

export default DistrictData
