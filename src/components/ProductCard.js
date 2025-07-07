
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Copy } from 'lucide-react';
import './ProductCard.css';
import { useWishlist } from '../Contexts/WishlistContext';

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!item) return null;

 
  const isInWishlist = wishlistItems?.some(
    (product) => product._id === item._id
  );

  const handleWishlistClick = (e) => {
    e.stopPropagation();

    const wishlistItem = {
      ...item,
      selectedSize: item.selectedSize || 'Free Size',
    };

    if (isInWishlist) {
      removeFromWishlist(wishlistItem._id, wishlistItem.selectedSize);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleDotClick = (index, e) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const priceDrop =
    item.originalPrice && item.price
      ? item.originalPrice - item.price
      : 0;

  return (
    <div className="product-card">
      <div
        className="product-image-container"
        onClick={() => navigate(`/product/${item._id}`)} // ✅ Fix here
      >
        <img
          src={item.images?.[currentImageIndex] || '/images/placeholder.jpg'}
          alt={item.title}
          className="product-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/placeholder.jpg';
          }}
        />

        <button className="wishlist-btn" onClick={handleWishlistClick}>
          <Heart size={24} color={isInWishlist ? 'red' : 'black'} />
        </button>

        <button className="compare-btn" onClick={(e) => e.stopPropagation()}>
          <Copy size={24} />
        </button>

        <button className="nav-btn left show-on-hover" onClick={handlePrev}>
          ‹
        </button>
        <button className="nav-btn right show-on-hover" onClick={handleNext}>
          ›
        </button>

        <div className="slider-dots">
          {item.images?.map((_, index) => (
            <span
              key={index}
              className={`dot ${
                index === currentImageIndex ? 'active' : ''
              }`}
              onClick={(e) => handleDotClick(index, e)}
            ></span>
          ))}
        </div>
      </div>

      <div className="product-details">
        <h4 className="brand-name">{item.brand}</h4>
        <p className="product-title">{item.title}</p>

        <div className="price-block">
          <span className="current-price">₹{item.price}</span>
          {item.originalPrice && (
            <>
              <span className="original-price">₹{item.originalPrice}</span>
              <span className="discount">{item.discount}% off</span>
            </>
          )}
        </div>

        <div className="rating">
          <span className="rating-score">★ {item.rating}</span>
          <span className="review-count">({item.reviews})</span>
        </div>

        {item.showPriceDrop && priceDrop > 0 && (
          <div className="price-drop">Price dropped by ₹{priceDrop}</div>
        )}

        {item.limitedStock && (
          <div className="limited-stock">⏳ Limited stock available!</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
