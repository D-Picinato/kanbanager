import { useEffect } from "react"
import useAppContext from "../../contexts/AppContext"

export default function SettingsPage() {
  const { setPath } = useAppContext()

  useEffect(() => {
    setPath('Configurações')
  }, [])

  return <></>
}