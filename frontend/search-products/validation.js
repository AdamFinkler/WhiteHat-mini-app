export function validateSearch(name) {
  const errors = {};

  if (!name || name.trim() === "") {
    errors.name = "Please enter a product name";
  }

  if (name && name.length > 50) {
    errors.name = "Search term is too long";
  }

  return errors;
}