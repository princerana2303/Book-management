// Import React Router hooks for navigation
import { Link, useLocation } from "react-router-dom";

// Import sidebar styles
import "../styles/dashboard.css";

/**
 * ======================================================
 * SIDEBAR COMPONENT
 * ======================================================
 * 
 * Purpose:
 * - Display left navigation for authenticated users
 * - Show navigation links to important pages
 * - Highlight current active route
 * - Provide easy access to key features
 * 
 * Visibility:
 * - Only shown on protected/authenticated pages
 * - Hidden on Home, Login, Register pages
 */

const Sidebar = () => {

  /**
   * Get current route
   * Used to determine which link should be marked as "active"
   */
  const location = useLocation();

  /**
   * Navigation items for authenticated users
   * Each item has:
   * - path: URL route
   * - label: Display text
   */
  const navItems = [
    {
      path: "/books",
      label: "Books"
    },
    {
      path: "/",
      label: "Home"
    }
  ];

  /**
   * Check if a link is currently active
   * Returns true if link's path matches current location
   */
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="sidebar">

      {/* Sidebar title/header */}
      <div className="sidebar-title">
        Navigation
      </div>

      {/* Navigation links container */}
      <nav className="sidebar-nav">

        {/* Map through navigation items */}
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${isActive(item.path) ? "active" : ""}`}
          >
            {item.label}
          </Link>
        ))}

      </nav>

    </aside>
  );

};

// Export Sidebar component for use in App.jsx
export default Sidebar;
