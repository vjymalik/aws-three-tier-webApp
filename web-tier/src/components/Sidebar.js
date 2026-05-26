export default function Sidebar({ currentPage, setPage }) {
  const links = [
    { id: "add",  label: "Add Transaction", icon: "➕" },
    { id: "view", label: "DB Table",         icon: "🗄️" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
          alt="AWS"
        />
        <span>Three-Tier App</span>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-label">Menu</p>

        <button
          className={`nav-item ${currentPage === "home" ? "active" : ""}`}
          onClick={() => setPage("home")}
        >
          <span className="nav-icon">🏠</span> Home
        </button>

        {links.map(link => (
          <button
            key={link.id}
            className={`nav-item ${currentPage === link.id ? "active" : ""}`}
            onClick={() => setPage(link.id)}
          >
            <span className="nav-icon">{link.icon}</span>
            {link.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}