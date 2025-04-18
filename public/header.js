const toggle = document.getElementById("search-toggle");
const searchWrapper = document.querySelector(".search_wrapper");

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    searchWrapper.classList.add("active");
  } else {
    searchWrapper.classList.remove("active");
  }
});