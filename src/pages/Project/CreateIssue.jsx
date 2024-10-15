import { useEffect } from "react"
import useAppContext from "../../contexts/AppContext"
import { Link } from "react-router-dom"

export default function ProjectCreateIssue() {
  const { project, setPath } = useAppContext()

  useEffect(() => {
    setPath(<span><Link to='/'>Projetos</Link> / {project.name} / Criar Issue</span>)
  }, [project])

  return <>
    <div className="titlePage">
      <h2>Criar Issue</h2>
    </div>
  </>
}