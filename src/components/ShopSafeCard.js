
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ShopSafeCard.css';

 const secureIconUrl = 'https://img.freepik.com/premium-vector/pink-shield-with-large-lock-middle-that-says-security-it_42077-16283.jpg'; // Replace with your actual image URL

const ShopSafeCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/secure-shopping');
  };

  return (
    <div className="shop-safe-card" onClick={handleClick}>
      <div className="shop-safe-card-text">
        <h2>SHOP SMART & STAY SAFE</h2>
        <p>
          Trust only Tata CLiQ's official channels for exclusive offers.
          We DO NOT make telemarketing calls, host lucky draws, send QR codes, or request payments outside our official app or website.
        </p>
        <p>CLiQ to learn how you can enjoy a secure shopping experience.</p>
      </div>
      <img src={secureIconUrl} alt="Security Icon" />
    </div>
  );
};

export default ShopSafeCard;
