import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, Menu, X, LogIn, UserPlus, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Hotel className="logo-icon" />
          <span>LuxeStays</span>
        </Link>

        <div className="navbar-menu-icon" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
          
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-links" onClick={() => setIsOpen(false)}>
                  <User size={18} className="nav-icon" /> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline nav-btn" onClick={() => { logout(); setIsOpen(false); }}>
                  <LogOut size={18} /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links" onClick={() => setIsOpen(false)}>
                  <LogIn size={18} className="nav-icon" /> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="btn btn-primary nav-btn" onClick={() => setIsOpen(false)}>
                  <UserPlus size={18} /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
