import { useEffect, useState } from "react"
import useAppContext from "../../contexts/AppContext"
import { Link } from "react-router-dom"
import Input from "../../components/Input/Input"
import Dropdown from "../../components/Dropdown"
import StageModel from "../../models/stageModel"
import IssueModel from "../../models/issueModel"
import { HiBars3, HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineTrash, HiXMark } from "react-icons/hi2"
import PriorityIcon from "../../components/PriorityIcon"

export default function ProjectQuadro() {
  const { project, setPath } = useAppContext()
  const [stageModel, setStageModel] = useState(new StageModel(project.id))
  const [issueModel, setIssueModel] = useState(new IssueModel(project.id))

  useEffect(() => {
    setPath(
      <span>
        <Link to="/">Projetos</Link> / {project.name} / Quadro
      </span>
    )

    const mainElement = document.querySelector("main")

    if (mainElement) {
      const handleScroll = e => {
        e.preventDefault()
        mainElement.scrollLeft += e.deltaY
      }

      mainElement.addEventListener("wheel", handleScroll)

      return () => {
        mainElement.removeEventListener("wheel", handleScroll)
      }
    }
  }, [project])

  const handleCreateStage = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    stageModel.create(formData.get("name"))
    setStageModel(new StageModel(project.id))
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
            </div>
            <Dropdown icon={<HiBars3 />} justify="left" align="bottom" autoHide>
              <div className="grid-row no-gap">
                {i > 0 ? (
                  <button
                    className="button normal toLeftButton"
                    onClick={() => {
                      stageModel.moveToLeft(stage.id)
                      setStageModel(new StageModel(project.id))
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
                      setStageModel(new StageModel(project.id))
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
                  setStageModel(new StageModel(project.id))
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
              <div key={issue.id} className="issueItem">
                <PriorityIcon high={issue.priority} />
                <span>{issue.name}</span>
              </div>
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