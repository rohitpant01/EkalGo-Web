import axios from 'axios';

export async function fetchPlaceImage(query) {
  if (!query) return null;

  try {
    // 1. Try Pexels (Highest Quality)
    const PEXELS_KEY = process.env.PEXELS_API_KEY;
    if (PEXELS_KEY) {
      try {
        const pexelsQuery = `${query} travel landscape destination`;
        const response = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(pexelsQuery)}&per_page=1`, {
          headers: { Authorization: PEXELS_KEY }
        });
        if (response.data?.photos?.length > 0) {
          return response.data.photos[0].src.large2x;
        }
      } catch (err) {
        console.warn('Pexels search failed:', err.message);
      }
    }

    // 2. Try Pixabay Fallback
    const PIXABAY_KEY = process.env.PIXABAY_API_KEY;
    if (PIXABAY_KEY) {
      try {
        const pixabayQuery = `${query} landmark scenic`;
        const response = await axios.get(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(pixabayQuery)}&image_type=photo&per_page=3&safesearch=true&orientation=horizontal`);
        if (response.data?.hits?.length > 0) {
          return response.data.hits[0].largeImageURL;
        }
      } catch (err) {
        console.warn('Pixabay search failed:', err.message);
      }
    }

    // 3. Final Fallback (Unsplash Source - High Quality)
    return `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200`;
  } catch (error) {
    console.error('Image Fetcher error:', error.message);
    return `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200`;
  }
}
