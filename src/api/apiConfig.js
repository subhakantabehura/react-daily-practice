/**
 * API Configuration
 * Contains base URLs and security keys for the NSDL Staging environment.
 */

export const API_CONFIG = {
  AUTH_BASE_URL: 'https://services.iserveu.online/dev/nsdlab-internal',
  USER_MGMT_BASE_URL: 'https://services.iserveu.online/dev/nsdlab-internal/user-mgmt',
  IMAGE_BASE_URL: 'https://bankpratinidhi.nsdlbank.co.in/',
  
  // Security Keys
  S_KEY: 'a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU=',
  PASS_KEY: 'QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA',
  
  // Working Basic Auth Token
  AUTH_TOKEN: 'Basic bnNkbGFiLWludGVybmFsLWNsaWVudDpuc2RsYWItaW50ZXJuYWwtcGFzc3dvcmQ=' 
};

export const ENDPOINTS = {
  LOGIN: '/user-authorization/user/login',
  LOGOUT: '/user-authorization/logout',
  DASHBOARD_DATA: '/user/dashboard', // Relative to USER_MGMT
  FORGOT_PASSWORD_OTP: '/utility/send-forgot-password-otp',
  VERIFY_OTP_TEMP_PASS: '/verify-otp-send-temporary-password',
  FIRST_LOGIN_OTP: '/send-first-login-otp',
  CHANGE_PASSWORD_FIRST_LOGIN: '/change-password-on-first-login-with-otp'
};
