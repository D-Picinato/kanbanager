import projectModel from "./projectModel"

export default class IssueModel {
  #projectId
  #list

  // Recupera a lista de issues do projeto referenciado pelo ID e atribui à `#list`
  constructor(projectId) {
    this.#projectId = projectId
    this.#list = projectModel.get(projectId).data.issues
  }

  // Método para salvar a lista de issues `#list` no projeto referenciado pelo ID
  #saveList = () => {
    projectModel.update(this.#projectId, { issues: this.#list })
  }

  // Método para criar uma issue
  create = ({ idStageParent, name, description, priority }) => {
    this.#list.push({
      id: `${Date.now()}${Math.random()}${Math.random()}`,
      idStageParent: idStageParent,
      name: name,
      description: description,
      priority: priority,
      creationDatetime: new Date(),
    })

    this.#saveList()
  }

  // Método para listar as issues
  list = () => {
    return this.#list
  }

  // Método para recuperar uma issue
  get = issueId => {
    return this.#list.filter(item => item.id == issueId)[0]
  }

  // Método para remover uma issue
  remove = issueId => {
    this.#list = this.#list.filter(item => item.id != issueId)

    this.#saveList()
  }

  // Método para atualizar uma issue
  update = (issueId, obj) => {
    this.#list = this.#list.map(item => {
      if (item.id == issueId) {
        return { ...item, ...obj }
      }

      return item
    })

    this.#saveList()
  }
}