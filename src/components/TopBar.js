
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaUser, FaClipboardList, FaHeart, FaBell, FaGift, FaMoneyBill,
} from 'react-icons/fa';
import { AuthContext } from '../Contexts/AuthContext';
import './TopBar.css';

const TopBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    console.log("AuthContext user:", user);
  }, [user]);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.login-register-wrapper')) {
        setShowMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  
  const handleLoginClick = () => {
    navigate('/login');
    setShowMenu(false);
  };

  
  const handleNavigation = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <span>Tata CLiQ Luxury</span>
      </div>

      <div className="top-bar-right">
        
        <Link to="/cliqcare" className="top-link">CLiQ Care</Link>
        

        <div
          className="login-register-wrapper"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <span className="login-register-link">
            {user ? `Hi, ${user.name || 'User'}` : 'Sign in / Sign up'}
          </span>

          {showMenu && (
            <div className="login-register-dropdown">
              {!user ? (
                <button className="login-dropdown-btn" onClick={handleLoginClick}>
                  Login / Register
                </button>
              ) : (
                <button
                  className="login-dropdown-btn"
                  onClick={() => {
                    logout();
                    navigate('/');
                    setShowMenu(false);
                  }}
                >
                  Logout
                </button>
              )}

              <ul className="dropdown-list">
                <li className="dropdown-item" onClick={() => handleNavigation('/my-account')}>
                  <FaUser className="icon" />
                  My Account
                </li>
                <li className="dropdown-item" onClick={() => handleNavigation('/orders')}>
                  <FaClipboardList className="icon" />
                  Order History
                </li>
                <li className="dropdown-item" onClick={() => handleNavigation('/wishlist')}>
                  <FaHeart className="icon" />
                  My Wishlist
                </li>
                <li className="dropdown-item" onClick={() => handleNavigation('/alerts')}>
                  <FaBell className="icon" />
                  Alerts & Coupon
                </li>
                <li className="dropdown-item" onClick={() => handleNavigation('/giftcard')}>
                  <FaGift className="icon" />
                  Gift Card
                </li>
                <li className="dropdown-item" onClick={() => handleNavigation('/cliqcash')}>
                  <FaMoneyBill className="icon" />
                  CLiQ Cash
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;

