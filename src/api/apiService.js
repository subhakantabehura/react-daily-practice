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
  },
});

// New Service for Onboarding System
export const onboardService = axios.create({
    baseURL: API_CONFIG.ONBOARDING_BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
});

const applyInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('nsdl_access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Mandatory NSDL Staging Headers
      config.headers['X-GEO-LOCATION'] = '0,0';
      config.headers['X-CLIENT-ID'] = 'NSDL_ADMIN';
      config.headers['X-REQUEST-ID'] = `REQ-${Date.now()}`;
      config.headers['X-SOURCE'] = 'WEB';

      const isException = 
        config.url.includes(ENDPOINTS.LOGIN) || 
        config.url.includes(ENDPOINTS.LOGOUT) ||
        config.url.includes(ENDPOINTS.ONBOARD_CBC) ||
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

  instance.interceptors.response.use(
    (response) => {
      if (typeof response.data === 'string' && response.data.length > 50) {
        console.log(`[API] Decrypting response for: ${response.config.url}`);
        return decryptResponse(response.data);
      }
      
      if (response.data && response.data.ResponseData) {
          return decryptResponse(response.data.ResponseData);
      }

      return response.data;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
         // Session Expired logic could go here
      }
      return Promise.reject(error);
    }
  );
};

applyInterceptors(apiService);
applyInterceptors(onboardService);

export default apiService;
