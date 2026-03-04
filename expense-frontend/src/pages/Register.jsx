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
    <div>
      <h1>Register Page</h1>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>

      <br />

      <button onClick={() => setPage("login")}>
        Go to Login
      </button>
    </div>
  );
}

export default Register;