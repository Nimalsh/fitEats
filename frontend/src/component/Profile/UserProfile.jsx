import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch user profile details
    axios
      .get('/api/user/profile', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleSave = () => {
    // Update user profile details
    axios
      .post('/api/user/profile/update', user, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((response) => {
        setUser(response.data);
        setEditMode(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col justify-center items-center">
        <AccountCircleIcon sx={{ fontSize: '9rem' }} />
        {editMode ? (
          <>
            <TextField
              label="Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              sx={{ marginBottom: '1rem' }}
            />
            <TextField
              label="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              sx={{ marginBottom: '1rem' }}
            />
          </>
        ) : (
          <>
            <h1 className="py-5 text-2xl font-semibold">{user.name}</h1>
            <p>Email: {user.email}</p>
          </>
        )}
        <Button
          variant="contained"
          onClick={editMode ? handleSave : () => setEditMode(true)}
          sx={{ margin: '2rem 0rem' }}
        >
          {editMode ? 'Save' : 'Edit Profile'}
        </Button>
        <Button variant="outlined" onClick={handleLogout} sx={{ margin: '1rem 0rem' }}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
