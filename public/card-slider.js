const plants = [
  {
    id: 1,
    name: 'Гортензия',
    price: 1599,
    image: 'http://localhost:7001/static/assets/images/plant/plant_1.png',
    category: 'flowering',
    flower: 'Цветущие',
    complexity: 'Простой',
    properties: 'Очищает воздух',
    water: 'Обильный',
    light: 'Яркое',
    location: 'Настольное',
  },
  {
    id: 2,
    name: ' Антуриум ',
    price: 1799,
    image: 'http://localhost:7001/static/assets/images/plant/plant_2.jpg',
    category: 'flowering',
    flower: 'Цветущие',
    complexity: 'Простой',
    properties: 'Очищает воздух',
    water: 'Умеренный',
    light: 'Яркое',
    location: 'Настольное',
  },
  {
    id: 3,
    name: 'Роза',
    price: 1899,
    image: 'http://localhost:7001/static/assets/images/plant/plant_3.png',
    category: 'flowering',
    flower: 'Цветущие',
    complexity: 'Простой',
    properties: 'Очищает воздух',
    water: 'Умеренный',
    light: 'Яркое',
    location: 'Настольное',
  },
  {
    id: 4,
    name: 'Жасмин',
    price: 1489,
    image: 'http://localhost:7001/static/assets/images/plant/plant_4.png',
    category: 'flowering',
    flower: 'Цветущие',
    complexity: 'Простой',
    properties: 'Очищает воздух',
    water: 'Умеренный',
    light: 'Яркое',
    location: 'Настольное',
  },
  {
    id: 5,
    name: 'Фиалка',
    price: 1099,
    image: 'http://localhost:7001/static/assets/images/plant/plant_5.png',
    category: 'flowering',
    flower: 'Цветущие',
    complexity: 'Простой',
    properties: 'Очищает воздух',
    water: 'Умеренный',
    light: 'Яркое',
    location: 'Настольное',
  },
  {
    id: 6,
    name: 'Глоксиния',
    price: 1390,
    image: 'http://localhost:7001/static/assets/images/plant/plant_6.png',
    category: 'flowering',
    flower: 'Цветущие',
    complexity: 'Простой',
    properties: 'Очищает воздух',
    water: 'Умеренный',
    light: 'Яркое',
    location: 'Настольное',
  },
  {
    id: 7,
    name: 'Гибискус',
    price: 1099,
    image: 'http://localhost:7001/static/assets/images/plant/plant_7.png',
    category: 'flowering',
    flower: 'Цветущие',
    complexity: 'Простой',
    properties: 'Очищает воздух',
    water: 'Обильный',
    light: 'Яркое',
    location: 'Настольное',
  },
  {
    id: 8,
    name: 'Герань',
    price: 1390,
    image: 'http://localhost:7001/static/assets/images/plant/plant_8.png',
    category: 'flowering',
    flower: 'Цветущие',
    complexity: 'Простой',
    properties: 'Очищает воздух',
    water: 'Умеренный',
    light: 'Яркое',
    location: 'Настольное',
  },
  {
    id: 9,
    name: 'Фуксия',
    price: 1290,
    image: 'http://localhost:7001/static/assets/images/plant/plant_9.png',
    category: 'flowering',
    flower: 'Цветущие',
    complexity: 'Простой',
    properties: 'Очищает воздух',
    water: 'Обильный',
    light: 'Яркое',
    location: 'Настольное',
  },
]

const currentCategory = 'flowering' // текущая выбранная категория
const numberOfItems = 8 // сколько товаров показывать

function getRandomItemsByCategory(category, count) {
  const filtered = plants.filter((p) => p.category === category)
  const shuffled = filtered.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
const container = document.getElementById('cardsContainer')

function renderSlider() {
  container.innerHTML = ''
  const items = getRandomItemsByCategory(currentCategory, numberOfItems)
  items.forEach((p) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const cartItem = cart.find((item) => item.id === p.id)
    const quantity = cartItem ? cartItem.quantity : 0
    const price = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    }).format(p.price)
    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <p class="card-price">${price}</p>
      <h4 class-"card-name">${p.name}</h4>
      <p class="card-properties">${p.properties}</p>
      <div class="plant-details-actions">${
        quantity === 0
          ? `<button class="btn_solid_text_52" onclick="plantDetails.updateQuantity(${p.id}, 1)">Добавить</button>`
          : `<div class="quantity-controls">
                  <button class="btn-pressed" onclick="plantDetails.updateQuantity(${p.id}, -1)">-</button><div class="item-quantity-box">
                  <span class="item-quantity">${quantity}</span></div>

                  <button class="btn-pressed" onclick="plantDetails.updateQuantity(${p.id}, 1)">+</button>
               </div>`
      }
            </div>
    `
    container.appendChild(card)
  })
  // сбрасываем offset при новом рендере
  offset = 0
  updateSlider()
}

const wrapper = document.querySelector('.slider-wrapper')
const wrapperWidth = wrapper.offsetWidth
const cardWidth = 340 // ширина карточки + margin
let offset = 0

function updateSlider() {
  container.style.transform = `translateX(-${offset}px)`
}

document.getElementById('prevBtn').addEventListener('click', () => {
  offset = Math.max(offset - cardWidth, 0)
  updateSlider()
})
document.getElementById('nextBtn').addEventListener('click', () => {
  const maxOffset = Math.max(0, container.scrollWidth - wrapperWidth)
  offset = Math.min(offset + cardWidth, maxOffset)
  updateSlider()
})

// Автоматическая прокрутка
setInterval(() => {
  const maxOffset = Math.max(0, container.scrollWidth - wrapperWidth)
  if (offset >= maxOffset) {
    offset = 0 // начинаем сначала
  } else {
    offset += cardWidth
  }
  updateSlider()
}, 3000)

// Инициализация при загрузке
renderSlider()
