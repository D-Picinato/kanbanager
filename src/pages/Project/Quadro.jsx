import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useAppContext from "../../contexts/AppContext"
import Input from "../../components/Input/Input"
import Issue from "../../components/Issue"
import Dropdown from "../../components/Dropdown"
import StageModel from "../../models/stageModel"
import IssueModel from "../../models/issueModel"
import { HiBars3, HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineTrash, HiXMark } from "react-icons/hi2"

export default function ProjectQuadro() {
  const { project, setPath } = useAppContext()
  const [stageModel, setStageModel] = useState(new StageModel(project.id))
  const [issueModel, setIssueModel] = useState(new IssueModel(project.id))

  useEffect(() => {
    setPath(<span><Link to='/'>Projetos</Link> / {project.data.name} / Quadro</span>)
  }, [project])

  const resetStageModel = () => {
    setStageModel(new StageModel(project.id))
    setIssueModel(new IssueModel(project.id))
  }

  const handleCreateStage = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    stageModel.create(formData.get("name"))
    resetStageModel()
    e.target.reset()
  }

  return stageModel && issueModel && <>
    <div className="titlePage">
      <h2>Quadro</h2>
      <p>
        Gerencie suas tarefas visualmente com o Quadro, organizando facilmente
        suas issues por etapas
      </p>
    </div>
    <div className="kanbanStages">
      {stageModel.list().map((stage, i) => (
        <section key={stage.id}>
          <div className="flex-row">
            <input
              name="name"
              autoComplete="off"
              className="inlineInput h3"
              type="text"
              defaultValue={stage.name}
              key={`input${stage.id}`}
              onChange={e =>
                stageModel.update(stage.id, { name: e.target.value })
              }
            />
            <Dropdown icon={<HiBars3 />} justify="left" align="bottom" buttonClass="button normal" autoHide>
              <div className="grid-row no-gap">
                {i > 0 ? (
                  <button
                    className="button normal toLeftButton"
                    onClick={() => {
                      stageModel.moveToLeft(stage.id)
                      resetStageModel()
                    }}
                  >
                    <HiOutlineArrowLeft />
                  </button>
                ) : (
                  <button className="button normal">
                    <HiXMark />
                  </button>
                )}
                {i < stageModel.list().length - 1 ? (
                  <button
                    className="button normal toRightButton"
                    onClick={() => {
                      stageModel.moveToRight(stage.id)
                      resetStageModel()
                    }}
                  >
                    <HiOutlineArrowRight />
                  </button>
                ) : (
                  <button className="button normal">
                    <HiXMark />
                  </button>
                )}
              </div>
              <button
                className="button red left"
                onClick={() => {
                  stageModel.remove(stage.id)
                  resetStageModel()
                }}
              >
                <HiOutlineTrash />
                <span>Remover</span>
              </button>
            </Dropdown>
          </div>
          <hr />
          <div className="issuesContainer">
            {issueModel.list().filter(issue => issue.idStageParent === stage.id).map(issue => (
              <Issue
                key={`${issue.id}${Math.random()}`}
                projectId={project.id}
                issueId={issue.id}
                resetCallback={resetStageModel}
              />
            ))}
          </div>
        </section>
      ))}
      <section className="newStage">
        <h3>Nova Etapa</h3>
        <hr />
        <form onSubmit={handleCreateStage} autoComplete="off">
          <Input required idname="name" label="Nome da etapa" />
          <button className="button primary">Criar</button>
        </form>
      </section>
    </div>
  </>
}