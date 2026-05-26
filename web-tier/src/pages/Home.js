export default function Home({ setPage }) {
  return (
    <div>
      {/* Hero image */}
      <div style={{
        width: "100%", height: 220, borderRadius: 12, overflow: "hidden",
        marginBottom: 28, position: "relative"
      }}>
        <img
          src="https://d1.awsstatic.com/architecturediagrams/ArchitectureDiagrams_HeroImage_01.2a2a7a7a5a7a7a7a7a7a7a7a7a7a7a7a.png"
          alt="AWS Architecture"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => {
            e.target.style.display = "none";
            e.target.parentNode.style.background =
              "linear-gradient(135deg, #232f3e 0%, #FF9900 100%)";
            e.target.parentNode.innerHTML =
              `<div style="display:flex;align-items:center;justify-content:center;
                height:100%;color:#fff;font-size:28px;font-weight:700;
                letter-spacing:1px;">AWS Three-Tier Architecture</div>`;
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(35,47,62,0.7) 0%, transparent 60%)",
          display: "flex", alignItems: "center", padding: "0 36px"
        }}>
          <div>
            <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>
              Welcome to Three-Tier App
            </h1>
            <p style={{ color: "#ffd580", fontSize: 14 }}>
              Node.js · PostgreSQL · AWS EC2 · Auto Scaling
            </p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Web Tier",  value: "EC2 + nginx",      color: "#FF9900" },
          { label: "App Tier",  value: "Node.js + Express", color: "#232f3e" },
          { label: "Data Tier", value: "RDS PostgreSQL",    color: "#1a9e75" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: 10, padding: "20px 22px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            borderTop: `3px solid ${s.color}`
          }}>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{s.label}</p>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#232f3e" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Quick action cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="card" style={{ cursor: "pointer" }} onClick={() => setPage("add")}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>➕</div>
          <h3 style={{ fontSize: 16, marginBottom: 6 }}>Add Transaction</h3>
          <p style={{ fontSize: 13, color: "#888" }}>
            Submit a new transaction to the database via the Node.js API.
          </p>
        </div>
        <div className="card" style={{ cursor: "pointer" }} onClick={() => setPage("view")}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🗄️</div>
          <h3 style={{ fontSize: 16, marginBottom: 6 }}>View DB Table</h3>
          <p style={{ fontSize: 13, color: "#888" }}>
            Browse all transactions stored in RDS PostgreSQL.
          </p>
        </div>
      </div>
    </div>
  );
}