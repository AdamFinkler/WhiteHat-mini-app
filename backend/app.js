import express from "express";
import cors from "cors";
import productsRouter from "./productsRouter.js";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 100,               // 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    error: "Too many requests. Please try again later.",
  },

  skipSuccessfulRequests: false,
});

app.use(cors());
app.use(express.json());



app.use("/products", productsRouter);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



