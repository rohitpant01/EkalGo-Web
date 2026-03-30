import axios from 'axios';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Generate an itinerary using Groq Cloud API
 * @param {string} query - The user's travel request
 * @param {string} model - The model to use (default: llama-3.3-70b-versatile)
 */
export async function generateGroqItinerary(query, model = 'llama-3.3-70b-versatile') {
  if (!GROQ_API_KEY) {
    return { success: false, error: 'GROQ_KEY_MISSING' };
  }

  const prompt = `
You are an expert travel planner specializing in India.
Create a detailed travel itinerary for: "${query}"

Return ONLY a valid JSON object (no markdown, no backticks, no explanation) in this exact format:
{
  "title": "Trip title",
  "summary": "2-sentence summary of the trip",
  "duration": "X days",
  "bestSeason": "Month range",
  "difficulty": "Easy/Moderate/Challenging",
  "estimatedCost": "₹XX,000 - ₹XX,000 per person",
  "highlights": ["highlight1", "highlight2", "highlight3"],
  "days": [
    {
      "day": 1,
      "theme": "Day theme",
      "places": [
        {
          "name": "Exact place name in India",
          "type": "temple/trek/viewpoint/market/restaurant",
          "duration": "X hours",
          "description": "2-3 sentence description of this place and what to do there",
          "tips": "One practical travel tip"
        }
      ]
    }
  ]
}

Rules:
- Include 3-5 days
- Include 2-4 places per day
- Use real, specific place names in India
- Be practical and accurate
- Return ONLY the JSON, nothing else
`;

  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model,
        messages: [
          {
            role: 'system',
            content: 'You are a JSON-only travel API. Output only valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4096,
        response_format: { type: 'json_object' },
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data.choices?.[0]?.message?.content;
    if (!data) throw new Error('No response from Groq');

    const parsed = JSON.parse(data);
    return { success: true, data: parsed };
  } catch (err) {
    console.error('Groq error:', err);
    return {
      success: false,
      error: err.response?.data?.error?.message || err.message || 'Failed to generate itinerary with Groq',
    };
  }
}
