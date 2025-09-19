/**
 * api.js
 * Handles all API requests and token management for Mediconnect
 */

// Base URL for API requests
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Helper function to handle HTTP responses
 * @param {Response} response - Fetch response object
 * @returns {Promise} - Resolves to JSON data or throws an error
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
    } catch (e) {
      errorMessage = response.statusText;
    }
    throw new Error(errorMessage);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
};

/**
 * General request function with optional auth token
 * @param {string} url - API endpoint
 * @param {object} options - Fetch options (method, headers, body)
 */
const request = async (url, options = {}) => {
  const token = tokenService.getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const fetchOptions = { ...options, headers };
  const response = await fetch(`${API_BASE_URL}${url}`, fetchOptions);
  return handleResponse(response);
};

/**
 * Authentication service
 */
export const authService = {
  login: async ({ email, password }) => {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async ({ name, email, password, role }) => {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
  },

  logout: () => {
    tokenService.removeToken();
  },
};

/**
 * Token management
 */
export const tokenService = {
  setToken: (token) => localStorage.setItem('auth_token', token),
  getToken: () => localStorage.getItem('auth_token'),
  removeToken: () => localStorage.removeItem('auth_token'),
  isAuthenticated: () => !!localStorage.getItem('auth_token'),
};

/**
 * Example: Users API
 */
export const usersService = {
  getAllUsers: () => request('/users', { method: 'GET' }),
  getUserById: (id) => request(`/users/${id}`, { method: 'GET' }),
  updateUser: (id, data) => request(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteUser: (id) => request(`/users/${id}`, { method: 'DELETE' }),
};

/**
 * Example: Appointments API
 */
export const appointmentsService = {
  getAppointments: () => request('/appointments', { method: 'GET' }),
  bookAppointment: (data) => request('/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  cancelAppointment: (id) => request(`/appointments/${id}`, { method: 'DELETE' }),
};
