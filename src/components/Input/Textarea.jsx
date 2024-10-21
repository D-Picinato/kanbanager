import './styles.scss'
import { useEffect, useRef, useState } from 'react'

/**
 * @param {React.TextareaHTMLAttributes<HTMLTextAreaElement>} props
 */

export default function Textarea({ idname, label, bgFill, onChange, ...props }) {
  const [currentValue, setCurrentValue] = useState(props.defaultValue)
  const textareaRef = useRef()

  const autoHeight = () => {
    textareaRef.current.style.height = '16rem'
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }

  useEffect(() => {
    if (textareaRef.current) {
      autoHeight()
    }
  }, [currentValue])

  return <div className={"Textarea" + (bgFill ? ' fill' : '')}>
    <textarea
      ref={textareaRef}
      id={idname}
      name={idname}
      onChange={e => {
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