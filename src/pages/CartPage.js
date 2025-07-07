
import React from 'react';
import { useCart } from '../Contexts/CartContext';
import { useWishlist } from '../Contexts/WishlistContext';
import './CartPage.css';
import CartSummary from './CartSummary';

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

const CartPage = () => {
  const {
    cartItems = [],
    removeFromCart,
    updateCartItemSize,
    updateCartItemQuantity,
  } = useCart();

  const { addToWishlist, wishlist = [] } = useWishlist();

  const handleSaveToWishlist = (item) => {
    const wishlistItem = {
      ...item,
      _id: item.productId, 
      selectedSize: item.selectedSize || 'Free Size',
    };

    if (!wishlistItem._id || wishlistItem._id.length !== 24 || !wishlistItem.selectedSize) {
      alert('Cannot add to wishlist: missing product ID or size.');
      return;
    }

    addToWishlist(wishlistItem);
    removeFromCart(item.productId, item.selectedSize); 
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = Math.floor(total * 0.077);

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        <h2 className="cart-heading">My Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-list">
            {cartItems.map((item, index) => (
              <div
                key={`${item.productId}-${item.selectedSize}-${index}`}
                className="cart-item"
              >
                <img
                  src={item.image || '/images/placeholder.jpg'}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <p className="brand">{item.brand}</p>
                    <p className="title">{item.title}</p>
                    <div className="price-row">
                      <span className="price">₹{item.price}</span>
                    </div>
                  </div>

                  <div className="size-qty-row">
                    <label>
                      Size:
                      <select
                        value={item.selectedSize}
                        onChange={(e) =>
                          updateCartItemSize(item.productId, item.selectedSize, e.target.value)
                        }
                      >
                        {SIZE_OPTIONS.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Qty:
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartItemQuantity(item.productId, item.selectedSize, parseInt(e.target.value))
                        }
                      >
                        {[1, 2, 3, 4, 5].map((qty) => (
                          <option key={qty} value={qty}>
                            {qty}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="cart-actions">
                    <span className="delivery-date">Delivery in 5–7 days</span>
                    <div className="action-buttons">
                      <button
                        className="wishlist-button"
                        onClick={() => handleSaveToWishlist(item)}
                      >
                        Save to Wishlist
                      </button>
                      <button
                        className="remove-button"
                        onClick={() =>
                          removeFromCart(item.productId, item.selectedSize)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="cart-summary-container">
        <CartSummary total={total} discount={discount} wishlistCount={wishlist.length} />
      </div>
    </div>
  );
};

export default CartPage;
