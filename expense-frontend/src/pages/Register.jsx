import { useState } from "react";
import axios from "axios";

function Register({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/register",
        { name, email, password }
      );

      alert("Registration Successful");
      setPage("login");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Register</h1>
        <div className="space-y-4">
          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-shadow"
          />
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-shadow"
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-shadow"
          />
          <button
            onClick={handleRegister}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors"
          >
            Register
          </button>
        </div>
        <button
          onClick={() => setPage("login")}
          className="w-full mt-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default Register;