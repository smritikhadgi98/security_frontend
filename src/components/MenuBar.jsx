import React from 'react';
import './MenuBar.css'; 

const MenuBar = ({ onCategoryChange, onSkinTypeChange }) => {
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    onCategoryChange(category); // Pass selected category back to parent
  };

  const handleSkinTypeChange = (event) => {
    const skinType = event.target.value;
    onSkinTypeChange(skinType); // Pass selected skin type back to parent
  };

  return (
    <div className="menu-bar">
      <div className="menu-options">
        <span className="menu-label">Categories:</span>
        <ul>
          <li>
            <input
              type="radio"
              id="foundation"
              name="productCategory"
              value="Foundation"
              onChange={handleCategoryChange}
            />
            <label htmlFor="foundation">Foundation</label>
          </li>
          <li>
            <input
              type="radio"
              id="concealer"
              name="productCategory"
              value="Concealer"
              onChange={handleCategoryChange}
            />
            <label htmlFor="concealer">Concealer</label>
          </li>
          <li>
            <input
              type="radio"
              id="cleanser"
              name="productCategory"
              value="Cleanser"
              onChange={handleCategoryChange}
            />
            <label htmlFor="cleanser">Cleanser</label>
          </li>
          <li>
            <input
              type="radio"
              id="blush"
              name="productCategory"
              value="Blush"
              onChange={handleCategoryChange}
            />
            <label htmlFor="blush">Blush</label>
          </li>
          <li>
            <input
              type="radio"
              id="moisturizer"
              name="productCategory"
              value="Moisturizer"
              onChange={handleCategoryChange}
            />
            <label htmlFor="moisturizer">Moisturizer</label>
          </li>
        </ul>
      </div>

      <div className="menu-options">
        <span className="menu-label">Skin Type:</span>
        <ul>
          <li>
            <input
              type="radio"
              id="normal"
              name="skinType"
              value="Normal"
              onChange={handleSkinTypeChange}
            />
            <label htmlFor="normal">Normal Skin</label>
          </li>
          <li>
            <input
              type="radio"
              id="dry"
              name="skinType"
              value="Dry"
              onChange={handleSkinTypeChange}
            />
            <label htmlFor="dry">Dry Skin</label>
          </li>
          <li>
            <input
              type="radio"
              id="oily"
              name="skinType"
              value="Oily"
              onChange={handleSkinTypeChange}
            />
            <label htmlFor="oily">Oily Skin</label>
          </li>
          <li>
            <input
              type="radio"
              id="combination"
              name="skinType"
              value="Combination"
              onChange={handleSkinTypeChange}
            />
            <label htmlFor="combination">Combination Skin</label>
          </li>
          <li>
            <input
              type="radio"
              id="acneProne"
              name="skinType"
              value="Acne-Prone"
              onChange={handleSkinTypeChange}
            />
            <label htmlFor="acneProne">Acne Prone Skin</label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
