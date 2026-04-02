import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
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
          return NextResponse.json({ url: response.data.photos[0].src.large });
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
          return NextResponse.json({ url: response.data.hits[0].largeImageURL });
        }
      } catch (err) {
        console.warn('Pixabay search failed:', err.message);
      }
    }

    return NextResponse.json({ error: 'No images found' }, { status: 404 });
  } catch (error) {
    console.error('Image API error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
