import { useState } from "react";

const API = "/api";

export default function AddTransaction() {
  const [amount,      setAmount]      = useState("");
  const [description, setDescription] = useState("");
  const [message,     setMessage]     = useState(null);
  const [loading,     setLoading]     = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!amount || !description) {
      setMessage({ type: "error", text: "Both fields are required." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, description })
      });
      await res.json();
      setMessage({ type: "success", text: "Transaction added successfully!" });
      setAmount("");
      setDescription("");
    } catch {
      setMessage({ type: "error", text: "Failed to add transaction." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <p className="page-title">Add Transaction</p>
      <p className="page-subtitle">Submit a new record to RDS PostgreSQL via the Node.js API.</p>

      <div className="card" style={{ maxWidth: 480 }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Amount ($)</label>
            <input
              type="number"
              step="0.01"
              placeholder="e.g. 49.99"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              placeholder="e.g. AWS EC2 invoice"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Transaction"}
          </button>
          {message && (
            <div className={`alert alert-${message.type}`}>
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}