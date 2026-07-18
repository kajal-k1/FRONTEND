

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BrandsDropdown.css';

const brandData = {
  "Women's Fashion": {
    popular: ['Varanga','Libas','Styli','Skylee','Lifestyle',],
    featured: [ 'Aarika',  'Aurelia', 'Juniper','Lov','Jockey' ]
  },
  "Men's Fashion": {
    popular: ['Cavallo', 'Linen Club', 'Raymond', 'Peter England'],
    featured: ['Jack & Jones','Mufti','Puma','Rigo']
  },
  "Kid's Fashion": {
    popular: ['HOP','3Pin',"612 League"],
    featured: ['HOP League',"Levi","Dresses"]
  },
  "Footwear": {
    popular: ['Hoversole', 'Chicco', 'Little Kangaroos', 'Gini & Jony'],
    featured: [ 'Campus',  'Reebok', 'Woodland']
  },
  
  
  "Watches": {
    popular: ['Adidas', 'Timex', 'Daniel Wellington'],
    featured: [ 'Sonata', 'Casio',  'Citizen']
  }
};

console.log(brandData["Women's Fashion"].popular);
const logoMap = {
  Westside: 'https://assets.tatacliq.com/medias/sys_master/images/46725345673246.jpg',
  Lifestyle: 'https://assets.tatacliq.com/medias/sys_master/images/46725345869854.jpg',
  PUMA: 'https://assets.tatacliq.com/medias/sys_master/images/46725345935390.jpg',
  W: 'https://assets.tatacliq.com/medias/sys_master/images/33013524955166.jpg',
  Pantaloons: 'https://assets.tatacliq.com/medias/sys_master/images/33013525348382.jpg',
};

const categories = Object.keys(brandData);

export default function BrandsDropdown() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const navigate = useNavigate();

  const handleBrandClick = (brand) => {
    navigate(`/products?brand=${encodeURIComponent(brand)}`);
  };

  return (
    <div className="brands-dropdown">
      <div className="brands-sidebar">
        {categories.map((cat) => (
          <div
            key={cat}
            className={`brands-category ${selectedCategory === cat ? 'active' : ''}`}
            onMouseEnter={() => setSelectedCategory(cat)}
            tabIndex={0}
            onFocus={() => setSelectedCategory(cat)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedCategory(cat);
            }}
            style={{ cursor: 'pointer' }}
          >
            {cat}
          </div>
        ))}
      </div>

      <div className="brands-content">
        <div className="brands-column">
          <h4>Popular brands</h4>
          <ul>
            {brandData[selectedCategory].popular.map((brand) => (
              <li
                key={brand}
                onClick={() => handleBrandClick(brand)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleBrandClick(brand);
                }}
                style={{ cursor: 'pointer' }}
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>
        <div className="brands-column">
          <h4>Featured brands</h4>
          <ul>
            {brandData[selectedCategory].featured.map((brand) => (
              <li
                key={brand}
                onClick={() => handleBrandClick(brand)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleBrandClick(brand);
                }}
                style={{ cursor: 'pointer' }}
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="brands-logos">
        {Object.keys(logoMap).map((brand) => (
          <div
            key={brand}
            className="brand-logo"
            onClick={() => handleBrandClick(brand)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleBrandClick(brand);
            }}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={logoMap[brand]}
              alt={brand}
              style={{ height: '40px', objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}



