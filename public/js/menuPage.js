const root = document.querySelector('.app')
const category = []

clientData.menus.map((menu) => {
    if(!category.includes(menu.type)){
        category.push(menu.type)
    }
})


function createDiv(parent, classes, type = 'div'){
    const div = document.createElement(type)

    parent.appendChild(div)

    if(typeof classes == 'string'){
        div.classList.add(classes)
    } else if(Array.isArray(classes)) {
        classes.map((el) => {
            div.classList.add(el)
        })
    }
    return div
}



const container = createDiv(root, 'container')
const headerContainer = createDiv(container, 'header-container')
const h2 = createDiv(headerContainer, null, 'h2')
h2.innerText = 'Our Menu'
const filterMenu = createDiv(container, 'filter-menu', 'ul')


console.log(category)
createDiv(filterMenu, 'active', 'li').innerText = "All"

category.map((el) => {
    const x = createDiv(filterMenu, null ,'li')
    x.innerText = el
})

const filterContent = createDiv(container, 'filter-content')


clientData.menus.map((menu) => {
    const card = createDiv(filterContent, ['card', menu.type])
    
    const imgBox = createDiv(card, 'img-Box')
    const img = createDiv(imgBox, null, 'img')
    img.src = `/${menu.image}`
    const detailBox = createDiv(card, 'detail-Box')
    const h5 = createDiv(detailBox, null, 'h5')
    h5.innerText = menu.title
    const p = createDiv(detailBox, null, 'p')
    p.innerText = menu.ingredients
    const options = createDiv(detailBox, 'options')
    const h6 = createDiv(options, null, 'h6')
    h5.innerText = menu.price
})





