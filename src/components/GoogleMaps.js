import { useState, useRef, useEffect } from 'react';
import { REACT_APP_GOOGLE_MAPS_API_KEY } from '../constant/constant';

const MapInvoiceComponent = () => {
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null);
  const [geocoder, setGeocoder] = useState(null);

  const businessAddress = "723 N. Wall St, Calhoun, GA 30701";

  // Initialize the Google Map
  const initMap = () => {
    if (mapContainerRef.current) {
      const googleMap = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: 34.5028, lng: -84.9508 },
        zoom: 15,
        styles: [
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#f6ebce' }],
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

  // Load the Google Maps script and initialize the map
  useEffect(() => {
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=geometry,places`;
      script.async = true;
      script.onload = () => {
        setGeocoder(new window.google.maps.Geocoder());
        initMap();
      };
      document.body.appendChild(script);
    } else {
      setGeocoder(new window.google.maps.Geocoder());
      initMap();
    }
  }, []);

  // Geocode and place marker once both map and geocoder are ready
  useEffect(() => {
    if (map && geocoder) {
      geocoder.geocode({ address: businessAddress }, (results, status) => {
        if (status === "OK") {
          const location = results[0].geometry.location;
          map.setCenter(location);
          map.setZoom(15);

          new window.google.maps.Marker({
            position: location,
            map,
            title: "Material WorX\n" + results[0].formatted_address,
            label: {
              text: "Material WorX",
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
            },
          });
        } else {
          console.error(`Geocode failed: ${status}`);
        }
      });
    }
  }, [map, geocoder]);

  return (
    <div>
      <div
        className="map-home-container"
        ref={mapContainerRef}
        style={{ width: '100%', height: '439px', overflow: 'visible' }}
      ></div>
    </div>
  );
};

export default MapInvoiceComponent;
