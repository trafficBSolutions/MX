import React, { useState, useRef, useEffect } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../constant/constant';

const MapInvoiceComponent = (props) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const mapContainerRef = useRef(null);
  const [geocoder, setGeocoder] = useState(null);

  // Business address to display on the map
  const businessAddress = "723 N. Wall St, Calhoun, GA 30701";

  // Function to load the Google Maps script
  const loadGoogleMapsScript = () => {
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry,places`;
      script.async = true;
      script.onload = () => {
        setGeocoder(new window.google.maps.Geocoder()); // Initialize Geocoder only once the script is loaded
        initMap();
      };
      document.body.appendChild(script);
    } else {
      setGeocoder(new window.google.maps.Geocoder());
      initMap();
    }
  };

  // Initialize the Google Map
  const initMap = () => {
    if (mapContainerRef.current) {
      const googleMap = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: 34.5028, lng: -84.9508 }, // Coordinates for Calhoun, GA
        zoom: 15,
        styles: [
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#A6F4FF' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#83CCCE' }],
          },
        ],
      });
      setMap(googleMap);
    }
  };

  // Search for the business location after the map and geocoder are ready
  useEffect(() => {
    if (map && geocoder) {
      searchForBusiness(businessAddress);
    }
  }, [map, geocoder]);

  // Handle searching for the business location
  const searchForBusiness = (address) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        map.setCenter(location);
        map.setZoom(15); // Adjust zoom level as needed

        const newMarker = new window.google.maps.Marker({
          position: location,
          map: map,
          title: "Material WorX\n" + results[0].formatted_address,
          label: {
            text: "Material WorX",
            color: "black",
            fontSize: "16px",
            fontWeight: "bold"
          }
        });

        setMarker(newMarker);
      } else {
        console.error(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  };

  // Load the Google Maps script once when the component mounts
  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  return (
    <div>
      <div className="map-home-container" ref={mapContainerRef} style={{ width: '100%', height: '489px', overflow: 'visible' }}></div>
    </div>
  );
};

export default MapInvoiceComponent;
