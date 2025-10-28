// Environment-based API configuration
const getApiUrl = () => {
  return import.meta.env.PROD 
    ? 'https://pixel-market-sgsi.vercel.app'
    : 'http://localhost:5001';
};

export const API_BASE_URL = getApiUrl();

// URL builder utility
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};
