export const getAllProductsQuery = `
  SELECT * FROM products
`;

export const addProductQuery = `
  INSERT INTO products (name, price)
  VALUES (?, ?)
`;

export const deleteProductQuery = `
  DELETE FROM products
  WHERE id = ?
`;