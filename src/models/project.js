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
  save = e => {
    const formData = new FormData(e.target)

    this.#list.push({
      id: `${formData.get('name')}-${Date.now()}${Math.random()}`,
      name: formData.get('name'),
      description: formData.get('description')
    })

    this.#saveStorage()
  }

  // Método para listar os projetos
  list = () => {
    return this.#list
  }

  // Método para recuperar um projeto
  get = (id) => {
    return this.#list.filter(item => item.id == id)[0]
  }

  // Método para remover um projeto
  remove = id => {
    this.#list = this.#list.filter(item => item.id != id)

    this.#saveStorage()
  }
}

const projectModel = new ProjectModel()
export default projectModel