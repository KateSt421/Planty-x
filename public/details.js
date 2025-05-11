class PlantDetails {
  constructor() {
    this.loadPlantDetails()
    this.initSearch()
  }

  async initSearch() {
    const searchInput = document.getElementById('search')
    const searchBtn = document.getElementById('searchBtn')

    // Click event for search button
    searchBtn.addEventListener('click', () => {
      if (searchInput.value.length >= 3) {
        window.location.href = `/?search=${encodeURIComponent(
          searchInput.value
        )}`
      }
    })

    // Enter key event for search input
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
    // Get plant ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const plantId = parseInt(urlParams.get('id'))

    if (!plantId) {
      this.showError('No plant ID provided')
      return
    }

    try {
      // Fetch plant details from API
      const response = await axios.get(`/api/plants/${plantId}`)
      const plant = response.data
      this.displayPlantDetails(plant)
    } catch (error) {
      console.error('Error loading plant details:', error)
      this.showError('Plant not found or error loading plant details')
    }
  }

  displayPlantDetails(plant) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const cartItem = cart.find((item) => item.id === plant.id)
    const quantity = cartItem ? cartItem.quantity : 0

    const detailsContainer = document.getElementById('plant-details')
    console.log(plant)
    detailsContainer.innerHTML = `
      <div class="card-box">
        <div class="plant-image">
            <img class="plant-image-container"src="${plant.image}" alt="${
      plant.name
    }">
        </div>
        <div class="plant-description">
          <h1 class="plant-title">${plant.name}</h1>
          <div class="plant-text">
          <div class="plant-text-grey">
          <p class="plant-grey">Категория</p>
          <p class="plant-grey">Сложность ухода</>
          <p class="plant-grey">Свойства</>
          <p class="plant-grey">Полив</p>
          <p class="plant-grey">Освещение</>
          <p class="plant-grey">Расположение</p>
          <p class="plant-grey">Размер горшка</>
          </div>
          <div class="plant-text-grey">
          <p class="plant">
             ${plant.flower}
          </p>
          <p class="plant">
             ${plant.complexity}
          </p> <p class="plant">
             ${plant.properties}
          </p> <p class="plant">
             ${plant.water}
          </p> <p class="plant">
             ${plant.light}
          </p> 
          <p class="plant">
             ${plant.location}
          </p>
          <p class="plant">
             ${plant.size}
          </p> 
          </div>
          </div>
          <p class="plant-details-description-text">
            ${plant.description}
          </p>
          <div class="plant-details-actions"><div class="plant-details-price">${plant.price.toFixed(
            2
          )}₽</div>${
      quantity === 0
        ? `<button class="btn_solid_text_52" onclick="plantDetails.updateQuantity(${plant.id}, 1)">Добавить</button>`
        : `<div class="quantity-controls">
                  <button class="btn-pressed" onclick="plantDetails.updateQuantity(${plant.id}, -1)">-</button>
                  <span class="item-quantity">${quantity}</span>

                  <button class="btn-pressed" onclick="plantDetails.updateQuantity(${plant.id}, 1)">+</button>
               </div>`
    }
            </div>
        </div>
      </div>
    `
    const conditonsContainer = document.getElementById('plant-conditions')
    conditonsContainer.innerHTML = `
      <div class="condition-box">
      <h3 class="condition-title">Про растение</h3>
      <p class="plant-condition">
             ${plant.about}
          </p>
          <h3 class="condition-title">Уход за растением</h3>
          <h6 class="condition-title">Температурный режим</h6>
          <p class="plant-condition">
             ${plant.temperature}
          </p>
          <h3 class="condition-title">Полив</h3>
          <p class="plant-condition">
            ${plant.watering}</p><h3 class="condition-title">Освещение</h3>
          <p class="plant-condition">
            ${plant.lighting}</p><h3 class="condition-title">Грунт и горшок</h3>
          <p class="plant-condition">
            ${plant.soil}</p><h3 class="condition-title">Подкормки</h3>
          <p class="plant-condition">
            ${plant.fertilizing}</p>
            <h3 class="condition-title">Пересадка</h3>
          <p class="plant-condition">
            ${plant.transplanting}</p>
            <h3 class="condition-title">Размножение</h3>
          <p class="plant-condition">
            ${plant.propagation}</p>
            </div>
            <div class="send-mail"></div>
      </div>`
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

  updateQuantity(plantId, change) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const plant = { id: plantId }

    try {
      // Get current plant data
      const existingItem = cart.find((item) => item.id === plantId)

      if (existingItem) {
        existingItem.quantity = Math.max(0, existingItem.quantity + change)
        if (existingItem.quantity === 0) {
          const index = cart.indexOf(existingItem)
          cart.splice(index, 1)
        }
      } else if (change > 0) {
        // Need to get plant data first
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
