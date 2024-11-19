import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { addComplaint } from "../State/complain/Action";
import { useDispatch, useSelector } from "react-redux";

// Complaint Form Component
const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    title: "",  // Only title and complaint
    complaint: "",
  });

  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth); // Access JWT token from Redux state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct payload with JWT token
    const payload = {
      ...formData,
      jwt: auth.jwt || localStorage.getItem("jwt"),
    };

    dispatch(addComplaint(payload)); // Dispatch action with the token
  };

  return (
      <Paper style={{ padding: "20px", backgroundColor: "#000000", color: "#fff" }}>
        <Typography variant="h5" style={{ marginBottom: "20px", color: "#979533" }}>
          Complaint Form
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Title input field */}
          <TextField
            name="title"
            label="Complaint Title"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
            style={{ backgroundColor: "#2C2C2C" }}
            InputLabelProps={{ style: { color: "#979533" } }}
            InputProps={{ style: { color: "#fff" } }}
          />
          
          {/* Complaint input field */}
          <TextField
            name="complaint"
            label="Complaint"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.complaint}
            onChange={handleChange}
            style={{ backgroundColor: "#2C2C2C" }}
            InputLabelProps={{ style: { color: "#979533" } }}
            InputProps={{ style: { color: "#fff" } }}
          />
          
          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "20px", backgroundColor: "#979533", color: "#fff" }}
          >
            Submit
          </Button>
        </form>
      </Paper>
  );
};

export default ComplaintForm;
