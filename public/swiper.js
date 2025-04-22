const swiper = new Swiper('.hero-slider__swiper', {
  loop: true,
  autoplay: {
    delay: 5000,
  },
  speed: 800,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
})
