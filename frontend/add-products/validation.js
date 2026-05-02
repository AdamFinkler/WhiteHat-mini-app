export function validateProduct(name, priceInputValue) {
  const errors = {};

  if (!name || !/[a-zA-Z]/.test(name)) {
    errors.name = "Name must contain letters";
  }

  const price = Number(priceInputValue);

  if (priceInputValue.trim() === "" || Number.isNaN(price)) {
    errors.price = "Price must be a number";
  }

  return {
    errors,
    price, 
  };
}