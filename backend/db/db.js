import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "../products.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("DB connection failed:", err.message);
  } else {
    console.log("Connected to SQLite database:", dbPath);
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    price REAL NOT NULL
  )
`);

export default db;