/**
 * API service for handling HTTP requests to the backend
 */

// Base URL for API requests
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Helper function to handle HTTP responses
 * @param {Response} response - The fetch response object
 * @returns {Promise} - Promise that resolves to the response data
 */
const handleResponse = async (response) => {
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
};

/**
 * Authentication service for login, registration, etc.
 */
export const authService = {
  /**
   * Login user with email and password
   * @param {Object} credentials - User credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise} - Promise that resolves to the JWT token response
   */
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    return handleResponse(response);
  },
  
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.name - User's full name
   * @param {string} userData.email - User's email
   * @param {string} userData.password - User's password
   * @param {string} userData.role - User's role (patient, doctor)
   * @returns {Promise} - Promise that resolves to the registration response
   */
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    return handleResponse(response);
  },
};

/**
 * Token management functions
 */
export const tokenService = {
  /**
   * Save JWT token to local storage
   * @param {string} token - JWT token
   */
  setToken: (token) => {
    localStorage.setItem('auth_token', token);
  },
  
  /**
   * Get JWT token from local storage
   * @returns {string|null} - JWT token or null if not found
   */
  getToken: () => {
    return localStorage.getItem('auth_token');
  },
  
  /**
   * Remove JWT token from local storage
   */
  removeToken: () => {
    localStorage.removeItem('auth_token');
  },
  
  /**
   * Check if user is authenticated (has token)
   * @returns {boolean} - True if authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },
};