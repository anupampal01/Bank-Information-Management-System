import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./components/AdminPanel";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function HomePage() {    
  return (
    <div className="home">
      <section className="hero">
        <h1>Bank Information Management System</h1>
        <p>Securely manage your bank accounts, view details, and access real‑time updates — all in one place.</p>
        <div className="cta-buttons">
          <a href="/register" className="btn primary">Get Started</a>
          <a href="/about" className="btn secondary">Learn More</a>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🔐 Secure Authentication</h3>
          <p>Sign up and log in with industry‑grade password hashing for maximum security.</p>
        </div>
        <div className="feature-card">
          <h3>🏦 Multi‑Account Management</h3>
          <p>Easily add, edit, and manage multiple bank accounts in one dashboard.</p>
        </div>
        <div className="feature-card">
          <h3>📊 Admin Control</h3>
          <p>Admins can view and filter user bank data for better management.</p>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ paddingBottom: "60px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
