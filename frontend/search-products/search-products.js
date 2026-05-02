import { searchProductsRequest } from "./requests.js";
import { validateSearch } from "./validation.js";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const results = document.getElementById("results");
const errorMessage = document.getElementById("search-error");

function renderProduct(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const name = document.createElement("div");
  name.className = "product-name";
  name.textContent = product.name;

  const price = document.createElement("div");
  price.className = "product-price";
  price.textContent = `$${product.price}`;

  card.appendChild(name);
  card.appendChild(price);

  results.appendChild(card);
}

function renderEmpty() {
  const empty = document.createElement("div");
  empty.className = "empty-message";
  empty.textContent = "No products found";

  results.appendChild(empty);
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add("active");
  searchInput.classList.add("input-error");
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.remove("active");
  searchInput.classList.remove("input-error");
}

async function searchProducts() {
  const name = searchInput.value.trim();

  clearError();
  results.innerHTML = "";

  const errors = validateSearch(name);

  if (errors.name) {
    showError(errors.name);
    return;
  }

  try {
    const data = await searchProductsRequest(name);

    if (data.length === 0) {
      renderEmpty();
      return;
    }

    data.forEach(renderProduct);
  } catch (err) {
    showError(err.message);
  }
}

function handleSearchClick() {
  searchProducts();
}

function handleSearchInput() {
  clearError();
}

function handleSearchEnter(event) {
  if (event.key === "Enter") {
    searchProducts();
  }
}

searchBtn.addEventListener("click", handleSearchClick);
searchInput.addEventListener("input", handleSearchInput);
searchInput.addEventListener("keydown", handleSearchEnter);