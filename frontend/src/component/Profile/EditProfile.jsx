import React, { useState } from "react";
import { Button, TextField, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../State/Authentication/Action"; // Create this action
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData, navigate));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="border rounded-lg shadow-md p-10 max-w-md w-full flex flex-col items-center"
      >
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <TextField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Current Password"
          name="currentPassword"
          type="password"
          value={formData.currentPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="New Password"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#1976d2", textTransform: "none" }}
          fullWidth
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 2, textTransform: "none" }}
          fullWidth
          onClick={() => navigate("/my-profile/dashboard")}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
