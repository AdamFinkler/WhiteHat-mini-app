import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./products.db", (err) => {
  if (err) {
    console.error("DB connection failed:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL
  )
`);

export default db;