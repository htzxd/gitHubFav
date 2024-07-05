import { githubUser } from "./gitHubUser.js"

export class favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username) {
    try {
      
      const user = await githubUser.search(username)
      const UserExist = this.entries.find(entry => entry.login === username)
      
      if (UserExist) {
        throw new Error('user already register')
      }

      if (user.login === undefined) {
        throw new Error ('user not found')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()
      } catch (error) {
        alert(error.message)
      }
  }

  load(){
  this.entries = JSON.parse(localStorage
    .getItem('@github-favorites:')) || []
  }

  delete(user) {
    const filteredEntries = this.entries.
    filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
  }
}

export class favoritesView extends favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
    this.onAdd()
  }

  onAdd() {
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')

      this.add(value)
    }
  }
  
  update() {
    this.removeAllTr()

   this.entries.forEach(user => {
    const row = this.createRow()

    row.querySelector('.user img').src = `
    https://github.com/${user.login}.png`
    row.querySelector('.user img').alt = `image of ${user.name}`
    row.querySelector('.user p').textContent = user.name
    row.querySelector('.user a').href = `https://github.com/${user.login}`
    row.querySelector('.user span').textContent = user.login
    row.querySelector('.repos').textContent = user.public_repos   
    row.querySelector('.followers').textContent = user.followers    
    
    row.querySelector('.remove').onclick = () => {
      const isOk = confirm('are you sure you want delete it ? ') 
      
      if(isOk){
        this.delete(user)
      }
    }
    
    this.tbody.append(row)
   })

  
  }

  createRow() {
    const tr = document.createElement('tr')
    
    tr.innerHTML = `
        
        <td class="user">
          <img src="https://github.com/htzxd.png" alt="photograph de marco">
          <a href="https://github.com/htzxd" target="_blank">
          <p> Marco Pereira</p>
          <span>marcopereira</span>
        </td>
        <td class="repos">
          22
        </td>
        <td class="followers">
          4
        </td>
        <td>
          <button class="remove">&times;</button>
        </td>
  `
    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr')
    .forEach((tr) => {
      tr.remove()
    })
  }
}