

import React, { useState } from 'react';

const SortDropdown = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = (e) => {
    const selected = e.target.value;
    setSortOption(selected);

    
    let sortKey = '';
    switch (selected) {
      case 'Price Low to High':
        sortKey = 'lowToHigh';
        break;
      case 'Price High to Low':
        sortKey = 'highToLow';
        break;
      case 'Discounts':
        sortKey = 'discounts';
        break;
      case 'New Arrivals':
        sortKey = 'newArrivals';
        break;
      default:
        sortKey = '';
    }

    onSortChange(sortKey);
  };

  return (
    <div className="sort-dropdown" style={{ marginBottom: '1rem' }}>
      <label className="mr-2 font-semibold text-gray-600">Sort by:</label>
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="border rounded px-2 py-1"
      >
        <option value="">Popularity</option>
        <option value="Price Low to High">Price Low to High</option>
        <option value="Price High to Low">Price High to Low</option>
        <option value="New Arrivals">New Arrivals</option>
        <option value="Discounts">Discounts</option>
      </select>
    </div>
  );
};

export default SortDropdown;

