import { useEffect, useState } from "react"
import useAppContext from "../../contexts/AppContext"
import { Link, useNavigate } from "react-router-dom"
import Input from "../../components/Input/Input"
import Textarea from "../../components/Input/Textarea"
import Dropdown from "../../components/Dropdown"
import PriorityIcon from "../../components/PriorityIcon"
import StageModel from "../../models/stageModel"
import IssueModel from "../../models/issueModel"

export default function ProjectCreateIssue() {
  const { project, setPath } = useAppContext()
  const [stageModel] = useState(new StageModel(project.id))
  const [issueModel] = useState(new IssueModel(project.id))
  const [prioritySelect, setPrioritySelect] = useState(3)
  const [idStageParent, setIdStageParent] = useState(stageModel.list()[0].id)
  const navigate = useNavigate()

  useEffect(() => {
    setPath(<span><Link to='/'>Projetos</Link> / {project.name} / Criar Issue</span>)
  }, [project])

  const handleCreateIssue = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    issueModel.create({
      idStageParent: idStageParent,
      name: formData.get('name'),
      description: formData.get('description'),
      priority: prioritySelect,
    })
    navigate(`/projects/${project.id}`)
  }

  return <>
    <div className="titlePage">
      <h2>Criar Issue</h2>
      <p>Crie uma issue para registrar tarefas e gerenciar responsabilidades no seu projeto</p>
    </div>
    <div className="flex-col">
      <section className="mini">
        <h3>Inicie sua Issue</h3>
        <hr />
        <form onSubmit={handleCreateIssue}>
          <Input required type="text" label='Nome da issue' idname='name' />
          <Textarea label='Descrição' idname='description' />
          <div className="grid-row">
            <div className="flex-row no-gap">
              <p>Nível de prioridade:</p>
              <Dropdown
                icon={<PriorityIcon high={prioritySelect} />}
                buttonClass='button normal'
                justify="right"
                autoHide
              >
                <button type="button" className="button normal left" onClick={() => setPrioritySelect(5)}><PriorityIcon high={5} /><span>Altíssima</span></button>
                <button type="button" className="button normal left" onClick={() => setPrioritySelect(4)}><PriorityIcon high={4} /><span>Alta</span></button>
                <button type="button" className="button normal left" onClick={() => setPrioritySelect(3)}><PriorityIcon high={3} /><span>Média</span></button>
                <button type="button" className="button normal left" onClick={() => setPrioritySelect(2)}><PriorityIcon high={2} /><span>Baixa</span></button>
                <button type="button" className="button normal left" onClick={() => setPrioritySelect(1)}><PriorityIcon high={1} /><span>Baixíssima</span></button>
              </Dropdown>
            </div>
            <div className="flex-row no-gap">
              <p>Etapa:</p>
              <Dropdown
                icon={<p>{stageModel.get(idStageParent).name}</p>}
                buttonClass='button normal'
                justify="right"
                autoHide
              >
                {stageModel.list().map(stage => (
                  <button type="button" className="button normal left" onClick={() => setIdStageParent(stage.id)}>{stage.name}</button>
                ))}
              </Dropdown>
            </div>
          </div>
          <div className="grid-row">
            <button className="button primary">Criar</button>
          </div>
        </form>
      </section>
    </div>
  </>
}