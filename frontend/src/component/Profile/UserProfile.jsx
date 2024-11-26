import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, TextField } from '@mui/material';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'Nimalsha Gamage',  // Default value for name
    email: 'nimalshagamage@gmail.com',  // Default value for email
  });
  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    // Save updated profile logic (e.g., send a request to backend)
    setEditMode(false);
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
        <Button variant="outlined" onClick={() => alert('Logging out...')} sx={{ margin: '1rem 0rem' }}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
