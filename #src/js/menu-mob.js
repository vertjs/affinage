let menuIcon = document.querySelector('.icon-menu')
let mobMenu = document.querySelector('.mobile-menu')
let body = document.querySelector('.wrapper')
let list = Array.from(document.querySelectorAll('.mobile-menu__list li'))
console.log(list)
menuIcon.addEventListener('click', handleIconToggle)

function handleIconToggle(event) {
  event.currentTarget.classList.toggle("mobile")
  body.classList.toggle("lock")
  mobMenu.classList.toggle("mobile")
  mobMenu.classList.toggle("lock")
}

list.forEach(el => el.addEventListener('click', handleMenuToggle))

function handleMenuToggle() {
  menuIcon.classList.remove('mobile')
  mobMenu.classList.remove('mobile')
}