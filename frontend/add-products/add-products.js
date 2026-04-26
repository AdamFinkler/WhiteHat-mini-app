const results = document.getElementById("results");

function renderProduct(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <div class="product-name">${product.name}</div>
    <div class="product-price">$${product.price}</div>
    <button class="delete-btn">×</button>
  `;

  card.querySelector(".delete-btn").addEventListener("click", () => {
    card.remove();
  });

  results.appendChild(card);
}