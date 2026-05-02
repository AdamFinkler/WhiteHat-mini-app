export async function addProductRequest({ name, price }) {
  const response = await fetch("http://localhost:8000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to add product");
  }

  return data;
}


