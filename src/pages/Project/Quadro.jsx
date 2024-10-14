import { useEffect } from "react"
import useAppContext from "../../contexts/AppContext"
import { Link } from "react-router-dom"

export default function ProjectQuadro() {
  const { project, setPath } = useAppContext()

  useEffect(() => {
    if (project) {
      setPath(<span><Link to='/'>Projetos</Link> / {project.name} / Quadro</span>)
    }
  }, [project])

  return <>
    <div className="titlePage">
      <h2>Quadro</h2>
      <p>Gerencie suas tarefas visualmente com o Quadro, organizando facilmente suas issues com as colunas</p>
    </div>
  </>
}