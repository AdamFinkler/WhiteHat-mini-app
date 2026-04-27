const results = document.getElementById("results");

function renderProduct(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <div class="product-name">${product.name}</div>
    <div class="product-price">$${product.price}</div>
    <button class="delete-btn">×</button>
  `;

  // ✅ delete only THIS card
  const deleteBtn = card.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    card.remove();
  });

  results.appendChild(card);
}

const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", () => {
  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");

  const name = nameInput.value.trim();
  const price = priceInput.value.trim();

  // ❗ prevent empty items
  if (!name || !price) {
    alert("Please enter both name and price");
    return;
  }

  renderProduct({
    name,
    price,
  });

  // clear inputs
  nameInput.value = "";
  priceInput.value = "";

  // optional: focus back to first input
  nameInput.focus();
});