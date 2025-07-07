

import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (error) {
        console.error(' Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []); 
  
  const addToCart = async (item) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = {
      productId: item.id || item._id || item.productId,
      selectedSize: item.selectedSize || 'Free Size',
      quantity: item.quantity || 1,
      price: item.price,
      originalPrice: item.originalPrice || item.price,
      discount: item.discount || 0,
      image: item.image,
      title: item.title,
      brand: item.brand,
    };

    try {
      const res = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setCartItems(data.items);
    } catch (error) {
      console.error(' Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId, selectedSize) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/cart/${productId}?size=${selectedSize}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setCartItems(data.items);
    } catch (error) {
      console.error(' Error removing from cart:', error);
    }
  };

  const updateCartItemSize = async (productId, oldSize, newSize) => {
    try {
      const existingItem = cartItems.find(
        (item) => item.productId === productId && item.selectedSize === oldSize
      );
      if (!existingItem) return;

      const newItem = {
        ...existingItem,
        selectedSize: newSize,
      };

      await removeFromCart(productId, oldSize);
      await addToCart(newItem);
    } catch (error) {
      console.error(' Error updating item size:', error);
    }
  };

  const updateCartItemQuantity = async (productId, selectedSize, newQuantity) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (newQuantity <= 0) {
      await removeFromCart(productId, selectedSize);
      return;
    }

    try {
      const existingItem = cartItems.find(
        (item) => item.productId === productId && item.selectedSize === selectedSize
      );
      if (!existingItem) return;

      const payload = {
        ...existingItem,
        quantity: newQuantity,
      };

      const res = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setCartItems(data.items);
    } catch (error) {
      console.error(' Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await fetch('http://localhost:5000/api/cart', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateCartItemSize,
        updateCartItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
