import axios from 'axios';

export default async function handler(req, res) {
  const { action, placeName, placeId, maxWidth, photoReference } = req.query;
  const GOOGLE_PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY;

  if (!GOOGLE_PLACES_KEY) {
    return res.status(500).json({ error: 'GOOGLE_PLACES_API_KEY is not configured on the server.' });
  }

  try {
    if (action === 'findPlaceId') {
      const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName + ' India')}&inputtype=textquery&fields=place_id,name,rating,photos,formatted_address,geometry&key=${GOOGLE_PLACES_KEY}`;
      const response = await axios.get(url);
      return res.status(200).json(response.data);
    }

    if (action === 'getPlaceDetails') {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,photos,formatted_address,opening_hours,user_ratings_total,reviews,website&key=${GOOGLE_PLACES_KEY}`;
      const response = await axios.get(url);
      return res.status(200).json(response.data);
    }

    if (action === 'getPlacePhoto') {
      const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth || 600}&photo_reference=${photoReference}&key=${GOOGLE_PLACES_KEY}`;
      // For photos, we redirect to the Google URL or fetch and pipe. 
      // Redirecting is easier and safer for bandwidth.
      return res.redirect(url);
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('Places API error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
