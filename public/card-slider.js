async function loadPlants() {
  const response = await axios.get('/api/plants')
  const plantsData = response.data
  console.log(plantsData, response)
  return plantsData
}

const currentCategory = 'flowering' // текущая выбранная категория
const numberOfItems = 8 // сколько товаров показывать
const validCategories = [
  'flowering',
  'orchids',
  'foliage plants',
  'succulents and cacti',
  'palms',
  'ferns',
  'citrus',
] // допустимые категории

async function getRandomItemsByCategory(category, count) {
  const plants = await loadPlants() // используем await для получения данных
  if (!validCategories.includes(category)) {
    // проверяем, входит ли категория в допустимые
    return [] // если нет, возвращаем пустой массив
  }

  const filtered = plants.filter((p) => p.category === category) // фильтруем по категориям
  const shuffled = filtered.sort(() => 0.5 - Math.random()) // перемешиваем
  return shuffled.slice(0, count) // возвращаем первые 'count' элементов
}

const container = document.getElementById('cardsContainer')

async function renderSlider() {
  container.innerHTML = ''
  const items = await getRandomItemsByCategory(currentCategory, numberOfItems) // используем await
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
      <h4 class="card-name">${p.name}</h4>
      <p class="card-properties">${p.properties}</p>
      <div class="plant-details-actions">
        ${
          quantity === 0
            ? `<button class="btn_solid_text_52" onclick="plantDetails.updateQuantity(${p.id}, 1)">Добавить</button>`
            : `<div class="quantity-controls">
              <button class="btn-pressed" onclick="plantDetails.updateQuantity(${p.id}, -1)">-</button>
              <div class="item-quantity-box">
                <span class="item-quantity">${quantity}</span>
              </div>
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
  container.style.transform = `translateX(-${offset}px)` // исправил синтаксис
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
