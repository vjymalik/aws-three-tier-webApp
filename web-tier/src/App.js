import { useState } from "react";
import Sidebar from "./components/Sidebar.js";
import Home from "./pages/Home.js";
import AddTransaction from "./pages/AddTransaction.js";
import ViewTransactions from "./pages/ViewTransactions.js";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    if (page === "add")  return <AddTransaction />;
    if (page === "view") return <ViewTransactions />;
    return <Home setPage={setPage} />;
  };

  return (
    <div className="layout">
      <Sidebar currentPage={page} setPage={setPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}