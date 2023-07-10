import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import FooterFront from '../shared/FooterFront';
import HeaderSignedInClient from '../shared/HeaderSignedInClient';


// Import the custom icon image
import customIcon from './gym.jpg';
import userIcon from './a.jpg';

// Define the custom icons
const gymIcon = L.icon({
  iconUrl: customIcon,
  iconSize: [32, 32],
});

const userLocationIcon = L.icon({
  iconUrl: userIcon,
  iconSize: [32, 32],
});

function Map() {
  const [gyms, setGyms] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetchGyms();
  }, []);

  async function fetchGyms() {
    const response = await fetch('http://localhost:5000/api/gyms/getAll');
    const data = await response.json();
    setGyms(data);
  }

  async function getLocationCoordinates(location) {
    const geocodingUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      location
    )}&format=json`;

    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
      } else {
        console.log('Location not found');
        return null;
      }
    } catch (error) {
      console.log('Error retrieving location:', error);
      return null;
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.log('Error retrieving location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    async function markGymsOnMap() {
      const markedGyms = await Promise.all(
        gyms.map(async (gym) => {
          const location = gym.localisation; // Replace 'localisation' with the actual property name of the gym location
          const coordinates = await getLocationCoordinates(location);
          return { ...gym, coordinates };
        })
      );
      setGyms(markedGyms);
    }

    markGymsOnMap();
  }, [gyms]);

  return ( <div>
    
      <HeaderSignedInClient />
      <div className="slider-area2" >
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-60">
                  <div className="search-container">
                    <h2>MAP</h2>
                    
        
        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                      <MapContainer
                        center={[34.0, 9.0]}
                        zoom={7}
                        style={{ height: '100%', width: '100%' }}
                      >
       
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        attribution="Map data © <a href=&quot;https://openstreetmap.org&quot;>OpenStreetMap</a> contributors"
      />
      {userLocation && (
        <Marker
          position={[userLocation.latitude, userLocation.longitude]}
          icon={userLocationIcon}
        >
          <Popup>Your Location</Popup>
        </Marker>
      )}
      {gyms.map((gym) => {
        if (gym.coordinates) {
          return (
            <Marker
              key={gym.id}
              position={[gym.coordinates.latitude, gym.coordinates.longitude]}
              icon={gymIcon}
            >
              <Popup>
                <div>
                  
<h3>{gym.localisation}</h3>
                  <p>GYM'S NAME : {gym.name}</p>
                </div>
              </Popup>
            </Marker>
          );
        } else {
          return null;
        }
      })}
        </MapContainer>
        </section>
         

          <FooterFront />
        </div>
     

   
  );
}
export default Map;

/*
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';


// Import the custom icon image
import customIcon from './gym.jpg';
import userIcon from './a.jpg';

// Define the custom icons
const gymIcon = L.icon({
  iconUrl: customIcon,
  iconSize: [32, 32],
});

const userLocationIcon = L.icon({
  iconUrl: userIcon,
  iconSize: [32, 32],
});

function Map() {
  const [gyms, setGyms] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetchGyms();
  }, []);

  async function fetchGyms() {
    const response = await fetch('http://localhost:5000/api/gyms/getAll');
    const data = await response.json();
    setGyms(data);
  }

  async function getLocationCoordinates(location) {
    const geocodingUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      location
    )}&format=json`;

    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
      } else {
        console.log('Location not found');
        return null;
      }
    } catch (error) {
      console.log('Error retrieving location:', error);
      return null;
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.log('Error retrieving location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    async function markGymsOnMap() {
      const markedGyms = await Promise.all(
        gyms.map(async (gym) => {
          const location = gym.localisation; // Replace 'localisation' with the actual property name of the gym location
          const coordinates = await getLocationCoordinates(location);
          return { ...gym, coordinates };
        })
      );
      setGyms(markedGyms);
    }

    markGymsOnMap();
  }, [gyms]);

  useEffect(() => {
    if (userLocation && gyms.length > 0) {
      const map = L.map('map');

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors',
      }).addTo(map);

      const waypoints = [
        L.latLng(userLocation.latitude, userLocation.longitude),
        ...gyms
          .filter(gym => gym.coordinates)
          .map(gym => L.latLng(gym.coordinates.latitude, gym.coordinates.longitude))
      ];

      L.Routing.control({
        waypoints,
        routeWhileDragging: true,
      }).addTo(map);
    }
  }, [userLocation, gyms]);

  return (
    <div>
      <div id="map" style={{
height: '400px', width: '100%' }}></div>
<MapContainer
center={[34.0, 9.0]}
zoom={7}
style={{ height: '400px', width: '100%' }}
>
<TileLayer
       url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
       attribution="Map data © <a href=&quot;https://openstreetmap.org&quot;>OpenStreetMap</a> contributors"
     />
{userLocation && (
<Marker
position={[userLocation.latitude, userLocation.longitude]}
icon={userLocationIcon}
>
<Popup>Your Location</Popup>
</Marker>
)}
{gyms.map((gym) => {
  if (gym.coordinates) {
    return (
      <Marker
        key={gym.id} // Utilisez une prop "key" unique ici
        position={[gym.coordinates.latitude, gym.coordinates.longitude]}
        icon={gymIcon}
      >
        <Popup>
          <div>
            <h3>{gym.localisation}</h3>
            <p>GYM'S NAME : {gym.name}</p>
          </div>
        </Popup>
      </Marker>
    );
  } else {
    return null;
  }
})}


</MapContainer>
</div>
</div>
);
}

export default Map;*/