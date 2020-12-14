const listArticleFooters = document.querySelectorAll('.cellar')
const listNetworks = document.querySelectorAll('.footer__refs > a')
let currentPhoto = document.querySelector('.slides__currentPhoto > img')
const currentTitle = document.querySelector('.slides__title > h4')
let currentNum = document.querySelector('.slides__title p > span')
const arrImg = Array.from(document.querySelectorAll('.slides__gallery img'))
const arrSpan = Array.from(document.querySelectorAll('.slides__gallery span'))
const prevPhoto = document.getElementById('prevPhoto')
const nextPhoto = document.getElementById('nextPhoto')
const map = document.querySelector('.map > img')
let spanActive = document.querySelector('.bg.active')
let id;
function findId() {
  id = arrSpan.indexOf(document.querySelector('span.active'))
  return id;
}
findId() 
import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'

const ready = () => {
  Array.from(listArticleFooters).forEach(el => {
    el.querySelectorAll('.cellar__buttons > a').forEach((el, i) => addImgToButtons(el, i, './img/icons/networks/0'))
  }) // добавить иконку в соц.кнопки
  Array.from(listNetworks).forEach((el, i) => addImgToButtons(el, i, './img/icons/footer/0')) // добавить иконку в соц.ссылки
  arrSpan.forEach(el => el.addEventListener('click', activeSpanGallery)) // активировать картинку в галлерее при нажатии
  document.querySelector('.search-button').addEventListener('click', activeInput) // активировать input при нажатии на поиск
}
document.addEventListener("DOMContentLoaded", ready)

function activeInput() {
  document.querySelector('.search-text').focus()
}

function addImgToButtons(el, i, src) {
  let img = new Image();
  img.src = src + (++i) +'.svg'
  el.insertAdjacentElement('afterbegin', img)
}

function activeSpanGallery(e) {
  arrSpan.forEach(el => el.classList.remove('active'))
  e.currentTarget.classList.add('active')
  findId() 
  toggleClassCurrentPhoto()
  toggleAnim()
}

for(const key of ['nextPhoto', 'prevPhoto']) {
  const btn = document.getElementById(key)
  btn.addEventListener('click', leafing) // перелистывание
};

function leafing(e) {
  findId() 
  if(e.currentTarget.id == 'nextPhoto' && id < arrSpan.length - 1) {
    changeStylesSpan(id)
    changeStylesPhoto(++id) 
  } else if (e.currentTarget.id == 'prevPhoto' && id > 0) {
    changeStylesSpan(id)
    changeStylesPhoto(--id) 
  }
}

/*функция ниже меняет текущее фото, название и пагинацию*/
function changeStylesPhoto(id) {
  arrSpan[id].classList.add('active')
  toggleAnim()
}

function toggleAnim() {
  setTimeout(() => {
    currentPhoto.classList.add('addanim') 
    currentPhoto.classList.toggle('remanim', false) 
  
    currentPhoto.src = arrImg[id].src
    currentPhoto.alt = arrImg[id].alt
    currentTitle.textContent = arrImg[id].alt
    
    addStylesInButtons(id) // переключение стилей кнопок
    currentNum.textContent = ++id
  }, 1000)
}

/*функция ниже меняет span в галлерее при перелистывании*/
function changeStylesSpan(id) {
  arrSpan[id].classList.remove('active')
  toggleClassCurrentPhoto()
}

/*функция ниже меняет класс основного фото в галлерее*/
function toggleClassCurrentPhoto() {
  currentPhoto.classList.toggle('addanim', false) 
  currentPhoto.classList.toggle('remanim')
}

function addStylesInButtons(idx) {
  if(idx === 0) {
    prevPhoto.classList.contains('act') ? prevPhoto.classList.remove('act') : ''
    !nextPhoto.classList.contains('act') ? nextPhoto.classList.add('act') : ''
    prevPhoto.style.cursor = 'auto'
    nextPhoto.style.cursor = 'pointer'
  } else if(idx === arrSpan.length - 1) {
    nextPhoto.classList.contains('act') ? nextPhoto.classList.remove('act') : ''
    !prevPhoto.classList.contains('act') ? prevPhoto.classList.add('act') : ''
    nextPhoto.style.cursor = 'auto'
    prevPhoto.style.cursor = 'pointer'
  } else if(idx > 0) {
    prevPhoto.classList.add('act')
    !nextPhoto.classList.contains('act') ? nextPhoto.classList.add('act') : ''
    nextPhoto.style.cursor = 'pointer'
    prevPhoto.style.cursor = 'pointer'

  } else if(idx < arrSpan.length - 1) {
    nextPhoto.classList.add('act')
    nextPhoto.style.cursor = 'auto'
  }
}

const th = document.querySelectorAll('table th:first-of-type ')
const th2 = document.querySelectorAll('table th:last-of-type ')

if(screen.width < 1023) {
  document.querySelector('.slides__gallery').classList.add('swiper-container')
  document.querySelector('.slides__gallery ul').classList.add('swiper-wrapper')
  const wrapper = document.querySelector('.swiper-wrapper')
  const container = document.querySelector('.swiper-container')
  const title = document.querySelector('.slides__title h4')
  const pagination = document.createElement('div')
  pagination.classList.add('swiper-pagination')

  wrapper.after(pagination)
  container.prepend(title)
  document.querySelector('.slides__footer').remove()
  
  Array.from(th).forEach(el => {
    const h4 = document.createElement('h4')
    h4.textContent = el.textContent
    el.replaceWith(h4)
  })
  Array.from(th2).forEach(el => {
    const p = document.createElement('p')
    p.textContent = el.textContent
    el.replaceWith(p)
  })
  map.src="./img/photo/map-mob.svg"
  let liArr = document.querySelectorAll('.slides__gallery li')
  Array.from(liArr).forEach(el => el.classList.add('swiper-slide'))
      
  let swiper = new Swiper('.swiper-container', {
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    }
  });

  Array.from(liArr).forEach(el => el.addEventListener('touchstart', () => handle()))

  function handle() {
    setTimeout(function () {
      title.textContent = document.querySelector('.swiper-slide-active img').alt
    }, 200)
  }
}
