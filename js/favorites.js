export class favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load(){
    this.entries =[{
      login: 'htzxd',
      user: "Marco Pereira",
      public_repositories: '22',
      followers: '4'
    },
    {
      login: 'esterzanato',
      user: "Ester Zanato",
      public_repositories: '10',
      followers: '10'
    }
  ]
  }
}

export class favoritesView extends favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
  }
  
  update() {
    this.removeAllTr()

   this.entries.forEach(user => {
    const row = this.createRow()

    row.querySelector('.user img').src = `
    https://github.com/${user.login}.png`
    row.querySelector('.user img').alt = `image of ${user.name}`
    row.querySelector('.user p').textContent = user.name
    row.querySelector('.user span').textContent = user.login
    row.querySelector('.repositories').textContent = user.public_repositories    
    row.querySelector('.followers').textContent = user.followers    
    this.tbody.append(row)
   })

  
  }

  createRow() {
    const tr = document.createElement('tr')
    
    tr.innerHTML = `
        
        <td class="user">
          <img src="https://github.com/htzxd.png" alt="photograph de marco">
          <a href="https://github.com/htzxd" target="_blank"></a>
          <p> Marco Pereira</p>
          <span>marcopereira</span>
        </td>
        <td class="repositories">
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