import { useEffect } from "react"
import useAppContext from "../../contexts/AppContext"
import { Link, useNavigate } from "react-router-dom"
import Input from "../../components/Input/Input"
import Textarea from "../../components/Input/Textarea"
import useModalContext from "../../contexts/ModalContext"
import { HiOutlineDocumentArrowDown, HiOutlineTrash } from "react-icons/hi2"
import projectModel from "../../models/projectModel"

export default function ProjectSettings() {
  const { setProject, project, setPath } = useAppContext()
  const { setShowModal, setTitle, setContent, setActionButton } = useModalContext()
  const navigate = useNavigate()

  useEffect(() => {
    setPath(<span><Link to='/'>Projetos</Link> / {project.data.name} / Configurações</span>)
  }, [project])

  const handleRemoveProject = (projectId) => {
    projectModel.remove(projectId)
    setShowModal(false)
    navigate('/')
  }

  const handleProjectUpdate = e => {
    e.preventDefault()
    const formData = new FormData(e.target)

    projectModel.update(project.id, {
      name: formData.get('name'),
      description: formData.get('description')
    })

    setProject(projectModel.get(project.id))
  }

  return <>
    <div className="titlePage">
      <h2>Configurações</h2>
      <p>Gerencie as configurações do seu projeto aqui</p>
    </div>
    <div className="flex-col">
      <section className="mini">
        <h3>Detalhes do Projeto</h3>
        <hr />
        <form autoComplete="off" onSubmit={handleProjectUpdate}>
          <Input idname='name' label='Nome do projeto' defaultValue={project.data.name} />
          <Textarea idname='description' label='Descrição' defaultValue={project.data.description} />
          <button className="button primary">Atualizar</button>
        </form>
      </section>
    </div>
    <div className="flex-col">
      <section className="mini">
        <h3>Ações</h3>
        <hr />
        <div className="grid-row">
          <button className="button normal border" onClick={() => projectModel.exportFile(project.id)}>
            <HiOutlineDocumentArrowDown />
            <span>Exportar</span>
          </button>
          <button
            className="button red border"
            onClick={() => {
              setTitle('Excluir Projeto')
              setContent(<span>Deseja mesmo excluir esse projeto?</span>)
              setShowModal(true)
              setActionButton(<button className="button red" onClick={() => handleRemoveProject(project.id)}>Remover</button>)
            }}
          >
            <HiOutlineTrash />
            <span>Excluir</span>
          </button>
        </div>
      </section>
    </div>
  </>
}