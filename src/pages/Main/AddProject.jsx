import { HiOutlineChevronRight } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import useAppContext from "../../contexts/AppContext"

import Input from "../../components/Input"

import projectModel from '../../models/project'

export default function AddProject() {
  const navigate = useNavigate()
  const { setPath } = useAppContext()

  useEffect(() => {
    setPath('Adicionar Projeto')
  }, [])

  const projectSubmit = e => {
    e.preventDefault()
    projectModel.save(e)
    navigate('/')
  }

  return <>
    <div className="titlePage">
      <h2>Adicionar Projeto</h2>
      <p>Crie ou importe um projeto Kanban para otimizar seu fluxo de trabalho</p>
    </div>
    <form className="flex-row" onSubmit={projectSubmit} autoComplete="off">
      <Input required idname='name' label='Nome do projeto' />
      <button>
        <span>Criar</span>
        <HiOutlineChevronRight />
      </button>
    </form>
  </>
}