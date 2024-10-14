import { useState, useEffect, useRef } from 'react'
import './styles.scss'

export default function Dropdown({ icon, children, justify, align }) {
  const [show, setShow] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div className="Dropdown" ref={dropdownRef}>
      <button onClick={() => setShow(!show)}>
        <div className="iconContainer">
          {icon}
        </div>
      </button>
      {show && (
        <div className={'floatContainer' + ` justify-${justify}` + ` align-${align}`}>
          <div className="container">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}