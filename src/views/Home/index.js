/* eslint-disable no-unused-vars */
import React from 'react';

import { CircularProgress } from '@mui/material';

import { useLoadScript } from '@react-google-maps/api';
import Map from '../../components/Map';

export default function Home() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries: ["places"]
  });

  if (!isLoaded) return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <CircularProgress />
      <p>        
        Carregando, aguarde...      
      </p>
    </div>
  );

  return <Map />
}