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

function openMenu() {
    if (window.innerWidth <= 640) {
        mobileNavbar.style.display = 'block';
        mobileNavbar.style.visibility = 'visible'; // Ensure visibility
        document.documentElement.style.overflow = 'hidden'; // Disable scrolling on the page
    }
}

// close the menu
function closeMenu() {
    mobileNavbar.style.display = 'none';
    mobileNavbar.style.visibility = 'hidden'; // Hide visibility
    document.documentElement.style.overflow = ''; // Enable scrolling again
}

// event launchers
mobileMenuButton.addEventListener('click', openMenu);
mobileCloseButton.addEventListener('click', closeMenu);

// hide the menu on loading the page
window.addEventListener('load', () => {
    mobileNavbar.style.display = 'none';
    mobileNavbar.style.visibility = 'hidden';
});

// hide the menu when open new page
window.addEventListener('beforeunload', () => {
    mobileNavbar.style.display = 'none';
    mobileNavbar.style.visibility = 'hidden';
});