class Projects {
  #list

  constructor() {
    this.#list = JSON.parse(localStorage.getItem('projects') || '[]')
  }

  saveStorage = () => {
    localStorage.setItem('projects', JSON.stringify(this.#list))
  }

  list = () => {
    return this.#list
  }

  save = e => {
    const formData = new FormData(e.target)

    this.#list.push({
      id: `${formData.get('name')}-${Date.now()}-${Math.random()}`,
      name: formData.get('name'),
      description: formData.get('description')
    })

    this.saveStorage()
  }

  remove = id => {
    this.#list = this.#list.filter(item => item.id != id)
    this.saveStorage()
  }
}

const projects = new Projects()

export default projects