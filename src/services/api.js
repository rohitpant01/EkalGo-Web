import axios from 'axios';
import { generateGroqItinerary } from './groq';
import { imageService } from './imageService';

// 1. GENERATE ITINERARY (Orchestrated via Proxy)
// ─────────────────────────────────────────────
export async function generateItinerary(query) {
  // 1. Try Groq (Fastest via Proxy)
  try {
    const result = await generateGroqItinerary(query);
    if (result.success && result.data?.title) return result;
  } catch (err) {
    console.warn('Groq failed, trying Gemini...', err);
  }

  // 2. Try Gemini via Proxy
  try {
    const enrichmentPrompt = `Create a detailed 3-5 day travel itinerary for: "${query}" in JSON format with fields: title, summary, duration, highlights, days.`;
    const response = await axios.post('/api/itinerary', {
      type: 'gemini',
      query: enrichmentPrompt
    });

    const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (rawText) {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      const data = JSON.parse(jsonMatch ? jsonMatch[0] : rawText.trim());
      if (data.title) return { success: true, data };
    }
  } catch (err) {
    console.warn('Gemini Proxy failed.', err);
  }

  return { success: false, error: 'AI_ORCHESTRATION_FAILED' };
}

// ─────────────────────────────────────────────
// 2. GOOGLE PLACES METHODS (Via Proxy Only)
// ─────────────────────────────────────────────
export async function findPlaceId(placeName) {
  try {
    const response = await axios.get('/api/places', {
      params: { action: 'findPlaceId', placeName }
    });
    return response.data?.candidates?.[0] || null;
  } catch (err) {
    console.error('Places find proxy failed:', err);
    return null;
  }
}

export async function getPlaceDetails(placeId) {
  try {
    const response = await axios.get('/api/places', {
      params: { action: 'getPlaceDetails', placeId }
    });
    return response.data?.result || null;
  } catch (err) {
    console.error('Place details proxy failed:', err);
    return null;
  }
}

export function getPlacePhotoUrl(photoReference, maxWidth = 600) {
  if (!photoReference) return null;
  // Securely get photos via the proxy endpoint
  return `/api/places?action=getPlacePhoto&maxWidth=${maxWidth}&photoReference=${photoReference}`;
}

// ─────────────────────────────────────────────
// 5. FETCH PLACE WITH PHOTO (combined helper)
// ─────────────────────────────────────────────
export async function getPlaceWithPhoto(placeName) {
  try {
    const candidate = await findPlaceId(placeName);
    if (!candidate) return { name: placeName, photoUrl: null, rating: null, address: null };

    let photoRef = candidate?.photos?.[0]?.photo_reference;
    let photoUrl = photoRef ? getPlacePhotoUrl(photoRef) : null;

    // Fallback: If no Google photo, search Pexels/Pixabay
    if (!photoUrl) {
      try {
        photoUrl = await imageService.searchImage(placeName);
      } catch (err) {
        console.warn('Image fallback search failed:', err.message);
      }
    }

    return {
      name: candidate.name || placeName,
      placeId: candidate.place_id,
      photoUrl,
      rating: candidate.rating,
      address: candidate.formatted_address,
      lat: candidate.geometry?.location?.lat,
      lng: candidate.geometry?.location?.lng,
    };
  } catch (err) {
    return { name: placeName, photoUrl: null, rating: null, address: null };
  }
}

// ─────────────────────────────────────────────
// 6. GENERATE PREVIEW TEASER (FAST)
// ─────────────────────────────────────────────
export { generatePreviewTeaser } from './groq';
