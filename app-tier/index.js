let express = require("express");
let cors    = require("cors");
let {
  getTransactions,
  addTransaction,
  deleteTransaction
} = require("./transaction");

let app  = express();
let PORT = 4000;

app.use(cors());
app.use(express.json());

// ── Root route ─────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "App tier is running!" });
});

// ── Health check — Internal ALB pings this ─────────
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// ── GET all transactions ───────────────────────────
// Called by ViewTransactions.js page
app.get("/transaction", async (req, res) => {
  try {
    let data = await getTransactions();
    res.json(data);
  } catch (err) {
    console.error("GET /transaction error:", err.message);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// ── POST add transaction ───────────────────────────
// Called by AddTransaction.js page
app.post("/transaction", async (req, res) => {
  let { amount, description } = req.body;

  if (!amount || !description) {
    return res.status(400).json({ error: "Amount and description are required" });
  }

  try {
    let data = await addTransaction(amount, description);
    res.status(201).json(data);
  } catch (err) {
    console.error("POST /transaction error:", err.message);
    res.status(500).json({ error: "Failed to add transaction" });
  }
});

// ── DELETE transaction ─────────────────────────────
// Called by ViewTransactions.js delete button
app.delete("/transaction/:id", async (req, res) => {
  let { id } = req.params;

  try {
    await deleteTransaction(id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    console.error("DELETE /transaction error:", err.message);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

app.listen(PORT, () => {
  console.log(`App tier running on port ${PORT}`);
});