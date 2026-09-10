

import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FilterSidebar from './FilterSidebar';
import ProductList from './ProductList';
import SortDropdown from './SortDropdown';
import './CategoryPage.css';

const normalize = (str) => {
  if (typeof str !== 'string') return '';
  return str.toLowerCase().replace(/\s+/g, '-');
};

const useQuery = () => new URLSearchParams(useLocation().search);

const CategoryPage = () => {
  const { category } = useParams();
  const query = useQuery();

  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('Popularity');
  const [visibleCount, setVisibleCount] = useState(12);
  const [activeFilters, setActiveFilters] = useState({
    brand: [],
    productType: [],
    colour: [],
    category: [],
    size: [],
    price: [],
  });

  useEffect(() => {
    fetch('http://100.55.22.162:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const cleanProducts = products.filter(
    (p) =>
      p &&
      typeof p.category === 'string' &&
      typeof p.brand === 'string' &&
      typeof p.colour === 'string'
  );

  const brandQuery = query.get('brand');
  const normalizedCategory = normalize(category);
////////////////////////////////////
  const baseFilteredProducts = brandQuery
  ? cleanProducts.filter((p) => normalize(p.brand) === normalize(brandQuery))
  : cleanProducts.filter((p) => 
      normalize(p.category) === normalizedCategory ||
      (p.productType && normalize(p.productType) === normalizedCategory)
    );

///////////////////////////
  const filteredItems = baseFilteredProducts.filter((item) => {
    if (activeFilters.brand.length > 0 && !activeFilters.brand.includes(item.brand)) return false;
    if (
      activeFilters.productType.length > 0 &&
      (!item.productType || !activeFilters.productType.includes(item.productType))
    )
      return false;
    if (activeFilters.colour.length > 0 && !activeFilters.colour.includes(item.colour)) return false;
    if (activeFilters.category.length > 0 && !activeFilters.category.includes(item.category)) return false;
    if (
      activeFilters.size.length > 0 &&
      (!Array.isArray(item.size) || !item.size.some((size) => activeFilters.size.includes(size)))
    )
      return false;
    if (activeFilters.price.length > 0) {
      const isInRange = activeFilters.price.some(
        ({ min, max }) => item.price >= min && item.price <= max
      );
      if (!isInRange) return false;
    }
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortOption) {
      case 'Price Low to High':
        return a.price - b.price;
      case 'Price High to Low':
        return b.price - a.price;
      case 'Discounts':
        return b.discount - a.discount;
      case 'New Arrivals':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const visibleProducts = sortedItems.slice(0, visibleCount);

  return (
    <div className="category-page">
      <h3 className="heading">
        {brandQuery
          ? `Showing ${brandQuery} Products`
          : `${category.replace(/-/g, ' ')} For Shop`}
      </h3>

      <div className="content-layout" style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 250px', marginRight: '20px' }}>
          <FilterSidebar
            selectedFilters={activeFilters}
            onFilterChange={setActiveFilters}
            products={baseFilteredProducts}
          />
        </div>
        <div style={{ flex: 1 }}>
          <SortDropdown onSortChange={setSortOption} />
          <ProductList products={visibleProducts} />

          {visibleCount < sortedItems.length && (
            <button
              className="show-more-btn"
              onClick={() => setVisibleCount((prev) => prev + 12)}
            >
              Show More Products
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

