// Search
const toggle = document.getElementById("search-toggle");
const searchWrapper = document.querySelector(".search_wrapper");

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    searchWrapper.classList.add("active");
  } else {
    searchWrapper.classList.remove("active");
  }
});

// Menu
const mobileMenuButton = document.querySelector('.burger_menu');
const mobileCloseButton = document.getElementById('closeMenu');
const mobileNavbar = document.querySelector('.mobile_menu');
let scrollPosition = 0; // Переменная для хранения позиции скролла

// Функция для блокировки прокрутки
function blockScroll() {
    // Сохраняем текущую позицию скролла
    scrollPosition = window.pageYOffset;

    // Отключаем прокрутку на всей странице
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
}

// Функция для восстановления прокрутки
function unblockScroll() {
    document.documentElement.style.overflow = ''; 
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';

    // Используем setTimeout чтобы не было анимации
    setTimeout(() => {
        window.scrollTo(0, scrollPosition);
    }, 0);
}

// Открытие меню
function openMenu() {
    if (window.innerWidth <= 640) {
        mobileNavbar.style.display = 'block';
        mobileNavbar.style.visibility = 'visible';
        mobileNavbar.style.position = 'fixed';
        mobileNavbar.style.top = '0';
        mobileNavbar.style.width = '100%';
        blockScroll();
    }
}

// Close menu
function closeMenu() {
    mobileNavbar.style.display = 'none';
    mobileNavbar.style.visibility = 'hidden';
    mobileNavbar.style.position = '';
    mobileNavbar.style.top = '';
    unblockScroll();
}

// Launch events
mobileMenuButton.addEventListener('click', openMenu);
mobileCloseButton.addEventListener('click', closeMenu);

// when loading the page - close menu
window.addEventListener('load', () => {
    mobileNavbar.style.display = 'none';
    mobileNavbar.style.visibility = 'hidden';
});

// when open new page - close menu
window.addEventListener('beforeunload', () => {
    mobileNavbar.style.display = 'none';
    mobileNavbar.style.visibility = 'hidden';
});
