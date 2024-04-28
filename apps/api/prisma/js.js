'use strict'
$('header nav .language button').on('click', function () {
  $(this).parents('.language').toggleClass('active')
}),
  $('header nav .language .drop-lang').on('mouseleave', function () {
    $(this).parents('.language').removeClass('active')
  })
const swiper_backstage = new Swiper('.slide-backstage', {
  slidesPerView: 4,
  spaceBetween: 30,
  navigation: {
    nextEl: '.s-producoes .button-next',
    prevEl: '.s-producoes .button-prev',
  },
  pagination: { el: '.swiper-pagination' },
  breakpoints: {
    1200: { slidesPerView: 4, spaceBetween: 30 },
    1050: { slidesPerView: 4 },
    1024: { slidesPerView: 4, spaceBetween: 20 },
    990: { slidesPerView: 3 },
    835: { slidesPerView: 2.7, spaceBetween: 26 },
    768: { slidesPerView: 2.7, spaceBetween: 26 },
    600: { slidesPerView: 2, spaceBetween: 24 },
    560: { slidesPerView: 2 },
    480: { slidesPerView: 1.5 },
    450: { slidesPerView: 1.4 },
    320: { slidesPerView: 1.5 },
  },
})
const swiper_class = new Swiper('.slide-class', {
  slidesPerView: 4,
  spaceBetween: 30,
  navigation: {
    nextEl: '.s-producoes .button-next',
    prevEl: '.s-producoes .button-prev',
  },
  pagination: { el: '.swiper-pagination-class' },
  breakpoints: {
    1200: { slidesPerView: 4, spaceBetween: 30 },
    1050: { slidesPerView: 4 },
    1024: { slidesPerView: 4, spaceBetween: 20 },
    990: { slidesPerView: 3 },
    835: { slidesPerView: 2.7, spaceBetween: 26 },
    768: { slidesPerView: 2.7, spaceBetween: 26 },
    600: { slidesPerView: 2, spaceBetween: 24 },
    560: { slidesPerView: 2 },
    480: { slidesPerView: 1.5 },
    450: { slidesPerView: 1.4 },
    320: { slidesPerView: 1.5 },
  },
})
const swiper_docs = new Swiper('.slide-docs', {
  slidesPerView: 4,
  spaceBetween: 30,
  navigation: {
    nextEl: '.s-producoes .button-next',
    prevEl: '.s-producoes .button-prev',
  },
  pagination: { el: '.swiper-pagination-docs' },
  breakpoints: {
    1200: { slidesPerView: 4, spaceBetween: 30 },
    1050: { slidesPerView: 4 },
    1024: { slidesPerView: 4, spaceBetween: 20 },
    990: { slidesPerView: 3 },
    835: { slidesPerView: 2.7, spaceBetween: 26 },
    768: { slidesPerView: 2.7, spaceBetween: 26 },
    600: { slidesPerView: 2, spaceBetween: 24 },
    560: { slidesPerView: 2 },
    480: { slidesPerView: 1.5 },
    450: { slidesPerView: 1.4 },
    320: { slidesPerView: 1.4, spaceBetween: 24 },
  },
})
function fixedMenu() {
  const e = document.getElementById('js-header')
  window.addEventListener('scroll', function () {
    window.scrollY > 50
      ? e.classList.add('fixed-header')
      : e.classList.remove('fixed-header')
  })
}
fixedMenu()
const galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 40,
  slidesPerView: 3,
  direction: 'vertical',
  freeMode: !0,
  watchSlidesVisibility: !0,
  watchSlidesProgress: !0,
  breakpoints: {
    1200: { spaceBetween: 31, slidesPerView: 3, direction: 'vertical' },
    1050: { spaceBetween: 31, slidesPerView: 3, direction: 'vertical' },
    835: { spaceBetween: 31, slidesPerView: 3, direction: 'vertical' },
    768: { spaceBetween: 31, slidesPerView: 3, direction: 'vertical' },
    600: { slidesPerView: 2, spaceBetween: 24, direction: 'horizontal' },
    560: { direction: 'horizontal', slidesPerView: 1.5, spaceBetween: 20 },
    480: { direction: 'horizontal', slidesPerView: 1.4, spaceBetween: 20 },
    450: { direction: 'horizontal', slidesPerView: 1.3, spaceBetween: 20 },
    320: { direction: 'horizontal', slidesPerView: 1, spaceBetween: 20 },
  },
})
const galleryTop = new Swiper('.gallery-top', {
  slidesPerView: 1,
  spaceBetween: 50,
  speed: 800,
  direction: 'vertical',
  navigation: {
    nextEl: '.s-sobre .button-next',
    prevEl: '.s-sobre .button-prev',
  },
  thumbs: { swiper: galleryThumbs },
  breakpoints: {
    1200: { slidesPerView: 1, spaceBetween: 50, direction: 'vertical' },
    1050: { slidesPerView: 1, spaceBetween: 50, direction: 'vertical' },
    835: { slidesPerView: 1, spaceBetween: 50, direction: 'vertical' },
    768: { slidesPerView: 1, spaceBetween: 50, direction: 'vertical' },
    600: { slidesPerView: 1, spaceBetween: 22, direction: 'horizontal' },
    560: { direction: 'horizontal', slidesPerView: 1, spaceBetween: 20 },
    480: { direction: 'horizontal', slidesPerView: 1, spaceBetween: 20 },
    450: { direction: 'horizontal', slidesPerView: 1, spaceBetween: 20 },
    320: { direction: 'horizontal', slidesPerView: 1, spaceBetween: 20 },
  },
})
function initAccordion() {
  const i = document.querySelectorAll('.js-accordion')
  i.forEach(function (e) {
    e.addEventListener('click', function () {
      e.classList.contains('active')
        ? e.classList.remove('active')
        : (i.forEach(function (e) {
            e.classList.remove('active')
          }),
          e.classList.add('active'))
    })
  })
}
function closeSection() {
  const e = document.getElementById('js-close')
  const i = document.querySelectorAll('.s-informativo')
  const s = document.getElementById('js-header')
  e.addEventListener('click', function () {
    i.forEach(function (e) {
      e.addEventListener('click', function () {
        e.classList.remove('active'), (s.style.paddingTop = '16px')
      })
    })
  })
}
function initScrollSuave() {
  function i(e) {
    e.preventDefault()
    e = e.currentTarget.getAttribute('href')
    document
      .querySelector(e)
      .scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  document
    .querySelectorAll('.s-banner a[href^="#materiais"]')
    .forEach(function (e) {
      e.addEventListener('click', i)
    })
}
initAccordion(),
  AOS.init(),
  closeSection(),
  initScrollSuave(),
  $('#js-open-menu').on('click', function () {
    $('html').toggleClass('menu-opened')
  }),
  (window.onload = function () {
    lax.init(),
      lax.addDriver('scrollY', function () {
        return window.scrollY
      }),
      lax.addElements('.s-fotos .top', {
        scrollY: {
          translateX: [
            ['elInY', 'elOutY'],
            [200, -200],
          ],
        },
      }),
      lax.addElements('.s-fotos .bottom', {
        scrollY: {
          translateX: [
            ['elInY', 'elOutY'],
            [-200, 200],
          ],
        },
      }),
      lax.addElements('.s-aprender .imagem .cards', {
        scrollY: {
          translateY: [
            ['elInY', 'elOutY'],
            [200, -200],
          ],
        },
      })
  }),
  $('.js-play').on('click', function () {
    $('.s-midias .video .conteudo').fadeOut(),
      $('.s-midias .video .trailer').fadeOut(),
      $('.s-midias .video .img').fadeOut()
  })
