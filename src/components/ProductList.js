
import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p className="no-products">No products found.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((item) => (
        <ProductCard key={item.id} item={item} ></ProductCard>
      ))}
    </div>
  );
};

export default ProductList;


