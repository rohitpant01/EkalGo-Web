import axios from 'axios';

/**
 * Enhanced Image Service for EkalGo
 * Fetches high-quality destination photos via the backend API proxy.
 */
export const imageService = {
  async searchImage(query) {
    if (!query) return null;

    try {
      const response = await axios.get('/api/images', {
        params: { query }
      });
      return response.data?.url || null;
    } catch (err) {
      console.error('Image Proxy failed:', err.message);
      return null;
    }
  }
};
