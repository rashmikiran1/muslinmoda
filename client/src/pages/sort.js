import React from 'react';

const Sort = ({ sortBy, handleSortChange }) => {
  return (
    <div>Sort by :
        
      <select value={sortBy} onChange={handleSortChange} className='option'>

        <option value="relevance">Relevance</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>  
    </div>
  );
};


export default Sort;
