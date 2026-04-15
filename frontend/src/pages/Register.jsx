import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";   // added Link
import api from "../api/axios";
import "../styles/auth.css";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setError("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      await api.post("/auth/register", formData);

      navigate("/login", {
        state: {
          message: "Registration successful. Please login."
        }
      });

    } catch (err) {

      const message =
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again.";
      setError(message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-bg">
        <div className="auth-shape auth-shape-1"></div>
        <div className="auth-shape auth-shape-2"></div>
        <div className="auth-shape auth-shape-3"></div>
        <div className="auth-shape auth-shape-4"></div>
        <div className="auth-shape auth-shape-5"></div>
      </div>

      <div className="auth-card">

        <div className="auth-brand">
          <span>📚</span>
          <div>
            <h2>Register</h2>
            <p>Create your account for a smarter library workflow.</p>
          </div>
        </div>

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>

        </form>

        {/* Added login link for better user flow */}
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </p>

      </div>

    </div>

  );

};

export default Register;