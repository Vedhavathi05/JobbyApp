import './index.css'

const TypeOfEmployment = props => {
  const {details, onChangeEmploymentType} = props
  const {label, employmentTypeId} = details
  console.log(label)
  const onCheckboxChange = event => {
    const isChecked = event.target.checked
    onChangeEmploymentType(employmentTypeId, isChecked)
  }
  return (
    <div>
      <input
        type="checkbox"
        id={employmentTypeId}
        onChange={onCheckboxChange}
      />
      <label htmlFor={employmentTypeId} className="label-coloring">
        {label}
      </label>
    </div>
  )
}

export default TypeOfEmployment
