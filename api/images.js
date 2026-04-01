import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    // 1. Try Pexels
    const PEXELS_KEY = process.env.PEXELS_API_KEY;
    if (PEXELS_KEY) {
      try {
        const response = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query + ' destination')}&per_page=1`, {
          headers: { Authorization: PEXELS_KEY }
        });
        if (response.data?.photos?.length > 0) {
          return res.status(200).json({ url: response.data.photos[0].src.large });
        }
      } catch (err) {
        console.warn('Pexels search failed:', err.message);
      }
    }

    // 2. Try Pixabay Fallback
    const PIXABAY_KEY = process.env.PIXABAY_API_KEY;
    if (PIXABAY_KEY) {
      try {
        const response = await axios.get(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=3&safesearch=true`);
        if (response.data?.hits?.length > 0) {
          return res.status(200).json({ url: response.data.hits[0].largeImageURL });
        }
      } catch (err) {
        console.warn('Pixabay search failed:', err.message);
      }
    }

    return res.status(404).json({ error: 'No images found' });
  } catch (error) {
    console.error('Image API error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
