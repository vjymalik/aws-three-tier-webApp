import { useEffect, useState } from "react";

const API = "/api";

export default function ViewTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [message,      setMessage]      = useState(null);

  useEffect(() => { fetchTransactions(); }, []);

  async function fetchTransactions() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/transaction`);
      const data = await res.json();
      setTransactions(data);
    } catch {
      setMessage({ type: "error", text: "Failed to load transactions." });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`${API}/transaction/${id}`, { method: "DELETE" });
      setTransactions(transactions.filter(t => t.id !== id));
      setMessage({ type: "success", text: "Transaction deleted." });
    } catch {
      setMessage({ type: "error", text: "Failed to delete." });
    }
  }

  return (
    <div>
      <p className="page-title">DB Table</p>
      <p className="page-subtitle">All transactions stored in RDS PostgreSQL.</p>

      {message && (
        <div className={`alert alert-${message.type}`} style={{ marginBottom: 16 }}>
          {message.text}
        </div>
      )}

      <div className="card">
        {loading ? (
          <p style={{ color: "#888", fontSize: 14 }}>Loading...</p>
        ) : transactions.length === 0 ? (
          <p style={{ color: "#888", fontSize: 14 }}>No transactions yet. Add one first.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={t.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ color: "#aaa" }}>#{t.id}</td>
                  <td className="badge-amount">${parseFloat(t.amount).toFixed(2)}</td>
                  <td>{t.description}</td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button className="btn-primary" onClick={fetchTransactions}>
        Refresh
      </button>
    </div>
  );
}