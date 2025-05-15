import axios from 'axios';

const API_URL = ''; // Adjust if your API routes are prefixed, e.g., '/api'

/**
 * Defines the allowed feedback types, mirroring the backend FeedbackType enum.
 * @readonly
 * @enum {string}
 */
export const FeedbackType = {
    PURCHASE: 'purchase',
    LIKE: 'like',
    DISLIKE: 'dislike',
    VIEW: 'view',
    ADD_TO_CART: 'add_to_cart',
    ADD_TO_WISHLIST: 'add_to_wishlist',
    CLICK: 'click',
};

/**
 * Stores feedback on the backend.
 * 
 * @param {FeedbackType[keyof FeedbackType]} type - The type of feedback. Must be one of the values from the FeedbackType enum.
 * @param {number|string} productId - The ID of the product the feedback is for.
 * @param {string} [comment] - Optional comment for the feedback.
 * @returns {Promise<Object>} A promise that resolves to the API response data (usually empty on success or an error object).
 */
const storeFeedback = (type, productId, comment = null) => {
    const payload = {
        type: type,
        product_id: productId,
    };

    if (comment !== null && comment !== '') {
        payload.comment = comment;
    }

    // Assuming the endpoint is /feedback relative to API_URL
    // Adjust if your API_URL already includes parts of this or if the route is different.
    // Also ensure your backend route for FeedbackController@store is set up for POST requests to this path.
    return axios.post(`${API_URL}/feedback`, payload)
        .then(response => response.data) // Or handle success specifically, e.g., return { success: true }
        .catch(error => {
            console.error("Error storing feedback:", error.response ? error.response.data : error.message);
            // You might want to throw a more specific error or return a structured error object
            throw error.response ? error.response.data : new Error('Failed to store feedback');
        });
};

const FeedbackService = {
    storeFeedback,
    FeedbackType,
};

export default FeedbackService;
