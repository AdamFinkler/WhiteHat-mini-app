import express from "express";
import {getAllProducts, addProduct, deleteProduct, searchProduct} from "./functions.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.get("/search", searchProduct);

export default router;