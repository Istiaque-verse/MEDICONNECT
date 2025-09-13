/**
 * API client for making authenticated requests to the backend
 */
import { tokenService } from './api';

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Makes an authenticated API request
 * @param {string} endpoint - API endpoint path
 * @param {Object} options - Fetch options
 * @returns {Promise} - Promise that resolves to the response data
 */
export const apiClient = {
  /**
   * Make a request with authentication
   * @param {string} endpoint - API endpoint (without base URL)
   * @param {Object} options - Fetch options
   * @returns {Promise} - Promise that resolves to the response data
   */
  request: async (endpoint, options = {}) => {
    // Get the token
    const token = tokenService.getToken();
    
    // Set up headers with authentication
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    // Add authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Make the request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    // Handle response
    if (!response.ok) {
      // Try to get error message from response
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorData;
      } catch (e) {
        errorMessage = response.statusText;
      }
      
      throw new Error(errorMessage);
    }
    
    // Check if response has content
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    
    return response.text();
  },
  
  /**
   * Make a GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Additional fetch options
   * @returns {Promise} - Promise that resolves to the response data
   */
  get: (endpoint, options = {}) => {
    return apiClient.request(endpoint, {
      method: 'GET',
      ...options,
    });
  },
  
  /**
   * Make a POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Additional fetch options
   * @returns {Promise} - Promise that resolves to the response data
   */
  post: (endpoint, data, options = {}) => {
    return apiClient.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  },
  
  /**
   * Make a PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Additional fetch options
   * @returns {Promise} - Promise that resolves to the response data
   */
  put: (endpoint, data, options = {}) => {
    return apiClient.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  },
  
  /**
   * Make a DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Additional fetch options
   * @returns {Promise} - Promise that resolves to the response data
   */
  delete: (endpoint, options = {}) => {
    return apiClient.request(endpoint, {
      method: 'DELETE',
      ...options,
    });
  },
};