
import React, { useEffect, useRef } from 'react';

interface MapComponentProps {
  address: string;
}

const MapComponent = ({ address }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to load Google Maps API
    const loadGoogleMapsScript = () => {
      if (!document.querySelector('script[src*="maps.googleapis.com/maps/api"]')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBceSxfOqSJP_tCQJTnvJBQUkK3N6UCne4&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      } else {
        // If script already loaded, initialize map directly
        initializeMap();
      }
    };

    // Function to initialize the map
    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      const geocoder = new window.google.maps.Geocoder();
      
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          
          const map = new window.google.maps.Map(mapRef.current, {
            center: location,
            zoom: 16,
            mapTypeControl: true,
            scrollwheel: false,
            zoomControl: true,
            streetViewControl: true,
          });

          new window.google.maps.Marker({
            position: location,
            map,
            title: 'Al-Hikma Mosque',
            animation: window.google.maps.Animation.DROP,
          });
        } else {
          console.error('Geocode was not successful for the following reason:', status);
          // Fallback to a default location (Jakarta)
          const fallbackLocation = { lat: -6.1753924, lng: 106.8249641 };
          const map = new window.google.maps.Map(mapRef.current, {
            center: fallbackLocation,
            zoom: 15,
          });
          
          new window.google.maps.Marker({
            position: fallbackLocation,
            map,
            title: 'Al-Hikma Mosque',
          });
        }
      });
    };

    // Define the callback function that Google Maps API will call
    window.initMap = initializeMap;

    // Load the Google Maps script
    loadGoogleMapsScript();

    // Clean up
    return () => {
      window.initMap = undefined;
      const script = document.querySelector('script[src*="maps.googleapis.com/maps/api"]');
      if (script) {
        script.remove();
      }
    };
  }, [address]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
      <div 
        ref={mapRef} 
        style={{ height: '400px', width: '100%' }}
        className="rounded-lg" 
      />
    </div>
  );
};

// Add this to the global Window interface
declare global {
  interface Window {
    initMap: (() => void) | undefined;
    google: any;
  }
}

export default MapComponent;
