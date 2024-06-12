function LabelInput({ label, value, onChange, ...rest }) {
  return (
    <div className="flex-col items-start">
      {label && <label>{label}</label>}
      <input value={value} onChange={onChange} {...rest} />
    </div>
  )
}

export default LabelInput;