import { supabase } from './supabase';

/**
 * Saves an itinerary to Supabase and returns the unique ID.
 * @param {Object} itinerary - The itinerary data object.
 * @returns {Promise<string|null>} - The unique ID (UUID) or null on failure.
 */
export async function saveItinerary(itinerary) {
  try {
    const { data, error } = await supabase
      .from('itineraries')
      .insert([
        { 
          data: itinerary,
          title: itinerary.title || 'Untitled Trip'
        }
      ])
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error saving itinerary:', error.message);
    return null;
  }
}

/**
 * Fetches an itinerary from Supabase by ID.
 * @param {string} id - The UUID of the itinerary.
 * @returns {Promise<Object|null>} - The itinerary data or null if not found.
 */
export async function fetchItineraryById(id) {
  try {
    const { data, error } = await supabase
      .from('itineraries')
      .select('data')
      .eq('id', id)
      .single();

    if (error) return null;
    return data.data;
  } catch (error) {
    console.error('Error fetching itinerary:', error.message);
    return null;
  }
}
