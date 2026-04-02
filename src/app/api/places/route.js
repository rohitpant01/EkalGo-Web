import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');
  const placeName = searchParams.get('placeName');
  const placeId = searchParams.get('placeId');
  const maxWidth = searchParams.get('maxWidth') || 600;
  const photoReference = searchParams.get('photoReference');
  
  const GOOGLE_PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY;

  if (!GOOGLE_PLACES_KEY) {
    return NextResponse.json({ error: 'GOOGLE_PLACES_API_KEY is not configured on the server.' }, { status: 500 });
  }

  try {
    if (action === 'findPlaceId') {
      const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName + ' India')}&inputtype=textquery&fields=place_id,name,rating,photos,formatted_address,geometry&key=${GOOGLE_PLACES_KEY}`;
      const response = await axios.get(url);
      return NextResponse.json(response.data);
    }

    if (action === 'getPlaceDetails') {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,photos,formatted_address,opening_hours,user_ratings_total,reviews,website&key=${GOOGLE_PLACES_KEY}`;
      const response = await axios.get(url);
      return NextResponse.json(response.data);
    }

    if (action === 'getPlacePhoto') {
      const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_PLACES_KEY}`;
      // In Next.js, we return a redirect Response securely.
      return Response.redirect(url, 302);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Places API error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
