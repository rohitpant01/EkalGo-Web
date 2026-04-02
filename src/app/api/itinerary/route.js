import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const body = await req.json();
    const { type, query, destination, model } = body;

    if (type === 'groq') {
      const prompt = `
        You are an expert travel strategist for EkalGo. Create a premium 3-5 day itinerary for: "${query}".
        
        CRITICAL ENGINE PARAMETERS:
        1. WEIGHTED FOR HIDDEN GEMS: Prioritize nodes with low crowd density but high cultural/aesthetic vibe.
        2. SPATIAL DATA: You MUST provide latitude and longitude for the destination and EVERY stop.
        
        Return ONLY a valid JSON object in this fixed format:
        {
          "title": "Inspiring Trip Title",
          "summary": "Short emotional summary",
          "duration": "4 Days",
          "bestSeason": "Nov to Feb",
          "difficulty": "Easy",
          "estimatedCost": "₹15,000",
          "coordinates": { "lat": 26.2389, "lng": 73.0243 },
          "highlights": ["Point 1", "Point 2"],
          "safetyInsight": "Safe for solo travelers",
          "days": [
            {
              "day": 1,
              "theme": "Arrival & Vibes",
              "places": [
                { 
                  "name": "Place Name", 
                  "type": "nature", 
                  "lat": 26.24,
                  "lng": 73.02,
                  "duration": "2h", 
                  "description": "Short desc", 
                  "proTip": "Expert tip", 
                  "tips": "Practical tips" 
                }
              ]
            }
          ]
        }
      `;
      const response = await axios.post(GROQ_URL, {
        model: model || 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'You are a JSON-only travel API. Output only valid JSON.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }, {
        headers: { 'Authorization': `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' }
      });
      return NextResponse.json(response.data);

    } else if (type === 'gemini' || type === 'suggestion') {
      const prompt = `
        You are an elite travel concierge for EkalGo. Provide 3 high-vibe suggestions/insights for: "${query || destination}".
        Focus on: local food hacks, secret viewing spots, or cultural trivia.
        
        Return ONLY valid JSON:
        {
          "location": "Name",
          "insights": [
            { "title": "Topic", "text": "Detailed tip", "type": "food|view|secret" }
          ],
          "vibeCheck": "One sentence energetic summary"
        }
      `;
      const response = await axios.post(GROQ_URL, {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'You are a travel insight API. Output ONLY valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      }, {
        headers: { 'Authorization': `Bearer ${GROQ_API_KEY}` }
      });
      
      const content = response.data.choices?.[0]?.message?.content;
      return NextResponse.json(JSON.parse(content));

    } else if (type === 'teaser') {
      const prompt = `
        Create a 2-day travel teaser for ${destination}.
        Return ONLY a valid JSON object:
        {
          "day1Title": "Short catchy title",
          "day1Desc": "1-2 sentence description",
          "day2Title": "Short catchy title",
          "day2Desc": "1-2 sentence description",
          "savingsAmount": "2,840",
          "hiddenGemsCount": "9"
        }
      `;
      const response = await axios.post(GROQ_URL, {
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'Output valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        response_format: { type: 'json_object' }
      }, {
        headers: { 'Authorization': `Bearer ${GROQ_API_KEY}` }
      });
      return NextResponse.json(response.data);
    } else if (type === 'intent') {
      const prompt = `
        Extract travel intent from this query: "${query}"
        Return ONLY a valid JSON object in this format:
        {
          "location": "City or Region name (null if not found)",
          "mood": "one of: adventure, romantic, solo, budget, luxury (null if not found)",
          "budget": "estimated budget (null if not found)",
          "duration": "duration of trip (null if not found)",
          "confidence": 0-1
        }
      `;
      const response = await axios.post(GROQ_URL, {
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are a travel intent extractor. Output ONLY valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' }
      }, {
        headers: { 'Authorization': `Bearer ${GROQ_API_KEY}` }
      });
      return NextResponse.json(response.data);
    }
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    return NextResponse.json({
      error: error.response?.data?.error?.message || error.message || 'Internal Server Error'
    }, { status: error.response?.status || 500 });
  }
}
