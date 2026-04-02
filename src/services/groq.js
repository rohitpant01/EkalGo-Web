import axios from 'axios';

/**
 * Generate an itinerary using the backend API (Proxy Only)
 */
export async function generateGroqItinerary(query, model = 'llama-3.3-70b-versatile') {
  try {
    const response = await axios.post('/api/itinerary', {
      type: 'groq',
      query,
      model
    });
    
    // The proxy already parses and handles the structure
    const data = response.data.choices?.[0]?.message?.content;
    if (!data) throw new Error('No response from API');
    return { success: true, data: JSON.parse(data) };
  } catch (err) {
    console.error('Groq Proxy failed:', err.message);
    return { success: false, error: 'AI_ORCHESTRATION_FAILED' };
  }
}

/**
 * Generate a 2-day teaser via the backend API (Proxy Only)
 */
export async function generatePreviewTeaser(destination) {
  try {
    const response = await axios.post('/api/itinerary', {
      type: 'teaser',
      destination
    });

    const dataText = response.data.choices?.[0]?.message?.content;
    if (!dataText) throw new Error('No content in AI response');
    
    let parsed = JSON.parse(dataText);
    // Handle AI wrapping in "data" or "itinerary" keys
    if (parsed.data) parsed = parsed.data;
    if (parsed.itinerary) parsed = parsed.itinerary;
    
    return { success: true, data: parsed };
  } catch (err) {
    console.warn('Teaser Proxy failed, using static fallback...', err.message);
    
    // Static Fallback (Ensures UI always has content)
    return { 
      success: true, 
      data: {
        day1Title: "Arrival & Local Exploration",
        day1Desc: `Welcome to ${destination}. Settle into the vibes and explore the historic heart with our curated guide.`,
        day2Title: "Hidden Gems Discovery",
        day2Desc: "Discover secret trails and local favorite spots off the beaten path.",
        savingsAmount: "2,400",
        hiddenGemsCount: "7"
      }
    };
  }
}
/**
 * Extract travel parameters from natural language query
 */
export async function extractSearchIntent(query) {
  try {
    const response = await axios.post('/api/itinerary', {
      type: 'intent',
      query
    });
    
    const data = response.data.choices?.[0]?.message?.content;
    if (!data) throw new Error('No response from intent API');
    return { success: true, data: JSON.parse(data) };
  } catch (err) {
    console.error('Intent extraction failed:', err.message);
    return { success: false, error: 'INTENT_EXTRACTION_FAILED' };
  }
}
