const listArticleFooters = document.querySelectorAll('.cellar')
const listNetworks = document.querySelectorAll('.footer__refs > a')
const listSpanGallery = document.querySelectorAll('.slides__gallery span')
const listImgGallery = document.querySelectorAll('.slides__gallery img')
let currentPhoto = document.querySelector('.slides__currentPhoto > img')
let anim = document.querySelector('.slides__currentPhoto')
const currentTitle = document.querySelector('.slides__title > h4')
let currentNum = document.querySelector('.slides__title p > span')
const arrImg = Array.from(listImgGallery)
const arrSpan = Array.from(listSpanGallery)
const prevPhoto = document.getElementById('prevPhoto')
const nextPhoto = document.getElementById('nextPhoto')
const map = document.querySelector('.map > img')
import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'
/* 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js' */


const ready = () => {
  document.querySelectorAll(".ibg").forEach(el => {
    if(el.querySelector('img')) {
      el.style.backgroundImage = 'url('+el.querySelector('img').getAttribute('src')+')';
      el.querySelector('img').style.minWidth = '100%';
      el.querySelector('img').style.visibility = 'hidden';
    }
  });
  
  Array.from(listArticleFooters).forEach(el => {
    el.querySelectorAll('.cellar__buttons > a').forEach((el, i) => addImgToButtons(el, i))
  }) // добавить иконку в соц.кнопки
  Array.from(listNetworks).forEach((el, i) => addImgToRefs(el, i)) // добавить иконку в соц.ссылки
  Array.from(listSpanGallery).forEach(el => el.addEventListener('click', activeSpanGallery)) // активировать картинку в галлерее при нажатии
}

document.addEventListener("DOMContentLoaded", ready);

document.querySelector('.search-button').addEventListener('click', activeInput) // активировать input при нажатии на поиск

function activeInput() {
  document.querySelector('.search-text').focus()
}

function addImgToButtons(el, i) {
  let img = new Image();
  img.src = '../img/icons/networks/0' + ++i +'.svg'
  el.insertAdjacentElement('afterbegin', img)
}
function addImgToRefs(el, i) {
  let img = new Image();
  img.src = '../img/icons/footer/0' + ++i +'.svg'
  el.insertAdjacentElement('afterbegin', img)
}

function activeSpanGallery(e) {
  Array.from(listSpanGallery).forEach(el => el.classList.remove('active'))
  e.currentTarget.classList.add('active')
  currentPhoto.classList.toggle('addanim', false) 
  currentPhoto.classList.toggle('remanim') 

  setTimeout(() => {
    currentPhoto.classList.add('addanim') 
    currentPhoto.classList.toggle('remanim', false) 
    currentPhoto.src = e.target.nextElementSibling.src
    currentPhoto.alt = e.target.nextElementSibling.alt
    
    currentTitle.textContent = e.target.nextElementSibling.alt
    let idx = Array.from(listSpanGallery).indexOf(e.target)
    addStylesInButtons(idx)
    currentNum.textContent = ++idx
  }, 2000)
}
for(const key of ['nextPhoto', 'prevPhoto']) {
  const btn = document.getElementById(key)
  btn.addEventListener('click', leafing)
};


function leafing(e) {
  let idx = Array.from(listSpanGallery).indexOf(document.querySelector('span.active'))

  if(e.currentTarget.id == 'nextPhoto' && idx < listSpanGallery.length - 1) {

    listSpanGallery[idx].classList.remove('active')
    currentPhoto.classList.toggle('addanim', false) 
    currentPhoto.classList.toggle('remanim') 
    
    setTimeout(() => {
      currentPhoto.classList.add('addanim') 
      currentPhoto.classList.toggle('remanim', false) 

      idx++
      currentPhoto.src = arrImg[idx].src
      currentPhoto.alt = arrImg[idx].alt

      listSpanGallery[idx].classList.add('active')
      addStylesInButtons(idx)   

      currentTitle.textContent = arrImg[idx].alt
      currentNum.textContent = ++idx
    }, 2000)
  } else if (e.currentTarget.id == 'prevPhoto' && idx > 0) {
    listSpanGallery[idx].classList.remove('active')
    currentPhoto.classList.toggle('addanim', false) 
    currentPhoto.classList.toggle('remanim') 
    setTimeout(() => {
      currentPhoto.classList.add('addanim') 
      currentPhoto.classList.toggle('remanim', false) 

      --idx
      currentPhoto.src = arrImg[idx].src
      currentPhoto.alt = arrImg[idx].alt

      listSpanGallery[idx].classList.add('active')
      addStylesInButtons(idx)

      currentTitle.textContent = arrImg[idx].alt
      currentNum.textContent = ++idx
    }, 2000)
  }
  
  
}

function addStylesInButtons(idx) {
  if(idx === 0) {
    prevPhoto.classList.contains('act') ? prevPhoto.classList.remove('act') : ''
    !nextPhoto.classList.contains('act') ? nextPhoto.classList.add('act') : ''
    prevPhoto.style.cursor = 'auto'
    nextPhoto.style.cursor = 'pointer'
  } else if(idx === listSpanGallery.length - 1) {
    nextPhoto.classList.contains('act') ? nextPhoto.classList.remove('act') : ''
    !prevPhoto.classList.contains('act') ? prevPhoto.classList.add('act') : ''
    nextPhoto.style.cursor = 'auto'
    prevPhoto.style.cursor = 'pointer'
  } else if(idx > 0) {
    prevPhoto.classList.add('act')
    !nextPhoto.classList.contains('act') ? nextPhoto.classList.add('act') : ''
    nextPhoto.style.cursor = 'pointer'
    prevPhoto.style.cursor = 'pointer'

  } else if(idx < listSpanGallery.length - 1) {
    nextPhoto.classList.add('act')
    nextPhoto.style.cursor = 'auto'
  }
}

const th = document.querySelectorAll('table th:first-of-type ')
const th2 = document.querySelectorAll('table th:last-of-type ')

const allImg = document.querySelector('.allImg')

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
  map.src="../img/photo/map-mob.svg"
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


