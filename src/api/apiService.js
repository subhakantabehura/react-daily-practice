import axios from 'axios';
import { encryptPayload } from '../utils/crypto';

/**
 * Enhanced API Service with Encryption & Interceptors
 */

const BASE_URL = 'https://apidev-sdk.iserveu.online/NSDL';

const apiService = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* Request Interceptor */
apiService.interceptors.request.use(
  (config) => {
    // Logic: Authentication
    const token = localStorage.getItem('nsdl_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Logic: Payload Encryption Pattern
    // Exceptions: getState and pdfFileUpload (plain JSON or Multipart)
    const isException = config.url.includes('getState') || config.url.includes('pdfFileUpload');

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
    // Logic: Return data directly
    // Note: If responses are also encrypted, we should decrypt here.
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // BYPASS: Redirect disabled so you can stay on dashboard during dev
      // localStorage.removeItem('nsdl_token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiService;
