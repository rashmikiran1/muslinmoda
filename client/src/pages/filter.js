import React, { useState } from 'react';

const ProductFilter = ({ applyFilters, resetFilters }) => {
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([100, 10000]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategories((prevCategories) => [...prevCategories, value]);
    } else {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category !== value)
      );
    }
  };

  const handlePriceRangeChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange(value);
  };
  
  const handleApplyFilters = () => {
    // Pass the selected filter options to the parent component
    applyFilters(categories, priceRange);
  };

  const handleResetFilters = () => {
    // Reset the filter options to their default values
    setCategories([]);
    setPriceRange([0,10000]);
    
    resetFilters();
  };
  
  
  return (
    <div className="product-filter">
      <h2>Filter Products</h2>
      <div className="filter-section">
        <h3>Categories</h3>
        <label>
        
          <input 
            type="checkbox" 
            value="saree"
            checked={categories.includes('saree')}
            onChange={handleCategoryChange}
          />
          saree
        </label>
        <label>
          <input
            type="checkbox"
            value="lehenga choli"
            checked={categories.includes('lehenga choli')}
            onChange={handleCategoryChange}
          />
          lehenga choli
        </label>
        {/* Add more checkboxes for other categories */}
      </div>
      <div className="filter-section">
        <h3>Price Range</h3>
        <input
          type="range"
          min={100}
          max={10000}
          value={priceRange}
          onChange={handlePriceRangeChange}
        />
        <p>{`${priceRange[0]} - ${priceRange[1]}`}</p>
      </div>
      <div className="filter-buttons">
        <button onClick={handleApplyFilters}>Apply</button>
        <button onClick={handleResetFilters}>Reset</button>
      </div>
    </div>
  );
};

export default ProductFilter;
