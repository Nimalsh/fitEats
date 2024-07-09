import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Box from '@mui/material/Box';


export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat:6.92 , lng: 79.86 }), []);

  return (
    <Box sx={{
      marginTop: '5%',
      maxWidth: '100%',
      height: "450px",
      overflowX: "hidden",
      overflowY: "hidden"
    }}>
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
    </Box>
  );
}