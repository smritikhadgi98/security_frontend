import React from 'react';
import './MenuBar.css'; 

const MenuBar = ({ onCategoryChange, onSkinTypeChange }) => {
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    onCategoryChange(category); // Pass selected category back to parent
  };

  

  return (
    <div className="menu-bar">
      <div className="menu-options">
        <span className="menu-label">Categories:</span>
        <ul>
          <li>
            <input
              type="radio"
              id="Anklets"
              name="productCategory"
              value="Anklets"
              onChange={handleCategoryChange}
            />
            <label htmlFor="Anklets">Anklets</label>
          </li>
          <li>
            <input
              type="radio"
              id="Braclets"
              name="productCategory"
              value="Braclets"
              onChange={handleCategoryChange}
            />
            <label htmlFor="Braclets">Braclets</label>
          </li>
          <li>
            <input
              type="radio"
              id="Earrings"
              name="productCategory"
              value="Earrings"
              onChange={handleCategoryChange}
            />
            <label htmlFor="Earrings">Earrings</label>
          </li>
          <li>
            <input
              type="radio"
              id="Necklaces"
              name="productCategory"
              value="Necklaces"
              onChange={handleCategoryChange}
            />
            <label htmlFor="Necklaces">Necklaces</label>
          </li>
          
        </ul>
      </div>

     
    </div>
  );
};

export default MenuBar;
