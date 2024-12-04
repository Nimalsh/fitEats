 
import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { addComplaint } from "../../component/State/complain/Action"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    complaint: "",
  });

  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      jwt: auth.jwt || localStorage.getItem("jwt"),
    };

    dispatch(addComplaint(payload))
      .then(() => {
        // Redirect to the complaint history page after successful submission
        navigate("/admin/restaurant/complains/complain-history");
      })
      .catch((error) => {
        console.error("Error submitting complaint:", error);
      });
  };

  return (
    <Paper style={{ padding: "20px", backgroundColor: "#000000", color: "#fff" }}>
      <Typography variant="h5" style={{ marginBottom: "20px", color: "#979533" }}>
        Complaint Form
      </Typography>
      <form onSubmit={handleSubmit}>
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
