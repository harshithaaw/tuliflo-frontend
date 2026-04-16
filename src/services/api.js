import axios from 'axios';

// Dynamic baseURL - connects to localhost in development, deployed backend in production
const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:8080'
  : 'https://tuliflo-backend.onrender.com';

// Create axios instance
const api = axios.create({
  baseURL: baseURL
});

// Request interceptor - Add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  register: (username, email, password) => {
    return api.post('/api/auth/register', { username, email, password });
  },
  
  login: (username, password) => {
    return api.post('/api/auth/login', { username, password });
  }
};

// Gift API functions
export const giftAPI = {
  createGift: (userId, giftData) => {
    return api.post('/api/gifts/create', giftData, {
      headers: { 'User-Id': userId }
    });
  },
  
  getGiftByLink: (shareableLink) => {
    return api.get(`/api/gifts/${shareableLink}`);
  },
  
  getUserGifts: (userId) => {
    return api.get(`/api/gifts/user/${userId}`);
  }
};
// ```

// ---

// ### **Step 3: Verify File Structure**

// Your folder should look like this:
// ```
// tuliflo-frontend/
//   src/
//     services/
//       api.js  ← THIS FILE MUST EXIST
//     pages/
//       auth/
//         Login.jsx
//         Register.jsx