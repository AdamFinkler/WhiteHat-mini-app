import express from "express";
import cors from "cors";
import { getAllProducts, addProduct, deleteProduct} from "./functions.js";


const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());


app.get("/products", getAllProducts);
app.post("/products", addProduct);
app.delete("/products/:id", deleteProduct);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});