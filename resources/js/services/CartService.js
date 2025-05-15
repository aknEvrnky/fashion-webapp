import axios from 'axios';

const API_BASE_URL = ''; // Adjust if your API routes are prefixed, e.g., '/api'
const CART_API_URL = `${API_BASE_URL}/cart`;

/**
 * Fetches the current cart contents from the backend.
 * @returns {Promise<Object>} A promise that resolves to the cart data (e.g., { cart: items, count: num, total: sum }).
 */
const getCart = () => {
    return axios.get(CART_API_URL)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching cart:", error.response ? error.response.data : error.message);
            throw error.response ? error.response.data : new Error('Failed to fetch cart');
        });
};

/**
 * Adds an item to the cart.
 * @param {number|string} productId - The ID of the product to add.
 * @param {number} [quantity=1] - The quantity to add.
 * @returns {Promise<Object>} A promise that resolves to the updated cart data.
 */
const addItem = (productId, quantity = 1) => {
    return axios.post(CART_API_URL, { product_id: productId, quantity })
        .then(response => response.data)
        .catch(error => {
            console.error("Error adding item to cart:", error.response ? error.response.data : error.message);
            throw error.response ? error.response.data : new Error('Failed to add item to cart');
        });
};

/**
 * Updates the quantity of an item in the cart.
 * @param {number|string} productId - The ID of the product to update.
 * @param {number} quantity - The new quantity (if 0, item might be removed by backend).
 * @returns {Promise<Object>} A promise that resolves to the updated cart data.
 */
const updateItem = (productId, quantity) => {
    return axios.put(`${CART_API_URL}/${productId}`, { quantity })
        .then(response => response.data)
        .catch(error => {
            console.error("Error updating item in cart:", error.response ? error.response.data : error.message);
            throw error.response ? error.response.data : new Error('Failed to update item in cart');
        });
};

/**
 * Removes an item from the cart.
 * @param {number|string} productId - The ID of the product to remove.
 * @returns {Promise<Object>} A promise that resolves to the updated cart data.
 */
const removeItem = (productId) => {
    return axios.delete(`${CART_API_URL}/${productId}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error removing item from cart:", error.response ? error.response.data : error.message);
            throw error.response ? error.response.data : new Error('Failed to remove item from cart');
        });
};

/**
 * Clears the entire cart.
 * @returns {Promise<Object>} A promise that resolves to the response data (e.g., success message).
 */
const clearCart = () => {
    return axios.delete(`${CART_API_URL}/clear`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error clearing cart:", error.response ? error.response.data : error.message);
            throw error.response ? error.response.data : new Error('Failed to clear cart');
        });
};

const CartService = {
    getCart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
};

export default CartService; 