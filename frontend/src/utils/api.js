// API configuration for different environments
const getApiUrl = () => {
  // In production, use the backend API URL
  if (import.meta.env.PROD) {
    return 'https://pixelmarket-api.vercel.app';
  }
  // In development, use localhost
  return 'http://localhost:5001';
};

export const API_BASE_URL = getApiUrl();

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};
