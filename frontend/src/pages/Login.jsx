import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showRegister, setShowRegister] = useState(false); // Show register option if invalid
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);

      // Redirect based on role
      if (res.data.role === "admin") {
        navigate("/admin"); // Admin Panel route
      } else {
        navigate("/dashboard"); // User Dashboard route
      }
    } catch (err) {
      if (err.response?.data?.message === "Invalid credentials") {
        setShowRegister(true);
        alert("User not registered. Please register first.");
      } else {
        alert(err.response?.data?.message || "Something went wrong");
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {showRegister && (
        <div style={{ marginTop: "10px" }}>
          <p>Don't have an account?</p>
          <button onClick={handleRegisterRedirect}>Register</button>
        </div>
      )}
    </div>
  );
};

export default Login;
