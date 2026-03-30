import axios from 'axios';
import { generateGroqItinerary } from './groq';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GOOGLE_PLACES_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// ─────────────────────────────────────────────
// 1. GENERATE ITINERARY
// ─────────────────────────────────────────────
export async function generateItinerary(query) {
  // 1. Initial Draft using Groq (Fast)
  let groqResult = { success: false };
  try {
    groqResult = await generateGroqItinerary(query);
  } catch (err) {
    console.error('Groq Orchestration failed:', err);
  }

  // 2. Enrichment using Gemini (Premium Curation)
  if (!GEMINI_API_KEY) {
    // If Gemini is missing, we must at least return the Groq result if it succeeded
    return groqResult;
  }

  // Construct context for Gemini
  let enrichmentPrompt = '';
  if (groqResult.success) {
    enrichmentPrompt = `
You are the Head of Curation at EkalGo, a premium explorer-focused travel app.
Your task is to take this draft itinerary and enrich it with "Pro Tips", "Safety Insights", and premium descriptions.

DRAFT ITINERARY (FROM GROQ):
${JSON.stringify(groqResult.data)}

ENHANCEMENT INSTRUCTIONS:
- Keep the same structure (json).
- Add a "proTip" string field to EACH place in the "places" array (useful insider travel advice). 
- Add a "safetyInsight" string to the ROOT of the itinerary (specific safety advice for this entire route in India).
- Ensure descriptions are professional, inspiring, and extremely premium.
- Ensure all place names are accurate for Google Maps search.
- Return ONLY the final valid JSON object. No markdown.
`;
  } else {
    // Fallback: If Groq failed, Gemini does the whole thing
    enrichmentPrompt = `
You are an expert travel planner for EkalGo. Create a premium 3-5 day itinerary for: "${query}"
Return ONLY a valid JSON object (no markdown) in this format:
{
  "title": "Trip title",
  "summary": "Inspiring summary",
  "duration": "X days",
  "bestSeason": "Months",
  "difficulty": "Easy/Moderate/Challenging",
  "estimatedCost": "₹XX,000",
  "highlights": ["H1", "H2", "H3"],
  "safetyInsight": "Specific safety advice for this route",
  "days": [
    {
      "day": 1,
      "theme": "Theme",
      "places": [
        {
          "name": "Exact place name",
          "type": "temple/trek/viewpoint",
          "duration": "X hours",
          "description": "Premium description",
          "proTip": "Expert insider tip",
          "tips": "Practical tip"
        }
      ]
    }
  ]
}
`;
  }

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: enrichmentPrompt }] }],
      generationConfig: {
        temperature: groqResult.success ? 0.3 : 0.7, // Lower temperature for refining
        maxOutputTokens: 4096,
      },
    });

    const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error('Empty response from Gemini');

    // More robust JSON extraction
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    const cleaned = jsonMatch ? jsonMatch[0] : rawText.trim();

    try {
      const parsed = JSON.parse(cleaned);
      return { success: true, data: parsed };
    } catch (parseErr) {
      console.error('Gemini JSON Parse Error:', parseErr, 'Raw text:', rawText);
      throw new Error(`Invalid JSON from Gemini: ${parseErr.message}`);
    }
  } catch (err) {
    console.error('Orchestration stage 2 (Enrichment/Fallback) error:', err);
    // Return a more descriptive error if both fail
    if (!groqResult.success) {
      return { 
        success: false, 
        error: `AI_ORCHESTRATION_FAILED: Groq(${groqResult.error || 'unknown'}) + Gemini(${err.message || 'unknown'})` 
      };
    }
    return groqResult;
  }
}

// ─────────────────────────────────────────────
// 2. GET PLACE ID FROM GOOGLE PLACES
// ─────────────────────────────────────────────
export async function findPlaceId(placeName) {
  if (!GOOGLE_PLACES_KEY) return null;
  try {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName + ' India')}&inputtype=textquery&fields=place_id,name,rating,photos,formatted_address,geometry&key=${GOOGLE_PLACES_KEY}`;

    // Use a CORS proxy approach via our Vite proxy
    const proxyUrl = `/maps-api/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName + ' India')}&inputtype=textquery&fields=place_id,name,rating,photos,formatted_address,geometry&key=${GOOGLE_PLACES_KEY}`;

    const response = await axios.get(proxyUrl);
    const candidate = response.data?.candidates?.[0];
    return candidate || null;
  } catch (err) {
    console.error('Places find error:', err);
    return null;
  }
}

// ─────────────────────────────────────────────
// 3. GET PLACE DETAILS
// ─────────────────────────────────────────────
export async function getPlaceDetails(placeId) {
  if (!GOOGLE_PLACES_KEY || !placeId) return null;
  try {
    const proxyUrl = `/maps-api/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,photos,formatted_address,opening_hours,user_ratings_total,reviews,website&key=${GOOGLE_PLACES_KEY}`;

    const response = await axios.get(proxyUrl);
    return response.data?.result || null;
  } catch (err) {
    console.error('Place details error:', err);
    return null;
  }
}

// ─────────────────────────────────────────────
// 4. BUILD PHOTO URL FROM PHOTO REFERENCE
// ─────────────────────────────────────────────
export function getPlacePhotoUrl(photoReference, maxWidth = 600) {
  if (!photoReference || !GOOGLE_PLACES_KEY) return null;
  return `/maps-api/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_PLACES_KEY}`;
}

// ─────────────────────────────────────────────
// 5. FETCH PLACE WITH PHOTO (combined helper)
// ─────────────────────────────────────────────
export async function getPlaceWithPhoto(placeName) {
  try {
    const candidate = await findPlaceId(placeName);
    if (!candidate) return { name: placeName, photoUrl: null, rating: null, address: null };

    const photoRef = candidate?.photos?.[0]?.photo_reference;
    const photoUrl = photoRef ? getPlacePhotoUrl(photoRef) : null;

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
