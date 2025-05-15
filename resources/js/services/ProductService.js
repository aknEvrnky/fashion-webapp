import axios from 'axios';

const API_URL = ''; // Base API URL, adjust if your API routes are prefixed differently

/**
 * Fetches a paginated list of products.
 * @param {number} page - The page number to fetch.
 * @param {number} perPage - The number of items per page.
 * @param {string|null} gender - The gender to filter products by.
 * @param {number[]} colors - An array of color IDs to filter products by.
 * @param {number|null} masterCategoryId - The ID of the master category to filter by.
 * @param {number|null} subCategoryId - The ID of the subcategory to filter by.
 * @param {number|null} articleTypeId - The ID of the article type to filter by.
 * @returns {Promise<Object>} A promise that resolves to the API response data.
 */
export const fetchProducts = (page = 1, perPage = 20, gender = null, colors = [], masterCategoryId = null, subCategoryId = null, articleTypeId = null) => {
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
    if (subCategoryId !== null && subCategoryId !== '') {
        params.sub_category = subCategoryId; // Ensure this param name matches backend for single ID
    }
    if (articleTypeId !== null && articleTypeId !== '') {
        params.article_type = articleTypeId; // Ensure this param name matches backend
    }
    return axios.get(`${API_URL}/products`, { params })
    .then(response => response.data) // Return only the data part of the response
    .catch(error => {
        console.error("Error fetching products:", error);
        // You might want to throw the error or return a specific error object
        throw error;
    });
};

/**
 * Fetches subcategories for a given master category ID.
 * @param {number|string} masterCategoryId - The ID of the master category.
 * @returns {Promise<Object>} A promise that resolves to the API response data (array of subcategories).
 */
export const fetchSubCategories = (masterCategoryId) => {
    if (!masterCategoryId) {
        return Promise.reject(new Error('masterCategoryId is required to fetch subcategories.'));
    }
    // Assuming the endpoint is /master-categories/{id}/sub-categories relative to API_URL
    // Adjust if your API_URL already includes parts of this or if the route is different.
    return axios.get(`${API_URL}/master-categories/${masterCategoryId}/sub-categories`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error fetching subcategories for master category ID ${masterCategoryId}:`, error);
            throw error;
        });
};

/**
 * Fetches article types for a given subcategory ID.
 * @param {number|string} subCategoryId - The ID of the subcategory.
 * @returns {Promise<Object>} A promise that resolves to the API response data (array of article types).
 */
export const fetchArticleTypes = (subCategoryId) => {
    if (!subCategoryId) {
        return Promise.reject(new Error('subCategoryId is required to fetch article types.'));
    }
    // Assuming the endpoint is /sub-categories/{id}/article-types relative to API_URL
    return axios.get(`${API_URL}/sub-categories/${subCategoryId}/article-types`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error fetching article types for subcategory ID ${subCategoryId}:`, error);
            throw error;
        });
};

const ProductService = {
    fetchProducts,
    fetchSubCategories,
    fetchArticleTypes,
    // Other product-related API calls can be added here, e.g.:
    // fetchProductById: (id) => axios.get(`${API_URL}/products/${id}`).then(response => response.data),
    // createProduct: (productData) => axios.post(`${API_URL}/products`, productData).then(response => response.data),
};

export default ProductService;
