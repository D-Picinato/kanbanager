import './styles.scss'
import { useState } from 'react'

/**
 * @param {React.InputHTMLAttributes} props
 */

export default function Input({ idname, label, onChange = () => { }, ...props }) {
  const [currentValue, setCurrentValue] = useState()

  return <div className="Input">
    <input id={idname} name={idname} onChange={(e) => { setCurrentValue(e.target.value); onChange(e) }} {...props} />
    <div className={'label' + (currentValue ? ' valued' : '')}>
      <label htmlFor={idname}>{label}</label>
    </div>
  </div>
}