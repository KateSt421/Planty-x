class PlantDetails {
  constructor() {
    this.loadPlantDetails()
    this.initSearch()
    this.sliderInterval = null
  }

  async initSearch() {
    const searchInput = document.getElementById('search')
    const searchBtn = document.getElementById('searchBtn')

    searchBtn.addEventListener('click', () => {
      if (searchInput.value.length >= 3) {
        window.location.href = `/?search=${encodeURIComponent(
          searchInput.value
        )}`
      }
    })

    searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' && searchInput.value.length >= 3) {
        event.preventDefault()
        window.location.href = `/?search=${encodeURIComponent(
          searchInput.value
        )}`
      }
    })
  }

  async loadPlantDetails() {
    const urlParams = new URLSearchParams(window.location.search)
    const plantId = parseInt(urlParams.get('id'))

    if (!plantId) {
      this.showError('No plant ID provided')
      return
    }

    try {
      const response = await axios.get(`/api/plants/${plantId}`)
      const plant = response.data
      this.displayPlantDetails(plant)

      const similarResponse = await axios.get('/api/plants')
      const similarPlants = similarResponse.data
        .filter((p) => p.category === plant.category && p.id !== plant.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 8)
      this.displaySimilarPlants(similarPlants)
    } catch (error) {
      console.error('Error loading plant details:', error)
      this.showError('Plant not found or error loading plant details')
    }
  }

  displayPlantDetails(plant) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const cartItem = cart.find((item) => item.id === plant.id)
    const quantity = cartItem ? cartItem.quantity : 0

    const price = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    }).format(plant.price)

    const detailsContainer = document.getElementById('plant-details')
    detailsContainer.innerHTML = `
      <div class="card-box">
        <div class="plant-image">
          <img class="plant-image-container" src="${plant.image}" alt="${
      plant.name
    }">
          ${quantity > 0 ? '<div class="cart-badge">В КОРЗИНЕ</div>' : ''}
        </div>
        <div class="plant-description">
          <h1 class="plant-title">${plant.name}</h1>
          <div class="plant-text">
            <div class="plant-text-grey">
              <p class="plant-grey">Категория</p>
              <p class="plant-grey">Сложность ухода</p>
              <p class="plant-grey">Свойства</p>
              <p class="plant-grey">Полив</p>
              <p class="plant-grey">Освещение</p>
              <p class="plant-grey">Расположение</p>
              <p class="plant-grey">Размер горшка</p>
            </div>
            <div class="plant-text-grey">
              <p class="plant">${plant.flower}</p>
              <p class="plant">${plant.complexity}</p>
              <p class="plant">${plant.properties}</p>
              <p class="plant">${plant.water}</p>
              <p class="plant">${plant.light}</p>
              <p class="plant">${plant.location}</p>
              <p class="plant">${plant.size}</p>
            </div>
          </div>
          <p class="plant-details-description-text">${plant.description}</p>
          <div class="plant-details-actions">
            <div class="plant-details-price">${price}</div>
            ${
              quantity === 0
                ? `<button class="btn_add" onclick="plantDetails.updateQuantity(${plant.id}, 1)">Добавить</button>`
                : `<div class="quantity-controls">
                    <button class="btn-pressed" onclick="plantDetails.updateQuantity(${plant.id}, -1)">-</button>
                    <div class="item-quantity-box">
                      <span class="item-quantity">${quantity}</span>
                    </div>
                    <button class="btn-pressed" onclick="plantDetails.updateQuantity(${plant.id}, 1)">+</button>
                  </div>`
            }
          </div>
        </div>
      </div>
    `

    const conditionsContainer = document.getElementById('plant-conditions')
    conditionsContainer.innerHTML = `
      <div class="condition-box">
        <h3 class="condition-title">Про растение</h3>
        <p class="plant-condition">${plant.about}</p>
        <h3 class="condition-title">Уход за растением</h3>
        <h3 class="condition-title-small">Температурный режим</h3>
        <p class="plant-condition">${plant.temperature}</p>
        <h3 class="condition-title-small">Полив</h3>
        <p class="plant-condition">${plant.watering}</p>
        <h3 class="condition-title-small">Освещение</h3>
        <p class="plant-condition">${plant.lighting}</p>
        <h3 class="condition-title-small">Грунт и горшок</h3>
        <p class="plant-condition">${plant.soil}</p>
        <h3 class="condition-title-small">Подкормки</h3>
        <p class="plant-condition">${plant.fertilizing}</p>
        <h3 class="condition-title-small">Пересадка</h3>
        <p class="plant-condition">${plant.transplanting}</p>
        <h3 class="condition-title-small">Размножение</h3>
        <p class="plant-condition">${plant.propagation}</p>
      </div>
      <div class="send-mail"></div>
      <div class="slider-wrapper"></div>
    `
  }

  displaySimilarPlants(plants) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    plants.forEach((plant) => {
      const cartItem = cart.find((item) => item.id === plant.id)
      plant.cartQuantity = cartItem ? cartItem.quantity : 0
    })

    const similarContainer = document.createElement('div')
    similarContainer.className = 'similar-plants-container'
    similarContainer.innerHTML = `
      <div class="cards-container">
        <h2 class="similar-plants-title">Похожие товары</h2>
        <div class="slider-title-arrow-box">
          <div class="buttons">
            <button class="arrow-right">&#8594;</button>
            <button class="arrow-left">&#8592;</button>
          </div>
        </div>
      </div>
      <div class="similar-plants-slider">
        <div class="similar-plants-track">
          ${plants.map((plant) => this.createSimilarPlantCard(plant)).join('')}
        </div>
      </div>
    `

    document.querySelector('.slider-wrapper').appendChild(similarContainer)
    this.initSlider()
  }

  createSimilarPlantCard(plant) {
    const price = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    }).format(plant.price)
    const isServiceCategory =
      plant.category === 'service' ? 'details_service.html' : 'details.html'

    return `
      <div class="card" data-plant-id="${plant.id}">
        <div class="card-image-container"onclick="window.location.href='/${isServiceCategory}?id=${
      plant.id
    }'">
          <img src="${plant.image}" alt="${plant.name}">
          ${
            plant.cartQuantity > 0
              ? '<div class="cart-badge">В КОРЗИНЕ</div>'
              : ''
          }
        </div>
        <p class="card-price">${price}</p>
        <h3 class="card-name">${plant.name}</h3>
        <h3 class="card-properties">${plant.properties}</h3>
        ${
          plant.cartQuantity === 0
            ? `<button class="btn_add_slider btn_opaque_text_52" onclick="plantDetails.updateCartButton(${plant.id}, 1)">Добавить</button>`
            : `<div class="quantity-controls">
                <button class="btn-pressed" onclick="plantDetails.updateCartButton(${plant.id}, -1)">-</button> 
                <div class="item-quantity-box">
                <span class="item-quantity">${plant.cartQuantity}</span>
                </div>
                <button class="btn-pressed" onclick="plantDetails.updateCartButton(${plant.id}, 1)">+</button>
              </div>`
        }
      </div>
    `
  }

  initSlider() {
    const track = document.querySelector('.similar-plants-track')
    const cards = document.querySelectorAll('.card')
    const nextBtn = document.querySelector('.arrow-right')
    const prevBtn = document.querySelector('.arrow-left')
    const slider = document.querySelector('.similar-plants-slider')

    if (!track || !nextBtn || !prevBtn || !slider || cards.length === 0) return

    if (this.sliderInterval) {
      clearInterval(this.sliderInterval)
    }

    let currentPosition = 0
    const cardWidth = cards[0].offsetWidth + 20
    const visibleCards = 4
    const maxPosition = -((cards.length - visibleCards) * cardWidth)

    const updateSlider = () => {
      track.style.transform = `translateX(${currentPosition}px)`
      prevBtn.style.display = currentPosition === 0 ? 'none' : 'block'
      nextBtn.style.display = currentPosition <= maxPosition ? 'none' : 'block'
    }

    this.sliderInterval = setInterval(() => {
      if (currentPosition <= maxPosition) {
        currentPosition = 0
      } else {
        currentPosition -= cardWidth
      }
      updateSlider()
    }, 3000)

    nextBtn.addEventListener('click', () => {
      currentPosition = Math.max(currentPosition - cardWidth, maxPosition)
      updateSlider()
      clearInterval(this.sliderInterval)
      this.sliderInterval = setInterval(() => {
        if (currentPosition <= maxPosition) {
          currentPosition = 0
        } else {
          currentPosition -= cardWidth
        }
        updateSlider()
      }, 3000)
    })

    prevBtn.addEventListener('click', () => {
      currentPosition = Math.min(currentPosition + cardWidth, 0)
      updateSlider()
      clearInterval(this.sliderInterval)
      this.sliderInterval = setInterval(() => {
        if (currentPosition <= maxPosition) {
          currentPosition = 0
        } else {
          currentPosition -= cardWidth
        }
        updateSlider()
      }, 3000)
    })

    slider.addEventListener('mouseenter', () => {
      clearInterval(this.sliderInterval)
    })

    slider.addEventListener('mouseleave', () => {
      clearInterval(this.sliderInterval)
      this.sliderInterval = setInterval(() => {
        if (currentPosition <= maxPosition) {
          currentPosition = 0
        } else {
          currentPosition -= cardWidth
        }
        updateSlider()
      }, 3000)
    })

    updateSlider()
    prevBtn.style.display = 'none'
  }

  showError(message) {
    const detailsContainer = document.getElementById('plant-details')
    detailsContainer.innerHTML = `
      <div class="alert alert-danger" role="alert">
        ${message}
      </div>
      <a href="/" class="btn btn-primary">Back to Shop</a>
    `
  }

  updateCartButton(plantId, change) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item) => item.id === plantId)
    let newQuantity = 0

    if (existingItem) {
      existingItem.quantity = Math.max(0, existingItem.quantity + change)
      newQuantity = existingItem.quantity
      if (existingItem.quantity === 0) {
        const index = cart.indexOf(existingItem)
        cart.splice(index, 1)
      }
    } else if (change > 0) {
      newQuantity = 1
      axios.get(`/api/plants/${plantId}`).then((response) => {
        cart.push({ ...response.data, quantity: 1 })
        localStorage.setItem('cart', JSON.stringify(cart))
      })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    this.updateCartButtonUI(plantId, newQuantity)
  }

  updateCartButtonUI(plantId, quantity) {
    const card = document.querySelector(`.card[data-plant-id="${plantId}"]`)
    if (!card) return

    // Update badge
    const badge = card.querySelector('.cart-badge')
    const imageContainer = card.querySelector('.card-image-container')

    if (quantity > 0) {
      if (!badge) {
        const newBadge = document.createElement('div')
        newBadge.className = 'cart-badge'
        newBadge.textContent = 'В КОРЗИНЕ'
        imageContainer.appendChild(newBadge)
      }
    } else {
      badge?.remove()
    }

    // Update button/quantity controls
    if (quantity === 0) {
      card.querySelector('.quantity-controls')?.remove()
      const addButton = document.createElement('button')
      addButton.className = 'btn_add_slider btn_opaque_text_52'
      addButton.textContent = 'Добавить'
      addButton.onclick = () => this.updateCartButton(plantId, 1)
      card.appendChild(addButton)
    } else {
      const existingControls = card.querySelector('.quantity-controls')
      if (existingControls) {
        existingControls.querySelector('.item-quantity').textContent = quantity
      } else {
        card.querySelector('.btn_add_slider')?.remove()
        const controls = document.createElement('div')
        controls.className = 'quantity-controls'
        controls.innerHTML = `
          <button class="btn-pressed" onclick="plantDetails.updateCartButton(${plantId}, -1)">-</button>
          <div class="item-quantity-box">
          <span class="item-quantity">${quantity}</span>
          </div>
          <button class="btn-pressed" onclick="plantDetails.updateCartButton(${plantId}, 1)">+</button>
        `
        card.appendChild(controls)
      }
    }
  }

  updateQuantity(plantId, change) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const plant = { id: plantId }

    try {
      const existingItem = cart.find((item) => item.id === plantId)

      if (existingItem) {
        existingItem.quantity = Math.max(0, existingItem.quantity + change)
        if (existingItem.quantity === 0) {
          const index = cart.indexOf(existingItem)
          cart.splice(index, 1)
        }
      } else if (change > 0) {
        axios.get(`/api/plants/${plantId}`).then((response) => {
          cart.push({ ...response.data, quantity: 1 })
          localStorage.setItem('cart', JSON.stringify(cart))
          this.loadPlantDetails()
        })
        return
      }

      localStorage.setItem('cart', JSON.stringify(cart))
      this.loadPlantDetails()
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }
}

const plantDetails = new PlantDetails()
