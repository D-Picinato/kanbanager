import { useState, useEffect, useRef } from 'react'
import './styles.scss'

export default function Dropdown({ icon, children, justify, align }) {
  const [show, setShow] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (show) {
      const handleClick = e => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setShow(false)
        }
        setTimeout(() => setShow(false), 100)
      }

      document.addEventListener('mousedown', handleClick)

      return () => {
        document.removeEventListener('mousedown', handleClick)
      }
    }
  }, [show])

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