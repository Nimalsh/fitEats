import React, { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../State/Authentication/Action';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Navigate to the home page after logout
  };

  const handleEditProfile = () => {
    console.log('Edit Profile Clicked'); // Replace with actual edit logic
    navigate('my-profile/edit'); // Nav
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center text-red-500">
        <p>Failed to load user details: {error.message || error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="border rounded-lg shadow-md p-10 max-w-lg w-full  flex flex-col items-center mb-100 mr-10">
        <AccountCircleIcon sx={{ fontSize: '5rem', color: '#4a4a4a', marginBottom: '1rem' }} />
        <div className="w-full mb-6 text-left flex flex-col items-center">
          <h1 className="text-2xl font-bold">{user?.fullName || 'Not Available'}</h1>
          <p className="text-gray-500">{user?.email || 'Not Available'}</p>
        </div>
        <div className="flex justify-between gap-4 w-full mt-6">
          <Button
            variant="outlined"
            fullWidth
            onClick={handleEditProfile}
            sx={{ textTransform: 'none' }}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogout}
            sx={{ textTransform: 'none', backgroundColor: '#d32f2f' }}
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
