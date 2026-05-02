import db from "./db/db.js";
import { getAllProductsQuery, addProductQuery, deleteProductQuery, searchProductQuery} from "./db/queries.js";



export function getAllProducts(req, res) {
  db.all(getAllProductsQuery, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "internal server error" });
    }

    res.json(rows);
  });
}

export function addProduct(req, res) {
  const { name, price } = req.body;

  const trimmedName = name?.trim();

  /* ---------- VALIDATION ---------- */

  if (
    typeof trimmedName !== "string" ||
    trimmedName === "" ||
    !/[a-zA-Z]/.test(trimmedName)
  ) {
    return res.status(400).json({
      error: "Name must be a string that contains letters",
    });
  }

  if (typeof price !== "number" || Number.isNaN(price)) {
    return res.status(400).json({
      error: "Price must be a number",
    });
  }


  db.run(addProductQuery, [trimmedName, price], function (err) {
    if (err) {
      // ✅ duplicate product
      if (err.message.includes("UNIQUE")) {
        return res.status(409).json({
          error: "Product already exists",
        });
      }

      return res.status(500).json({
        error: "internal server error",
      });
    }


    return res.status(201).json({
      id: this.lastID,
      name: trimmedName,
      price,
    });
  });
}

export function deleteProduct(req, res) {
  const { id } = req.params;

  // validate id
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid product id" });
  }

  db.run(deleteProductQuery, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "internal server error" });
    }

    
    if (this.changes === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      message: "Product deleted successfully",
      id: Number(id),
    });
  });
}

export function searchProduct(req, res) {
  const { name } = req.query;

  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    !/[a-zA-Z]/.test(name)
  ) {
    return res.status(400).json({
      error: "Search name must contain letters",
    });
  }

  db.all(searchProductQuery, [name.trim()], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "internal server error" });
    }

    res.json(rows);
  });
}