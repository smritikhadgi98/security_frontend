import React, { useEffect, useState } from 'react';
import { getWishlistItemsApi, removeFromWishlistApi } from '../../apis/Api'; // Make sure to add wishlist API functions
import Navbar from '../../components/NavBar';
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast'; // Import Toaster
import './Wishlist.css'; // Add styles for WishlistPage

const WishlistPage = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            const userId = localStorage.getItem('id');
            if (!userId) {
                toast.error('You need to be logged in to view wishlist items');
                return;
            }

            try {
                const response = await getWishlistItemsApi(userId);
                if (response.data && response.data.wishlist) {
                    setWishlistItems(response.data.wishlist);
                } else {
                    setWishlistItems([]);
                }
            } catch (err) {
                setError(err.response ? err.response.data.message : 'An error occurred');
                toast.error(err.response ? err.response.data.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchWishlistItems();
    }, []);

    const handleRemoveFromWishlist = async (productId) => {
        const userId = localStorage.getItem('id');
        if (!userId) {
            toast.error('You need to be logged in to remove items from the wishlist');
            return;
        }

        try {
            const response = await removeFromWishlistApi(userId, productId);
            if (response.data.success) {
                setWishlistItems(wishlistItems.filter(item => item._id !== productId));
                toast.success('Removed from wishlist');
            } else {
                toast.error(response.data.message || 'Failed to remove from wishlist');
            }
        } catch (error) {
            toast.error('An error occurred');
            console.error('Error removing from wishlist:', error);
        }
    };

    return (
        <div className="wishlist-page">
            <Navbar />
            <div className="container">
                <h1 className="page-title">Wishlist</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : wishlistItems.length === 0 ? (
                    <p>No items in wishlist</p>
                ) : (
                    <div className="wishlist-items">
                        {wishlistItems.map(item => (
                            <div key={item._id} className="wishlist-item">
                                <img
                                    src={`https://localhost:5000/products/${item.productImage}`}
                                    alt={item.productName}
                                    className="wishlist-image"
                                />
                                <div className="wishlist-details">
                                    <h5 className="wishlist-item-details">{item.productName}</h5>
                                    <p className="wishlist-item-price">NPR {item.productPrice}</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveFromWishlist(item._id)}
                                    className="btn-remove"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
