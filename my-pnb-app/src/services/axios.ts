/// <reference types="vite/client" />
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

/**
 * SOLID: Dependency Inversion Principle
 * Higher-level components (like your Dashboard) will use this instance 
 * without needing to know about pass_keys or session logic.
 */

const axiosInstance: AxiosInstance = axios.create({
  // Defaulting to the Auth Staging URL you provided
  baseURL: import.meta.env.VITE_BASE_URL_AUTH, 
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    // Mandatory header from your documentation
    'pass_key': import.meta.env.VITE_PASS_KEY, 
  },
});

// REQUEST INTERCEPTOR: Inject Session Token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Session Management: Get token from storage
    const token = sessionStorage.getItem('pnb_access_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR: Global Session Handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If session expires (401), clear everything and kick to login
    if (error.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;