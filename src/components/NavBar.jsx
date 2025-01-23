import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaDoorOpen } from 'react-icons/fa'; // Import icons from react-icons
import logo from '../assets/images/logo.png';
import './NavBar.css';
import { searchProductApi } from '../apis/Api'; // Import the search API function

const Navbar = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSearch = async () => {
    try {
      const response = await searchProductApi(searchQuery);
      if (onSearchResults) {
        onSearchResults(response.data.products);
      }
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };
  const handleLogoClick = () => {
    navigate('/homepage'); 
  };
  const handleFavoriteClick = () => {
    navigate('/wishlist'); // Navigate to the Add to Cart page
  };
  const handleCartClick = () => {
    navigate('/add-to-cart'); // Navigate to the Add to Cart page
  };

  const handleClick = () => {
    navigate('/edit-profile'); // Navigate to the Add to Cart page
  };

  const handleLogout = () => {
    // Clear user data from local storage or state
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" onClick={handleLogoClick}/>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <button onClick={handleSearch}></button>
        </div>
        <div className="icons">
          <div className="icon" onClick={handleFavoriteClick}>
            <FaHeart /> {/* React Icon for heart icon */}
          </div>
          <div className="icon" onClick={handleCartClick}>
            <FaShoppingCart /> {/* React Icon for cart icon */}
          </div>
          <div className="icon" onClick={handleClick}>
            <FaDoorOpen /> {/* React Icon for user/profile icon */}
          </div>
        </div>
      </div>
      <div className="navbar-bottom">
        <div className="logo" >
          <span className="logo-text">SparkleNest</span>
        </div>
       
      
        
      </div>
    </div>
  );
};

export default Navbar;
