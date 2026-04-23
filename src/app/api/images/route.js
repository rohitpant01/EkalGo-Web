import { NextResponse } from 'next/server';
import { fetchPlaceImage } from '@/utils/imageFetcher';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const imageUrl = await fetchPlaceImage(query);
    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error('Image API error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
