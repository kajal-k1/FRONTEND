

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import categories from './categoryData';
import './CategoryDropdown.css';

const categoryKeys = Object.keys(categories);
const normalize = (str) => (str ? str.toLowerCase().replace(/\s+/g, '-') : '');

export default function CategoryDropdown() {
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate(`/category/${normalize(item)}`);
  };

  return (
    <div className="category-dropdown">
      <div className="category-sidebar">
        {categoryKeys.map((cat) => (
          <div
            key={cat}
            className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
            onMouseEnter={() => setSelectedCategory(cat)}
            tabIndex={0}
            onFocus={() => setSelectedCategory(cat)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedCategory(cat);
            }}
          >
            {cat}
          </div>
        ))}
      </div>

      <div className="category-content">
        {Object.entries(categories[selectedCategory]).map(([section, items]) => (
          <div key={section} className="category-column">
            <h4>{section}</h4>
            <ul>
              {items.map((item) => (
                <li
                  key={item}
                  onClick={() => handleItemClick(item)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleItemClick(item);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}


