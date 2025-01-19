import React, { useEffect, useState } from 'react';
import { filterProductsApi, getPaginatedProductsApi } from '../../apis/Api';
import Carousel from '../../components/Carousel';
import ContactDetails from '../../components/ContactDetails';
import MenuBar from '../../components/MenuBar';
import Navbar from '../../components/NavBar';
import ProductCard from '../../components/ProductCard';
import './Homepage.css';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSkinType, setSelectedSkinType] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = selectedCategory || selectedSkinType
          ? await filterProductsApi(selectedCategory, selectedSkinType)
          : await getPaginatedProductsApi(page);

        if (response.data) {
          setProducts(response.data.products || []);
          setTotalPages(Math.ceil(response.data.totalProducts / 9));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, selectedCategory, selectedSkinType]);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setPage(1);
    setProducts([]); // Reset products to avoid duplication
  };

  const handleSkinTypeChange = (newSkinType) => {
    setSelectedSkinType(newSkinType);
    setPage(1);
    setProducts([]); // Reset products to avoid duplication
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSearchResults = (results) => {
    setProducts(results);
    setTotalPages(1); // Since we are showing search results, set totalPages to 1
  };

  return (
    <div className="home-page">
      <Navbar onSearchResults={handleSearchResults} />
      <div className="carousel-container">
        <Carousel />
      </div>
      <div className="content">
        <div className="menu-bar-container">
          <MenuBar
            onCategoryChange={handleCategoryChange}
            onSkinTypeChange={handleSkinTypeChange}
          />
        </div>
        <div className="product-grid">
          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((singleProduct) => (
              <ProductCard key={singleProduct._id} productInformation={singleProduct} />
            ))
          )}
        </div>
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={page === index + 1}
            className={page === index + 1 ? 'active-page' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
      <div style={{ marginBottom: '20px' }} />
      <ContactDetails />
    </div>
  );
};

export default Homepage;
