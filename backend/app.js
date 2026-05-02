import express from "express";
import cors from "cors";
import productsRouter from "./productsRouter.js";


const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());



app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


