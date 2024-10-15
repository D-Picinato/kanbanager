import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import useAppContext from "../../contexts/AppContext"
import Input from "../../components/Input/Input"
import projectModel from '../../models/projectModel'

export default function AddProject() {
  const navigate = useNavigate()
  const { setPath } = useAppContext()
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    setPath('Adicionar Projeto')
  }, [])

  const handleDragOver = e => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  const handleDrop = e => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    handleFileImport(file)
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    handleFileImport(file)
  }

  const handleFileImport = file => {
    if (file && file.name.endsWith('.kanbanager')) {
      const reader = new FileReader()
      reader.onload = e => {
        try {
          const projectOjb = JSON.parse(e.target.result)
          projectModel.importFile(projectOjb)
          navigate('/')
        } catch (error) {
          console.error("Erro ao importar o projeto:", error)
        }
      }
      reader.readAsText(file)
    } else {
      alert("Por favor, insira um arquivo .kanbanager válido.")
    }
  }

  const handleProjectSubmit = e => {
    e.preventDefault()
    projectModel.create(e)
    navigate('/')
  }

  return (
    <>
      <div className="titlePage">
        <h2>Adicionar Projeto</h2>
        <p>Crie ou importe um projeto Kanban e otimize seu fluxo de trabalho</p>
      </div>
      <div className="grid-row">
        <section>
          <h3>Crie um Projeto</h3>
          <hr />
          <form onSubmit={handleProjectSubmit} autoComplete="off">
            <Input required idname='name' label='Nome do projeto' />
            <Input idname='description' label='Descrição' />
            <button className="button primary">
              <span>Criar</span>
              <MdOutlineKeyboardArrowRight />
            </button>
          </form>
        </section>
        <section>
          <h3>Ou Importe um Projeto</h3>
          <hr />
          <div
            className={`file-drop-area ${dragActive ? 'active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p>Solte um arquivo .kanbanager aqui ou</p>
            <input type="file" accept=".kanbanager" onChange={handleFileChange} />
            <button type="button" className="button">Selecione o arquivo</button>
          </div>
        </section>
      </div>
    </>
  )
}