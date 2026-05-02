export async function searchProductsRequest(name) {
    console.log('request provoked')
  const response = await fetch(
    `http://localhost:8000/products/search?name=${encodeURIComponent(name)}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Search failed");
  }

  return data;
}