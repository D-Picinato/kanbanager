import './styles.scss'
import { useState } from 'react'

/**
 * @param {React.TextareaHTMLAttributes<HTMLTextAreaElement>} props
 */

export default function Textarea({ idname, label, bgFill, onChange, ...props }) {
  const [currentValue, setCurrentValue] = useState()

  return <div className={"Textarea" + (bgFill ? ' fill' : '')}>
    <textarea
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