export function validateProduct(name, priceInputValue) {
  const errors = {};

  if (!name || !/[a-zA-Z]/.test(name)) {
    errors.name = "Name must contain letters";
  }

  if (name && name.length > 50) {
    errors.name = "Name is too long";
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