class ProjectModel {
  #list

  // Recupera a lista de projetos do localStorage e atribui à `#list`
  constructor() {
    this.#list = JSON.parse(localStorage.getItem('projects') || '[]')
  }

  // Método para salvar a lista de projetos `#list` no localStorage
  #saveStorage = () => {
    localStorage.setItem('projects', JSON.stringify(this.#list))
  }

  // Método para criar um projeto
  create = e => {
    const formData = new FormData(e.target)

    this.#list.push({
      id: `${formData.get('name')}-${Date.now()}${Math.random()}`,
      name: formData.get('name'),
      description: formData.get('description'),
      columns: [
        {
          name: 'Backlog'
        },
        {
          name: 'Em andamento'
        },
        {
          name: 'Concluído'
        }
      ]
    })

    this.#saveStorage()
  }

  // Método para listar os projetos
  list = () => {
    return this.#list
  }

  // Método para recuperar um projeto
  get = projectId => {
    return this.#list.filter(item => item.id == projectId)[0]
  }

  // Método para remover um projeto
  remove = projectId => {
    this.#list = this.#list.filter(item => item.id != projectId)

    this.#saveStorage()
  }
}

const projectModel = new ProjectModel()
export default projectModel