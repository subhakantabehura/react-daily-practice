import axios from 'axios';
import { encryptPayload, decryptResponse } from '../utils/crypto';
import { API_CONFIG, ENDPOINTS } from './apiConfig';

/**
 * Enhanced API Service with Encryption & Interceptors
 * Configured for NSDL Staging Environment
 */

const apiService = axios.create({
  baseURL: API_CONFIG.AUTH_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    // Note: 'User-Agent' is a browser-forbidden header — removed to prevent console errors
  },
});

/* Request Interceptor */
apiService.interceptors.request.use(
  (config) => {
    // Logic: Session Token for subsequent requests
    const token = localStorage.getItem('nsdl_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Logic: Payload Encryption Pattern
    // Exceptions: Login endpoint (for this specific server) and getState/pdfFileUpload
    const isException = 
      config.url.includes(ENDPOINTS.LOGIN) || 
      config.url.includes('getState') || 
      config.url.includes('pdfFileUpload');

    if (config.data && !isException && config.method !== 'get') {
      console.log(`[API] Encrypting payload for: ${config.url}`);
      config.data = encryptPayload(config.data);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* Response Interceptor */
apiService.interceptors.response.use(
  (response) => {
    // Logic: Handle Encrypted Responses
    // If the response is a string, it's likely encrypted data from the API
    if (typeof response.data === 'string' && response.data.length > 50) {
      console.log(`[API] Decrypting response for: ${response.config.url}`);
      return decryptResponse(response.data);
    }
    
    // Check if the data itself is wrapped in an object like { ResponseData: "..." }
    if (response.data && response.data.ResponseData) {
        return decryptResponse(response.data.ResponseData);
    }

    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
       // Handle unauthorized
    }
    return Promise.reject(error);
  }
);

export default apiService;
