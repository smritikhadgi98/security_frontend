import axios from "axios";

// Creating backend Config
const Api = axios.create({
    baseURL: "https://localhost:5000",
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

// Function to get the config with token
const getConfig = () => {
    return {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
};

const jsonConfig = {
    headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
};

// Test API
export const testApi = () => Api.get('/test');

// Register API
export const registerUserApi = (data) => Api.post('/api/user/create', data);

// Login API
export const loginUserApi = (data) => Api.post('/api/user/login', data);

//forgot password
export const forgotPasswordApi = (data) =>
    Api.post("/api/user/forgot_password", data);
   
  // verify otp
  export const verifyOtpApi = (data) => Api.post("/api/user/verify_otp", data);

// Create product API
export const createProductApi = (data) => Api.post("/api/product/create", data, getConfig());


// Get all products API
export const getAllProductsApi = () => Api.get('/api/product/get_all_products', getConfig());

// Get single product API
export const getSingleProductApi = (id) => Api.get(`/api/product/get_single_product/${id}`, getConfig());

// Delete product API
export const deleteProductApi = (id) => Api.delete(`/api/product/delete_product/${id}`, getConfig());

// Update product API
export const updateProductApi = (id, data) => {
    return Api.put(`/api/product/update_product/${id}`, data, getConfig());
  };

// Function to fetch paginated products
export const getPaginatedProductsApi = (page, category, skinType) => {
    const params = { page };
    if (category) {
        params.category = category;
    }
    if (skinType) {
        params.skinType = skinType;
    }

    return Api.get('/api/product/pagination', {
        params,
        ...getConfig()
    });
};

// Function to filter products
export const filterProductsApi = (category, skinType) => {
    const params = {};
    if (category) {
        params.category = category;
    }
    if (skinType) {
        params.skinType = skinType;
    }

    return Api.get('/api/product/filter', {
        params,
        ...getConfig()
    });
};

// Function to search products
export const searchProductApi = (query, category) => {
    const params = { q: query };
    if (category) {
        params.category = category;
    }

    return Api.get('/api/product/search', {
        params,
        ...getConfig()
    });
};

// Cart APIs
export const getCartApi = () => Api.get("/api/cart/get_cart", getConfig());

export const addToCartApi = (data) => Api.post("/api/cart/add_to_cart", data, getConfig());

export const removeFromCartApi = (id) => Api.delete(`/api/cart/remove_from_cart/${id}`, getConfig());

// Function to update the quantity of an item in the cart
// export const updateQuantityApi = (id, data) =>
//     Api.put(`/api/cart/update_quantity/${id}`, data, getConfig());

export const updateCartStatusApi = (data) => Api.put("/api/cart/update_status", data, getConfig());

// Wishlist APIs
export const addToWishlistApi = (userId, productId) => Api.post('/api/wishlist/add', { userId, productId }, getConfig());

export const getWishlistItemsApi = (userId) => Api.get(`/api/wishlist/${userId}`, getConfig());

export const removeFromWishlistApi = (userId, productId) => Api.post('/api/wishlist/remove', { userId, productId }, getConfig());

//=========================== Review Apis ===========================

// add review api
export const addReviewApi = (data) => Api.post("/api/review/post_reviews", data, getConfig());

// get reviews api
export const getReviewsApi = (ProductId) => Api.get(`/api/review/get_reviews/${ProductId}`, getConfig());

// get reviews by product and user api
export const getReviewsByProductAndUserApi = (ProductId) => Api.get(`/api/review/get_reviews_by_user_and_product/${ProductId}`, getConfig());

// get average rating api
export const getAverageRatingApi = (ProductId) => Api.get(`/api/review/get_average_rating/${ProductId}`, getConfig());

//update review api
export const updateReviewApi = (id, data) => Api.put(`/api/review/update_reviews/${id}`, data, getConfig());

//=========================== Order Apis ===========================
//place order api
export const placeOrderApi = (data) => Api.post("/api/order/place_order", data, jsonConfig);

// get single order api
export const getSingleOrderApi = (id) => Api.get(`/api/order/get_single_order/${id}`, getConfig());

// get all orders api
export const getAllOrdersApi = () => Api.get("/api/order/get_all_orders", getConfig());

// order status update api
export const updateOrderStatusApi = (id, data) => Api.post(`/api/order/update_order_status/${id}`, data, getConfig());

// get orders by user api
export const getOrdersByUserApi = () => Api.get("/api/order/get_orders_by_user", getConfig());

// Function to initialize Khalti payment
export const initializeKhaltiPaymentApi = (data) => Api.post("api/khalti/initialize-khalti", data);

// Function to verify Khalti payment
export const verifyKhaltiPaymentApi = (params) => Api.get("/api/khalti/complete-khalti-payment", { params });

const KhaltiApi = axios.create({
    baseURL: "https://test-pay.khalti.com/",
    headers: {
        "Content-Type": "application/json",
        authorization: `key 45615eee5f444d8186bce4b1766896fa`,
    },
});

export const initiateKhaltiPayment = (data) => KhaltiApi.post("api/v2/epayment/initiate/", data);
