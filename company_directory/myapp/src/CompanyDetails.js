import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchData } from './api';
import './App.css'; 

// Fix default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CompanyDetails = () => {
  const { id } = useParams(); // Retrieve the company ID from the URL parameters
  const [company, setCompany] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null); // State to store the selected location

  // Define custom icons
  const icon1 = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });

  const icon2 = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [18, 31],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });

  const icon3 = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [18, 31],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });

  // Fetch company details when component mounts or when ID changes
  useEffect(() => {
    if (id) {
      fetchData(`${process.env.REACT_APP_BACKEND_URL}/api/companies/${id}/`)
        .then(data => {
          setCompany(data);
          setLoadingCompany(false);
        })
        .catch(error => {
          setError(error.message);
          setLoadingCompany(false);
        });
    }
  }, [id]);

  // Fetch locations associated with the company when component mounts or when ID changes
  useEffect(() => {
    if (id) {
      fetchData(`${process.env.REACT_APP_BACKEND_URL}/api/companies/${id}/locations/`)
        .then(data => {
          setLocations(data);
          setLoadingLocations(false);
        })
        .catch(error => {
          setError(error.message);
          setLoadingLocations(false);
        });
    }
  }, [id]);

  // Display loading state while fetching data
  if (loadingCompany || loadingLocations) {
    return <div>Loading...</div>;
  }

  // Display error message if there was an issue fetching data
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display message if no company data is available
  if (!company) {
    return <div>No company data available</div>;
  }

  const MapWithMarkers = ({ company, locations, selectedLocation }) => {
    const map = useMap();

    useEffect(() => {
      if (selectedLocation) {
        map.setView([selectedLocation.latitude, selectedLocation.longitude], 13);
      }
    }, [selectedLocation, map]);

    return (
      <>
        <Marker position={[company.latitude, company.longitude]} icon={icon1}>
          <Popup>
            {company.name} <br /> {company.address}
          </Popup>
        </Marker>
        {locations.map((location, index) => {
          let icon;
          // Rotate through custom icons for each location
          if (index % 3 === 0) {
            icon = icon1;
          } else if (index % 3 === 1) {
            icon = icon2;
          } else {
            icon = icon3;
          }
          return (
            <Marker key={location.location_id} position={[location.latitude, location.longitude]} icon={icon}>
              <Popup>
                {location.name} <br /> {location.address}
              </Popup>
            </Marker>
          );
        })}
      </>
    );
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="company-details-container">
      <h1>{company.name}</h1>
      <p>{company.address}</p>
      <div className="map-container">
        <MapContainer center={[company.latitude, company.longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapWithMarkers company={company} locations={locations} selectedLocation={selectedLocation} />
        </MapContainer>
      </div>
      <h2>Locations</h2>
      <ul className="location-list">
        {locations.map(location => (
          <button key={location.location_id} className="location-item" onClick={() => handleLocationClick(location)}>
            <strong>Name:</strong> {location.name} <br />
            <strong>Address:</strong> {location.address} <br />
            <strong>Latitude:</strong> {location.latitude} <br />
            <strong>Longitude:</strong> {location.longitude}
          </button>
        ))}
      </ul>
      <a href="/" className="back-link">Back to List</a>
    </div>
  );
};

export default CompanyDetails;
