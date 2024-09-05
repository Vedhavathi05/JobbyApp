import './index.css'

const SalaryList = props => {
  const {details, onChangeSalaryRange} = props
  const {label, salaryRangeId} = details

  const onRadioChange = () => {
    onChangeSalaryRange(salaryRangeId)
  }

  return (
    <div>
      <input type="radio" id={salaryRangeId} onChange={onRadioChange} />
      <label htmlFor={salaryRangeId} className="label-coloring">
        {label}
      </label>
    </div>
  )
}

export default SalaryList
