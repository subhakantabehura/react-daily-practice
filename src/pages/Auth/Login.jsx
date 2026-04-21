import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import apiService from '../../api/apiService';
import { API_CONFIG, ENDPOINTS } from '../../api/apiConfig';
import './Login.css';
import logo from '../../assets/images/logo.png';


/**
 * Login Component
 * Handles authenticated API calls for Login, Forgot Password, and OTP flows.
 */
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  if (localStorage.getItem('nsdl_access_token')) {
    return <Navigate to="/dashboard" replace />;
  }

  // Logic: Real Login Processing
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Prepare Payload according to spec
      const payload = {
        grant_type: "password",
        username: formData.username,
        password: formData.password
      };

      // 2. Add Required Headers as per specification
      // Geo-Location: base64 encoded lat/long (placeholder for "0,0")
      const geoLocation = btoa("0,0");

      const config = {
        headers: {
          'Authorization': API_CONFIG.AUTH_TOKEN,
          // 'User-Agent' is forbidden by browsers — omitted
          'Geo-Location': geoLocation
        }
      };

      // 3. Make API call (Interceptor handles encryption)
      const response = await apiService.post(ENDPOINTS.LOGIN, payload, config);

      if (response && response.access_token) {
        // 4. Save session data
        localStorage.setItem('nsdl_access_token', response.access_token);

        // Merge roleName from top-level response AND user_details
        // API returns: { access_token, roleName, user_details: { ... } }
        const userInfo = {
          ...(response.user_details || {}),
          // roleName may sit at top-level OR inside user_details — cover both
          roleName: response.roleName
            || response.user_details?.roleName
            || ''
        };
        localStorage.setItem('nsdl_user', JSON.stringify(userInfo));

        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="login-screen">
      <div className="login-container">
        {/* Left Side: Branding and Hero Graphic */}
        <div className="login-brand-side">
          <div className="brand-logo-top">
             <img src={logo} alt="NSDL Payments Bank" />
          </div>
          <div className="hero-graphic-container">
            <div className="hero-graphic-placeholder">
              {/* This represents the light grey box with the NSDL logo motif from the screenshot */}
              <div className="nsdl-motif-bg"></div>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Form */}
        <div className="login-form-side">
          <div className="form-content-box">
            <h1 className="welcome-title">Welcome Back!</h1>
            <p className="welcome-subtitle">Please enter your details</p>
            
            <form className="auth-form" onSubmit={handleLogin}>
              <div className="input-field">
                <span className="input-label">Username*</span>
                <input
                  type="text"
                  required
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              
              <div className="input-field password-field">
                <span className="input-label">Password*</span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="form-actions">
                <label className="checkbox-label">
                  <input type="checkbox" /> Remember me
                </label>
                <button type="button" className="forgot-pass-link">
                  Forgot Password?
                </button>
              </div>

              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
