import React from "react"
import './styles.scss'

/**
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */

export default function Button({ children, className, ...props }) {
  return <button className={'Button' + (className ? ` ${className}` : '')} {...props}>
    {children}
  </button>
}