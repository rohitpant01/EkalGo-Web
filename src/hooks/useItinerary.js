import { useState, useCallback } from 'react';
import { generateItinerary, getPlaceWithPhoto } from '../services/api';

export function useItinerary() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [enriching, setEnriching] = useState(false);

  const search = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setQuery(searchQuery);
    setLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const result = await generateItinerary(searchQuery);

      if (!result.success) {
        setError(result.error || 'Failed to generate itinerary. Please try again.');
        return;
      }

      setItinerary(result.data);
      setLoading(false);

      // Now asynchronously enrich places with real Google Photos
      setEnriching(true);
      try {
        const enriched = { ...result.data };
        enriched.days = await Promise.all(
          result.data.days.map(async (day) => ({
            ...day,
            places: await Promise.all(
              day.places.map(async (place) => {
                const details = await getPlaceWithPhoto(place.name);
                return { ...place, ...details };
              })
            ),
          }))
        );
        setItinerary(enriched);
      } catch (enrichErr) {
        // Enrichment failed, keep basic itinerary
        console.warn('Photo enrichment failed:', enrichErr);
      } finally {
        setEnriching(false);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setItinerary(null);
    setError(null);
    setQuery('');
  }, []);

  return { itinerary, loading, error, query, enriching, search, reset };
}
