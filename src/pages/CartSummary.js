
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Contexts/CartContext';
import { useWishlist } from '../Contexts/WishlistContext';
import './CartSummary.css'; 

const CartSummary = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { wishlistCount } = useWishlist();

  const totalMRP = cartItems.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );

  const discountedPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalDiscount = totalMRP - discountedPrice;
  const finalTotal = discountedPrice;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="cart-summary-box">
      <h3>Price Summary</h3>

      <div className="summary-row">
        <span>Total MRP</span>
        <span>₹{totalMRP.toLocaleString('en-IN')}</span>
      </div>

      <div className="summary-row">
        <span>Discount</span>
        <span className="green-text">- ₹{totalDiscount.toLocaleString('en-IN')}</span>
      </div>

      <div className="summary-row">
        <span>Processing Fee</span>
        <span className="free-text">FREE</span>
      </div>

      <hr />

      <div className="summary-row total-row">
        <strong>Total Amount</strong>
        <strong>₹{finalTotal.toLocaleString('en-IN')}</strong>
      </div>

      {totalDiscount > 0 && (
        <p className="green-text small">
          You saved ₹{totalDiscount.toLocaleString('en-IN')} on this order
        </p>
      )}

      <button className="checkout-button" onClick={handleCheckout}>
        Proceed to Checkout
      </button>

      <div className="wishlist-info">
        <FaHeart className="wishlist-icon" />
        You have {wishlistCount} item{wishlistCount !== 1 ? 's' : ''} in your wishlist.
        <span className="see-all"> See All</span>
      </div>

      <div className="secure-box">
        <ShieldCheck className="secure-icon" />
        Safe and secure payments. Easy returns.{' '}
        <strong>100% Authentic products.</strong>
      </div>
    </div>
  );
};

export default CartSummary;
