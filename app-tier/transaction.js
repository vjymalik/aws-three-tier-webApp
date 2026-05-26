let { Pool } = require("pg");
let db = require("./DbConfig");

let pool = new Pool({
  host:     db.DB_HOST,
  user:     db.DB_USER,
  password: db.DB_PWD,
  database: db.DB_NAME,
  port:     db.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

// Test DB connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error("DB connection failed:", err.message);
  } else {
    console.log("Connected to RDS PostgreSQL");
    release();
  }
});

let getTransactions = async () => {
  let result = await pool.query(
    "SELECT * FROM transactions ORDER BY id DESC"
  );
  return result.rows;
};

let addTransaction = async (amount, description) => {
  let result = await pool.query(
    "INSERT INTO transactions (amount, description) VALUES ($1, $2) RETURNING *",
    [amount, description]
  );
  return result.rows[0];
};

let deleteTransaction = async (id) => {
  await pool.query(
    "DELETE FROM transactions WHERE id = $1",
    [id]
  );
};

module.exports = { getTransactions, addTransaction, deleteTransaction };