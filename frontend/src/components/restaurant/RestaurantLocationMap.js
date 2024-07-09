import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Box from '@mui/material/Box';


export default function Home(props) {

  // const { decode } = require('pluscodes')
  // decode('9FFW84J9+XG')

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map location={props.location}/>;
}

function Map(props) {
  
  const center = useMemo(() => ({ lat:6.92 , lng: 79.86 }), []);
  
  // decode('9FFW84J9+XG')
 // console.log(props.location)
  return (
    <Box sx={{
      marginTop: '0%',
      maxWidth: '100%',
      height: "40vh",
      overflowX: "hidden",
      overflowY: "hidden"
    }}>
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
    </Box>
  );
}