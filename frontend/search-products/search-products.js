 import { searchProductsRequest } from "./requests.js";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const results = document.getElementById("results");
const errorMessage = document.getElementById("search-error");


function renderProduct(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <div class="product-name">${product.name}</div>
    <div class="product-price">$${product.price}</div>
  `;

  results.appendChild(card);
}

function renderEmpty() {
  results.innerHTML = `<div class="empty-message">No products found</div>`;
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

  if (!name) {
    showError("Please enter a product name");
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