class ProjectModel {
  #list

  // Recupera a lista de projetos do localStorage e atribui à `#list`
  constructor() {
    this.#list = JSON.parse(localStorage.getItem('projects') || '[]')
  }

  // Método para salvar a lista de projetos `#list` no localStorage
  #saveList = () => {
    localStorage.setItem('projects', JSON.stringify(this.#list))
  }

  // Método para criar um projeto
  create = e => {
    const formData = new FormData(e.target)

    this.#list.push({
      id: `${formData.get('name')}-${Date.now()}${Math.random()}`,
      name: formData.get('name'),
      description: formData.get('description'),
      stages: [
        {
          id: `${formData.get('name')}-stage-${Date.now()}${Math.random()}`,
          name: 'A Fazer',
        },
        {
          id: `${formData.get('name')}-stage-${Date.now()}${Math.random()}`,
          name: 'Em andamento',
        },
        {
          id: `${formData.get('name')}-stage-${Date.now()}${Math.random()}`,
          name: 'Concluído',
        }
      ],
      issues: []
    })

    this.#saveList()
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

    this.#saveList()
  }

  // Método para atualizar um projeto
  update = (projectId, obj) => {
    this.#list = this.#list.map(item => {
      if (item.id == projectId) {
        return { ...item, ...obj }
      }

      return item
    })

    this.#saveList()
  }

  // Método para gerar e baixar um arquivo JSON do projeto
  exportFile = projectId => {
    const project = this.get(projectId)
    const blob = new Blob([JSON.stringify(project)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${project.name}.kanbanager`
    a.click()
    URL.revokeObjectURL(URL.createObjectURL(blob))
  }

  // Método para importar um arquivo JSON com o projeto
  importFile = obj => {
    if (!this.get(obj.id)) {
      this.#list.push(obj)
      this.#saveList()
    } else {
      alert('Você já possui esse projeto!')
    }
  }
}

const projectModel = new ProjectModel()
export default projectModel