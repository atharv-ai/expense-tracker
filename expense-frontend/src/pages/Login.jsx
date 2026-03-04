import { useState } from "react";
import axios from "axios";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      setPage("dashboard");
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <br />

      <button onClick={() => setPage("register")}>
        Go to Register
      </button>
    </div>
  );
}

export default Login;