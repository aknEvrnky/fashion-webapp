import axios from 'axios';

const API_URL = ''; // Base API URL, adjust if your API routes are prefixed differently

/**
 * Fetches a paginated list of products.
 * @param {number} page - The page number to fetch.
 * @param {number} perPage - The number of items per page.
 * @param {string|null} gender - The gender to filter products by.
 * @param {number[]} colors - An array of color IDs to filter products by.
 * @param {number|null} masterCategoryId - The ID of the master category to filter by.
 * @returns {Promise<Object>} A promise that resolves to the API response data.
 */
export const fetchProducts = (page = 1, perPage = 20, gender = null, colors = [], masterCategoryId = null) => {
    const params = {
        page: page,
        per_page: perPage
    };
    if (gender) {
        params.gender = gender;
    }
    if (colors && colors.length > 0) {
        params.colors = colors; // Axios will typically serialize this as colors[]=value1&colors[]=value2
    }
    if (masterCategoryId !== null && masterCategoryId !== '') {
        params.master_category = masterCategoryId; // Ensure this param name matches backend
    }
    return axios.get(`${API_URL}/products`, { params })
    .then(response => response.data) // Return only the data part of the response
    .catch(error => {
        console.error("Error fetching products:", error);
        // You might want to throw the error or return a specific error object
        throw error;
    });
};

const ProductService = {
    fetchProducts,
    // Other product-related API calls can be added here, e.g.:
    // fetchProductById: (id) => axios.get(`${API_URL}/products/${id}`).then(response => response.data),
    // createProduct: (productData) => axios.post(`${API_URL}/products`, productData).then(response => response.data),
};

export default ProductService;
