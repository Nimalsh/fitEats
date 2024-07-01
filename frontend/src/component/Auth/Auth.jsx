import { Box, Modal } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm'; // Ensure correct import

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleOnClose = () => {
    navigate("/");
  };

  return (
    <Modal
      onClose={handleOnClose}
      open={location.pathname === "/account/register" || location.pathname === "/account/login"}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)',
        bgcolor: 'transparent',
        // backdropFilter: 'blur(4px)', // Adds a blur effect to the backdrop
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
      }}
    >
      <Box
        sx={{
          width: 600,
          bgcolor: 'transparent', // Transparent background
          p: 4,
          borderRadius: 4,
          backdropFilter: 'blur(8px)', // Additional blur effect for inner content
        }}
      >
        {location.pathname === "/account/register" ? <RegisterForm /> : <LoginForm />}
      </Box>
    </Modal>
  );
};
