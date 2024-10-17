import './styles.scss'
import { useEffect, useState } from "react"
import { FaAngleDoubleDown, FaAngleDoubleUp, FaAngleDown, FaAngleUp, FaEquals } from "react-icons/fa"

/**
 * @param {{ high?: 1 | 2 | 3 | 4 | 5 }} props
 */
export default function PriorityIcon({ high }) {
  const [icon, setIcon] = useState()

  useEffect(() => {
    switch (high) {
      case 5:
        setIcon(<FaAngleDoubleUp color="#cc0000" />)
        break
      case 4:
        setIcon(<FaAngleUp color="#cc8000" />)
        break
      case 2:
        setIcon(<FaAngleDown color="#0080cc" />)
        break
      case 1:
        setIcon(<FaAngleDoubleDown color="#0000cc" />)
        break
      default:
        setIcon(<FaEquals color="#cccc00" />)
        break
    }
  }, [high])

  return <div className="PriorityIcon">{icon}</div>
}