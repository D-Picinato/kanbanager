import { useState } from 'react'
import './styles.scss'

export default function Dropdown({ icon, children }) {
  const [show, setShow] = useState(false)

  return <div className="Dropdown">
    <button onClick={() => setShow(!show)}>
      {icon}
    </button>
    <div className="floatContainer">
      {children}
    </div>
  </div>
}