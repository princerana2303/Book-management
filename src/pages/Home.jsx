// Home page component that introduces the Book Management System project

// Import CSS styles specific to the Home (Hero) page
import "../styles/home.css";

// Import Link for navigation
import { Link } from "react-router-dom";

// Functional component for Home page
const Home = () => {
  return (
    <div className="hero-container">
      {/* Animated background elements */}
      <div className="hero-bg">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
      </div>

      {/* Main hero content */}
      <div className="hero-content">
        {/* Hero header with animated elements */}
        <div className="hero-header">
          <div className="hero-icon">
            <span>📚</span>
          </div>
          <h1 className="hero-title">
            Welcome to <span className="highlight">BookHub</span>
          </h1>
          <p className="hero-subtitle">
            Your ultimate digital library management system
          </p>
        </div>

        {/* Feature cards */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Secure Authentication</h3>
            <p>JWT-based login system with role management</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📖</div>
            <h3>Book Management</h3>
            <p>Add, edit, delete, and organize your book collection</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Search</h3>
            <p>Find books instantly with advanced search and filters</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Data Analytics</h3>
            <p>Track reading progress and library statistics</p>
          </div>
        </div>

        {/* Tech stack showcase */}
        <div className="tech-stack">
          <h3>Built with Modern Technologies</h3>
          <div className="tech-icons">
            <div className="tech-item">
              <span className="tech-icon">⚛️</span>
              <span>React</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🚀</span>
              <span>Vite</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🟢</span>
              <span>Node.js</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🍃</span>
              <span>MongoDB</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🔐</span>
              <span>JWT</span>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="cta-section">
          <p className="cta-text">
            Ready to organize your digital library?
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-btn primary">
              <span>🚀</span>
              Get Started
            </Link>
            <Link to="/login" className="cta-btn secondary">
              <span>👤</span>
              Sign In
            </Link>
          </div>
        </div>

        {/* Stats section */}
        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Books Managed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Happy Users</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Access</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export Home component so it can be used in routing
export default Home;