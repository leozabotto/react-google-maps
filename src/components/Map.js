/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';

import {
  GoogleMap,
  Marker,
  Circle,
  } from '@react-google-maps/api';

import {
  Box,
} from '@mui/material';

import Slider from '@mui/material/Slider';

import Places from './Places';

import jallsLogo from '../assets/img/jalls-temp-logo.png';

export default function Map() {
  const [mainAddress, setMainAddress] = useState();
  const [radius, setRadius] = useState(5);
  
  const mapRef = useRef(GoogleMap);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  const options = useMemo(() => ({
    //mapId: "81aa3204857fc9d5",
    disableDefaultUI: false,
    clickableIcons: false,
  }), []);   

  const onLoad = useCallback(map => (mapRef.current = map), []);
 
  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Permissão de localização ativada!");
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
      })
    } else {
      console.log("Permissão de localização bloqueada. Por gentileza, habilite-a nas configurações.");
    }
  }, [])

  return (
    <div className="container">     
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          <>                                      
          {mainAddress && (
            <>
              <Marker
                position={mainAddress}
              />

              <Circle                  
                center={mainAddress}
                radius={radius * 1000}
                options={{
                  strokeOpacity: 0.5,
                  strokeWeight: 2,
                  clickable: false,
                  draggable: false,
                  editable: false,
                  visible: true,
                  zIndex: 1,
                  fillOpacity: 0.5,
                  strokeColor: "#8BC34A",
                  fillColor: "#8BC34A"
                }}
              />
            </>
            )}
          </>  
        </GoogleMap>
      </div>
      <div className="menu">
        <img src={jallsLogo} className="logo" alt="Logo Jall's" />
        <p style={{
          fontSize: '22px',
          fontFamily: 'Roboto',
          fontWeight: '100',
        }}>
          Jall&apos;s Beauty
        </p>

        <p>Digite o seu endereço aqui:</p>
        <Places setPlace={(position) => {
          setMainAddress(position);          
          mapRef.current?.panTo(position);
        }}
        />        
                
        <Box sx={{ width: 300, mt: 2 }}>
          <p>Raio de Atendimento (KM):</p>
          <Slider
            aria-label="Raio"
            defaultValue={1}
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            step={1}
            marks
            min={1}
            max={50}
            valueLabelDisplay="auto"
          />
        </Box>

        <p>Latitude:</p>
        <p><strong>{mainAddress ? mainAddress.lat : '-'}</strong></p>

        <p>Longitude:</p>
        <p><strong>{mainAddress ? mainAddress.lng : '-'}</strong></p>


      </div>
    </div>
  );
}