'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { useTabStore } from '@/context/tabStore';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || process.env.GOOGLE_PLACES_API_KEY;

// Premium Obsidian Theme for Google Maps
const MAP_STYLES = [
  { "elementType": "geometry", "stylers": [{ "color": "#0B0F1A" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#141829" }] },
  { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
  { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
  { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#12182b" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#1e293b" }] },
  { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#020617" }] }
];

export default function GoogleMapEngine() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { tabs, activeTabId } = useTabStore();
  const markersRef = useRef([]);

  const initMap = async () => {
    if (!window.google || !mapRef.current) return;
    
    try {
      // Use the modern dynamic library loader if available
      const { Map } = await window.google.maps.importLibrary("maps");
      
      const initialMap = new Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 }, // Center of India
        zoom: 5,
        mapId: '6ef3a8248dbf4048', // Using a default mapId for Advanced Markers
        styles: MAP_STYLES,
        disableDefaultUI: true,
        zoomControl: true,
        backgroundColor: '#0B0F1A'
      });
      setMap(initialMap);
    } catch (e) {
      console.error("Native Map initialization failed, falling back to legacy", e);
      // Legacy Fallback
      const initialMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 5,
        styles: MAP_STYLES,
        disableDefaultUI: true,
        zoomControl: true,
        backgroundColor: '#0B0F1A'
      });
      setMap(initialMap);
    }
  };

  useEffect(() => {
    if (scriptLoaded) {
      initMap();
    }
  }, [scriptLoaded]);

  // Update Map Position & Markers based on active tab
  useEffect(() => {
     if (!map || !window.google) return;
     const google = window.google;

     // Clear old markers
     markersRef.current.forEach(m => m.setMap(null));
     markersRef.current = [];

     const activeTab = tabs.find(t => t.id === activeTabId);
     
     if (activeTab?.type === 'trip' && activeTab.data?.coordinates) {
        const coords = { 
           lat: parseFloat(activeTab.data.coordinates.lat), 
           lng: parseFloat(activeTab.data.coordinates.lng) 
        };

        map.setCenter(coords);
        map.setZoom(11);

        // Add Markers for itinerary stops
        if (activeTab.data.days) {
           activeTab.data.days.forEach((day, dIdx) => {
              day.places?.forEach((place, pIdx) => {
                 if (place.lat && place.lng) {
                    const marker = new google.maps.Marker({
                       position: { lat: parseFloat(place.lat), lng: parseFloat(place.lng) },
                       map: map,
                       title: place.name,
                       icon: {
                          path: google.maps.SymbolPath.CIRCLE,
                          fillColor: '#F5B942',
                          fillOpacity: 1,
                          strokeColor: '#0B0F1A',
                          strokeWeight: 2,
                          scale: 7
                       }
                    });
                    
                    const infoWindow = new google.maps.InfoWindow({
                       content: `<div style="padding: 10px; color: #0B0F1A;">
                          <h4 style="margin: 0; font-weight: bold; font-size: 14px;">${place.name}</h4>
                          <p style="margin: 5px 0 0; font-size: 11px; opacity: 0.7;">Day ${dIdx+1} Stop</p>
                       </div>`
                    });

                    marker.addListener("click", () => {
                       infoWindow.open(map, marker);
                    });

                    markersRef.current.push(marker);
                 }
              });
           });
        }
     }
  }, [map, activeTabId, tabs]);

  return (
    <div className="w-full h-full relative">
       {GOOGLE_API_KEY && (
          <Script 
            src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places,marker&v=weekly`}
            onLoad={() => setScriptLoaded(true)}
          />
       )}
       
       <div ref={mapRef} className="w-full h-full" />
       
       {!GOOGLE_API_KEY && (
          <div className="absolute inset-0 bg-brand-900/60 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center gap-4 z-50">
             <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 animate-pulse">
                <span className="font-bold text-2xl">!</span>
             </div>
             <div className="space-y-1">
                <p className="text-sm font-bold text-white uppercase tracking-widest">Google Map Key Required</p>
                <p className="text-[10px] text-white/40 italic">Add NEXT_PUBLIC_GOOGLE_PLACES_API_KEY to your .env to enable the live Google Map surface.</p>
             </div>
          </div>
       )}
    </div>
  );
}
