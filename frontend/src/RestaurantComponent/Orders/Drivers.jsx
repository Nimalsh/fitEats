import React, { useState } from 'react'; 
import { Box, CardHeader, Typography } from '@mui/material';
import BackgroundImage from '../../assets/images/Background_image.png';
import DriverImage from '../../assets/images/user.jpg';
import MopedIcon from '@mui/icons-material/Moped';

const driversData = [
  { id: 1, name: "John Doe", vehicleType: "Bajaj CT100", status: "Pending" },
  { id: 2, name: "Jane Smith", vehicleType: "Baja Discover 125", status: "Pending" }, 
];

export const Drivers = () => {
  return (
    <>
    <Box 
    sx ={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height:'100%'
    }}>
<CardHeader
  title={
    <div>
      <Typography variant="h4" component="div" sx={{ fontSize: '2rem', display: 'flex', alignItems: 'center', color: 'white' }}>
        <MopedIcon className='mr-2' sx={{ fontSize: '4rem' }} /> Available Drivers
      </Typography>
      <Box sx={{ borderBottom: '2px solid white', width: '200px' , marginLeft:'70px', marginTop:'-10px'}} />
    </div>
  }
  sx={{
    pt: 2,
    paddingLeft: 0,
    alignItems: 'left',
  }}
/>

    <Box
      sx={{
        minHeight: '100vh', 
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',  // Center align content vertically 
        marginTop:'0'
      }}
    >
      {driversData.map((driver) => (
        <DriverTile key={driver.id} driver={driver} />
      ))}
    </Box>
    </Box>
    </>
  );
};

const DriverTile = ({ driver }) => {
  const [requestSent, setRequestSent] = useState(false);

  const handleSendRequest = () => {
    setRequestSent(true);
  };

  return (
    <Box
      sx={{ 
        width: '50%',
        backgroundColor: '#333',  // Dark grey background color
        marginBottom: 2,
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={DriverImage}
          alt={driver.name}
          style={{ width: 100, height: 100, borderRadius: '50%', marginRight: 50 }}
        />
        <div>
          <Typography variant="subtitle1" sx={{ color: 'white' }}>Driver Name : {driver.name}</Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>Driver's Vehical : {driver.vehicleType}</Typography>
        </div>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!requestSent && (
          <button className="details-button" onClick={handleSendRequest}>
            Send Request
          </button>
        )}
        {requestSent && (
          <>
            <button className="details-button">{driver.status}</button>
            <button className="details-button" style={{ marginLeft: 10, background:'#541116', color:'#FFFFFF' }}>
              Cancel
            </button>
          </>
        )}
      </Box>
    </Box>
  );
};
 

