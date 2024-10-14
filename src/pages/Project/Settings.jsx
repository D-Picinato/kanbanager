import { useEffect } from "react"
import useAppContext from "../../contexts/AppContext"
import { Link } from "react-router-dom"

export default function ProjectSettings() {
  const { project, setPath } = useAppContext()

  useEffect(() => {
    if (project) {
      setPath(<span><Link to='/'>Projetos</Link> / {project.name} / Configurações</span>)
    }
  }, [project])

  return <>
    <div className="titlePage">
      <h2>Configurações</h2>
    </div>
  </>
}