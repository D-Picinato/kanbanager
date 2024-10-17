import { useState, useEffect, useRef, Children, cloneElement } from 'react'
import './styles.scss'

/**
 * @param {{
 *  icon: JSX.Element,
 *  children: React.ReactNode,
 *  buttonClass: String,
 *  justify?: 'left' | 'center' | 'right'
 *  align?: 'top' | 'center' | 'bottom'
 *  autoHide?: boolean
 * }} props
 */
export default function Dropdown({ icon, children, buttonClass, justify = 'left', align = 'center', autoHide = false }) {
  const [show, setShow] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (show) {
      const handleClick = e => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setShow(false)
        }
      }

      document.addEventListener('mousedown', handleClick)

      return () => {
        document.removeEventListener('mousedown', handleClick)
      }
    }
  }, [show])

  const handleChildClick = (e, originalOnClick) => {
    if (originalOnClick) originalOnClick(e)
    if (autoHide) setShow(false)
  }

  const clonedChildren = Children.map(children, (child) =>
    cloneElement(child, { onClick: e => handleChildClick(e, child.props.onClick) })
  )

  return (
    <div className="Dropdown" ref={dropdownRef}>
      <button className={buttonClass} type='button' onClick={() => setShow(!show)}>
        <div className="iconContainer">
          {icon}
        </div>
      </button>
      {show && (
        <div className={'floatContainer' + ` justify-${justify}` + ` align-${align}`}>
          <div className="container">
            {clonedChildren}
          </div>
        </div>
      )}
    </div>
  )
}