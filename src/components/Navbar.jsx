import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">Task Manager</div>
      
      <button 
        className="hamburger" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/create" onClick={() => setIsMenuOpen(false)}>Create Task</Link>
      </div>

      <style jsx>{`
        .navbar {
          background: #333;
          color: white;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .navbar-brand {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .hamburger {
          display: block;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
        }

        .nav-links {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #333;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
          padding: 0 1rem;
        }

        .nav-links.active {
          max-height: 500px;
          padding: 1rem;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          padding: 1rem 0;
          border-bottom: 1px solid #444;
          transition: background-color 0.3s;
        }

        .nav-links a:last-child {
          border-bottom: none;
        }

        .nav-links a:hover {
          background-color: #444;
        }

        @media (min-width: 768px) {
          .hamburger {
            display: none;
          }

          .nav-links {
            position: static;
            flex-direction: row;
            max-height: none;
            gap: 1.5rem;
            padding: 0;
            background: transparent;
          }

          .nav-links a {
            padding: 0.5rem;
            border-bottom: none;
          }

          .nav-links a:hover {
            background-color: transparent;
            text-decoration: underline;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;