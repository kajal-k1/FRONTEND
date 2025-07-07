
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../Contexts/CartContext';
import './ProductDetail.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`, { signal });
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.images[0]);

        const relatedResponse = await fetch(`http://localhost:5000/api/products/related/${id}`, { signal });
        if (!relatedResponse.ok) throw new Error('Failed to fetch related products');
        const relatedData = await relatedResponse.json();
        setRelatedProducts(relatedData);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
    return () => controller.abort();
  }, [id]);

  const handleThumbnailClick = (image) => setSelectedImage(image);

  const handleAddToBag = () => {
    if (product.size?.length > 0 && !selectedSize) {
      alert('Please select a size before adding to bag.');
      return;
    }

    const cartItem = {
      productId: product._id,
      selectedSize,
      quantity: 1,
      title: product.title,
      brand: product.brand,
      image: selectedImage || product.images?.[0] || '/images/placeholder.jpg',
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
    };

    addToCart(cartItem);
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    if (product.size?.length > 0 && !selectedSize) {
      alert('Please select a size before buying.');
      return;
    }

    const cartItem = {
      productId: product._id,
      selectedSize,
      quantity: 1,
      title: product.title,
      brand: product.brand,
      image: selectedImage || product.images?.[0] || '/images/placeholder.jpg',
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
    };

    addToCart(cartItem);
    navigate('/checkout');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-detail-container">
      <div className="breadcrumb">Home &gt; {product.category} &gt; {product.title}</div>

      <div className="product-detail-content">
        <div className="left-images">
          <div className="thumbnail-column">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumbnail-${index}`}
                className={`thumbnail ${selectedImage === img ? 'selected' : ''}`}
                onClick={() => handleThumbnailClick(img)}
              />
            ))}
          </div>
          <div className="main-image-container">
            <img src={selectedImage} alt={product.title} className="main-image" />
          </div>
        </div>

        <div className="right-info">
          <h2 className="product-brand">{product.brand}</h2>
          <p className="product-title">{product.title}</p>

          <div className="price-section">
            <span className="price">₹{product.price}</span>
            <span className="original-price">₹{product.originalPrice}</span>
            <span className="discount">{product.discount}% Off</span>
          </div>

          {product.priceDrop > 0 && (
            <div className="price-drop-info">Price dropped by ₹{product.priceDrop} in the last 5 days</div>
          )}

          {product.limitedStock && (
            <div className="limited-stock-warning">⚠️ Limited stock available!</div>
          )}

          <div className="ratings-reviews">
            <span className="rating">⭐ {product.rating}</span>
            <span className="reviews">({product.reviews} Reviews)</span>
          </div>

          <div className="size-section">
            <strong>Select Size:</strong>
            <div className="sizes">
              {product.size?.length > 0 ? (
                product.size.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p>Free Size</p>
              )}
            </div>
            <p className="size-note">Please check Size chart table to know exact size to be ordered.</p>
          </div>

          <div className="delivery-checker">
            <label htmlFor="pincode">Delivery: </label>
            <input id="pincode" placeholder="Enter Pincode" />
            <button className="check-btn">Check</button>
          </div>

          <div className="action-buttons">
            <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
            <button className="add-to-bag" onClick={handleAddToBag}>Add To Bag</button>
          </div>
        </div>
      </div>

      <div className="similar-products-section">
        <h3>Similar Products</h3>
        <div className="similar-products-scroll">
          {relatedProducts.slice(0, 5).map((item) => (
            <div
              key={item._id}
              className="similar-product-card"
              onClick={() => navigate(`/product/${item._id}`)}
            >
              <img src={item.images[0]} alt={item.title} className="similar-product-image" />
              <div className="similar-product-info">
                <p className="brand">{item.brand}</p>
                <p className="title">{item.title.slice(0, 40)}...</p>
                <div className="price-block">
                  <span className="price">₹{item.price}</span>
                  <span className="original-price">₹{item.originalPrice}</span>
                  <span className="discount">{item.discount}% off</span>
                </div>
                <div className="rating-block">
                  ⭐ {item.rating} <span>({item.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
