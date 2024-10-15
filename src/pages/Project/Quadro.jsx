import { useEffect } from "react"
import useAppContext from "../../contexts/AppContext"
import { Link } from "react-router-dom"

export default function ProjectQuadro() {
  const { project, setPath } = useAppContext()

  useEffect(() => {
    setPath(<span><Link to='/'>Projetos</Link> / {project.name} / Quadro</span>)
  }, [project])

  return <>
    <div className="titlePage">
      <h2>Quadro</h2>
      <p>Gerencie suas tarefas visualmente com o Quadro, organizando facilmente suas issues por estágios</p>
    </div>
    <div className="kanbanStages">
      {project.stages && project.stages.map(stage => (
        <section key={stage.id}>
          <h3>{stage.name}</h3>
          <hr />
          <div className="issuesContainer">
            <div className="issue">
            </div>
          </div>
        </section>
      ))}
    </div>
  </>
}