import IssueModel from "./issueModel"
import projectModel from "./projectModel"

export default class StageModel {
  #projectId
  #list

  // Recupera a lista de stages do projeto referenciado pelo ID e atribui à `#list`
  constructor(projectId) {
    this.#projectId = projectId
    this.#list = projectModel.get(projectId).data.stages
  }

  // Método para salvar a lista de stages `#list` no projeto referenciado pelo ID
  #saveList = () => {
    projectModel.update(this.#projectId, { stages: this.#list })
  }

  // Método para criar um stage
  create = name => {
    this.#list.push({
      id: `${Date.now()}${Math.random()}${Math.random()}`,
      name: name,
    })

    this.#saveList()
  }

  // Método para listar os stages
  list = () => {
    return this.#list
  }

  // Método para recuperar um stage
  get = stageId => {
    return this.#list.filter(item => item.id == stageId)[0]
  }

  // Método para remover um stage
  remove = stageId => {
    const issueModel = new IssueModel(this.#projectId)

    issueModel.list().map(issue => {
      if (issue.idStageParent === stageId) {
        issueModel.update(issue.id, { idStageParent: null })
      }
    })

    this.#list = this.#list.filter(item => item.id != stageId)

    this.#saveList()
  }

  // Método para atualizar um stage
  update = (stageId, obj) => {
    this.#list = this.#list.map(item => {
      if (item.id == stageId) {
        return { ...item, ...obj }
      }

      return item
    })

    this.#saveList()
  }

  // Método para mover o stage para a direita
  moveToRight = stageId => {
    const index = this.#list.findIndex(stage => stage.id === stageId)
    if (index < this.#list.length - 1) {
      [this.#list[index], this.#list[index + 1]] = [this.#list[index + 1], this.#list[index]]
      this.#saveList()
    }
  }

  // Método para mover o stage para a esquerda
  moveToLeft = stageId => {
    const index = this.#list.findIndex(stage => stage.id === stageId)
    if (index > 0) {
      [this.#list[index], this.#list[index - 1]] = [this.#list[index - 1], this.#list[index]]
      this.#saveList()
    }
  }
}