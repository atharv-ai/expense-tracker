import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {page === "login" && <Login setPage={setPage} />}
      {page === "register" && <Register setPage={setPage} />}
      {page === "dashboard" && <Dashboard />}
    </div>
  );
}

export default App;