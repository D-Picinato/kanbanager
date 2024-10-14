import './styles.scss'
import { useState } from 'react'

/**
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props
 */

export default function Input({ idname, label, bgFill, onChange, ...props }) {
  const [currentValue, setCurrentValue] = useState()

  return <div className={"Input" + (bgFill ? ' fill' : '')}>
    <input
      id={idname}
      name={idname}
      onChange={(e) => {
        setCurrentValue(e.target.value)
        if (onChange) onChange(e)
      }}
      {...props}
    />
    <div className={'label' + (currentValue ? ' valued' : '')}>
      <label htmlFor={idname}>{label}</label>
    </div>
  </div>
}