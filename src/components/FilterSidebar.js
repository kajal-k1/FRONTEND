

 import React, { useState } from 'react';
 import './FilterSidebar.css';

 const FilterSidebar = ({ selectedFilters, onFilterChange, products }) => {
   const [typeOpen, setTypeOpen] = useState(true);
   const [brandOpen, setBrandOpen] = useState(true);
   const [colorOpen, setColorOpen] = useState(true);
   const [categoryOpen, setCategoryOpen] = useState(true);
   const [sizeOpen, setSizeOpen] = useState(true);
   const [priceOpen, setPriceOpen] = useState(true);

   const priceRanges = [
     { label: '₹0–₹500', min: 0, max: 500 },
     { label: '₹501–₹1,000', min: 501, max: 1000 },
     { label: '₹1,001–₹1,500', min: 1001, max: 1500 },
     { label: '₹1,501–₹2,000', min: 1501, max: 2000 },
     { label: '₹2,001–₹2,500', min: 2001, max: 2500 },
     { label: '₹2,501–₹3,000', min: 2501, max: 3000 },
     { label: '₹3,001 and Above', min: 3001, max: Infinity },
   ];

   const getUniqueValues = (key) => {
     const values = products.flatMap(p => Array.isArray(p[key]) ? p[key] : [p[key]]);
     return [...new Set(values)].filter(Boolean).sort();
   };

   const getOptionCounts = (key) => {
     return products.reduce((acc, curr) => {
       const values = Array.isArray(curr[key]) ? curr[key] : [curr[key]];
       values.forEach(value => {
         if (value) acc[value] = (acc[value] || 0) + 1;
       });
       return acc;
     }, {});
   };

   const categories = getUniqueValues('category');
   const sizes = getUniqueValues('size');
   const productTypes = getUniqueValues('productType');
   const brands = getUniqueValues('brand');
   const colours = getUniqueValues('colour');

   const categoryCounts = getOptionCounts('category');
   const sizeCounts = getOptionCounts('size');
   const productTypeCounts = getOptionCounts('productType');
   const brandCounts = getOptionCounts('brand');
   const colourCounts = getOptionCounts('colour');

   const priceCounts = priceRanges.map(range => {
     const count = products.filter(p => p.price >= range.min && p.price <= range.max).length;
     return { ...range, count };
   });

   const handleCheckboxChange = (filterType, value) => {
     const currentValues = selectedFilters[filterType] || [];
     const updatedValues = currentValues.some(v => JSON.stringify(v) === JSON.stringify(value))
       ? currentValues.filter(v => JSON.stringify(v) !== JSON.stringify(value))
       : [...currentValues, value];

     onFilterChange({
       ...selectedFilters,
       [filterType]: updatedValues,
     });
   };

   const clearAll = () => {
     onFilterChange({
       brand: [],
      productType: [],
    colour: [],
       category: [],
       size: [],
       price: [],
     });
   };

   const removeFilterValue = (filterType, value) => {
     onFilterChange({
       ...selectedFilters,
       [filterType]: selectedFilters[filterType].filter(v => JSON.stringify(v) !== JSON.stringify(value)),
     });
   };

   return (
     <div className="filter-sidebar">
       <div className="filter-header">
         <h2>Filters</h2>
         <button className="clear-btn" onClick={clearAll}>Clear All</button>
       </div>

       {/* Active filter pills */}
       {Object.entries(selectedFilters).map(([filterType, values]) =>
         values.length > 0 ? (
           <div className="filter-group" key={`selected-${filterType}`}>
             <h4 className="filter-title">{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</h4>
             <div className="pills-container">
               {values.map((value, index) => (
                 <div
                   className="pill"
                   key={`pill-${filterType}-${index}-${typeof value === 'object' ? value.label || index : value}`}
                 >
                   {value.label || value}
                   <span className="pill-close" onClick={() => removeFilterValue(filterType, value)}>×</span>
                 </div>
               ))}
             </div>
           </div>
         ) : null
       )}

       {/* Toggleable filters */}
       {[
         { label: 'Category', values: categories, open: categoryOpen, toggle: setCategoryOpen, type: 'category', counts: categoryCounts },
         { label: 'Size', values: sizes, open: sizeOpen, toggle: setSizeOpen, type: 'size', counts: sizeCounts },
         { label: 'Product Type', values: productTypes, open: typeOpen, toggle: setTypeOpen, type: 'productType', counts: productTypeCounts },
         { label: 'Brand', values: brands, open: brandOpen, toggle: setBrandOpen, type: 'brand', counts: brandCounts },
         { label: 'Colour', values: colours, open: colorOpen, toggle: setColorOpen, type: 'colour', counts: colourCounts },
       ].map(({ label, values, open, toggle, type, counts }) =>
         values.length > 0 && (
           <div className="filter-group" key={`group-${type}`}>
             <div className="filter-label toggle-label" onClick={() => toggle(!open)}>
               <span>{label}</span>
               <span className="toggle-icon">{open ? '−' : '+'}</span>
             </div>
             {open && values.map((value, index) => (
               <label key={`option-${type}-${index}-${value}`} className="filter-checkbox">
                 <input
                   type="checkbox"
                   checked={selectedFilters[type]?.includes(value)}
                   onChange={() => handleCheckboxChange(type, value)}
                 />
                 <span>{value}</span>
                 <span className="count">{counts[value]}</span>
               </label>
             ))}
           </div>
         )
       )}

       {/* Price filter */}
       <div className="filter-group" key="group-price">
         <div className="filter-label toggle-label" onClick={() => setPriceOpen(!priceOpen)}>
           <span>Price</span>
           <span className="toggle-icon">{priceOpen ? '−' : '+'}</span>
         </div>
         {priceOpen && priceCounts.map((range, index) => (
           <label key={`price-${index}`} className="filter-checkbox">
             <input
               type="checkbox"
               checked={selectedFilters.price.some(p => p.min === range.min && p.max === range.max)}
               onChange={() => handleCheckboxChange('price', { min: range.min, max: range.max, label: range.label })}
             />
             <span>{range.label}</span>
             <span className="count">{range.count}</span>
           </label>
        ))}
       </div>
     </div>
   );
 };

 export default FilterSidebar;


