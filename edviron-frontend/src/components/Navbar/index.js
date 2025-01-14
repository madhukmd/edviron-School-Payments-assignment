import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { FaRegSun, FaRegMoon, FaBars, FaTimes } from "react-icons/fa";
import "./index.css";

function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [isOpen, setIsopen] = useState(false);

  return (
    <>
      <>
        <nav className="navbar">
          <h1 className="nav-heading">School Payment Dashboard</h1>
          <ul className="nav-links">
            <Link to="/">
              <li>Dashboard</li>
            </Link>
            <Link to="/school-transactions">
              <li>School Transactions</li>
            </Link>
            <Link to="/status-check">
              <li> Status Check</li>
            </Link>
            <button onClick={toggleDarkMode} className="theme-toggle">
              {darkMode ? <FaRegSun /> : <FaRegMoon />}
            </button>
          </ul>
        </nav>
      </>
      <>
        <div className="mobile-container">
          <nav className="navbar-mobile">
            <h1 className="nav-heading">SPD</h1>
            <button
              type="button"
              onClick={() => {
                setIsopen(!isOpen);
              }}
              className="theme-toggle"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </nav>
          <ul className={`nav-links-mobile ${isOpen ? "open" : ""}`}>
            <li className="item">
              <Link to="/" className="nav-line">
                Dashboard
              </Link>
            </li>
            <li className="item">
              <Link to="/school-transactions" className="nav-line">
                School Transactions
              </Link>
            </li>
            <li className="item">
              <Link to="/status-check" className="nav-line">
                Status Check
              </Link>
            </li>
            <button onClick={toggleDarkMode} className="mobile-icon">
              {darkMode ? <FaRegSun /> : <FaRegMoon />}
            </button>
          </ul>
        </div>
      </>
    </>
  );
}

export default Navbar;
