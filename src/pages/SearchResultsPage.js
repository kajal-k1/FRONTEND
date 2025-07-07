
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';
import FilterSidebar from '../components/FilterSidebar';
import SortDropdown from '../components/SortDropdown';

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResultsPage = () => {
  const query = useQuery();
  const searchTerm = query.get('q')?.toLowerCase() || '';

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    productType: [],
    colour: [],
    category: [],
    size: [],
    price: [],
  });
  const [sortOption, setSortOption] = useState('');

  
  useEffect(() => {
    setSelectedFilters({
      brand: [],
      productType: [],
      colour: [],
      category: [],
      size: [],
      price: [],
    });
    setSortOption('');
  }, [searchTerm]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
        );
        setAllProducts(filtered);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, [searchTerm]);

  useEffect(() => {
    let products = [...allProducts];

   
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (key === 'price' && values.length > 0) {
        products = products.filter(product =>
          values.some(range => product.price >= range.min && product.price <= range.max)
        );
      } else if (values.length > 0) {
        products = products.filter(product => {
          const productValue = Array.isArray(product[key]) ? product[key] : [product[key]];
          return values.some(v => productValue.includes(v));
        });
      }
    });

 
    if (sortOption === 'lowToHigh') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'highToLow') {
      products.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'discounts') {
      products.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    } else if (sortOption === 'newArrivals') {
      products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(products);
  }, [allProducts, selectedFilters, sortOption]);

  return (
    <div className="search-results-page" style={{ display: 'flex', padding: '20px' }}>
      <div style={{ flex: '1', maxWidth: '250px', marginRight: '20px' }}>
        <FilterSidebar
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
          products={allProducts}
        />
      </div>

      <div style={{ flex: '3' }}>
        <h3 style={{ marginBottom: '1rem' }}>
          Search Results for "<strong>{searchTerm}</strong>"
        </h3>

        <SortDropdown onSortChange={setSortOption} />

        {filteredProducts.length > 0 ? (
          <ProductList products={filteredProducts} />
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
