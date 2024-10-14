import { Outlet } from "react-router-dom"
import { useNavContext } from "../../contexts/NavContext"
import { useEffect } from "react"

export default function MainOutlet() {
  const { setNavIndex } = useNavContext()

  useEffect(() => {
    setNavIndex('main')
  }, [])

  return <Outlet />
}