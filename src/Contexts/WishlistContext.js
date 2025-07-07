

import React, { createContext, useState, useEffect, useContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);


  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/wishlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (Array.isArray(data.products)) {
          const normalized = data.products.map((item) => {
            const product = item.productId;
            const imageUrl =
              product.images?.[0]?.url ||
              (typeof product.images?.[0] === 'string'
                ? product.images[0]
                : null) ||
              '/images/placeholder.jpg';

            return {
              ...product,
              id: product._id,
              selectedSize: item.size,
              images: product.images || [],
              image: imageUrl,
            };
          });

          setWishlistItems(normalized);
        }
      } catch (error) {
        console.error(' Fetch wishlist error:', error);
      }
    };

    fetchWishlist(); 
  }, []);

  
  const addToWishlist = async (item) => {
    const token = localStorage.getItem('token'); 
    const itemId = item._id || item.id;
    const size = item.selectedSize;

    if (!itemId || itemId.length !== 24 || !size) {
      console.warn(' Invalid productId or size for addToWishlist:', { itemId, size });
      alert('Please select a size before adding to wishlist.');
      return;
    }

    const exists = wishlistItems.some(
      (p) => p.id === itemId && p.selectedSize === size
    );
    if (exists) return;

    try {
      const res = await fetch('http://localhost:5000/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: itemId, size }),
      });

      if (!res.ok) {
        console.error('Add wishlist failed:', await res.text());
        return;
      }

      await res.json();

      const imageUrl =
        item.images?.[0]?.url ||
        (typeof item.images?.[0] === 'string'
          ? item.images[0]
          : null) ||
        item.image ||
        '/images/placeholder.jpg';

      setWishlistItems((prev) => [
        ...prev,
        {
          ...item,
          id: itemId,
          selectedSize: size,
          images: item.images || [imageUrl],
          image: imageUrl,
        },
      ]);
    } catch (err) {
      console.error(' Wishlist add error:', err);
    }
  };

  
  const removeFromWishlist = async (itemId, selectedSize) => {
    const token = localStorage.getItem('token'); 

    try {
      if (!itemId || itemId.length !== 24 || !selectedSize) {
        console.warn('Invalid itemId or selectedSize');
        return;
      }

      const res = await fetch(
        `http://localhost:5000/api/wishlist/${itemId}?size=${encodeURIComponent(
          selectedSize
        )}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        console.error('Remove wishlist failed:', await res.text());
        return;
      }

      setWishlistItems((prev) =>
        prev.filter(
          (item) => !(item.id === itemId && item.selectedSize === selectedSize)
        )
      );
    } catch (error) {
      console.error(' Remove wishlist error:', error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
