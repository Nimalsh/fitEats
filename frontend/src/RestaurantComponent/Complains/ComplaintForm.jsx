import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { addComplaint } from "../../component/State/complain/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    complaint: "",
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.complaint) {
      setSnackbar({ open: true, message: "Both fields are required!" });
      return;
    }

    setLoading(true);
    const payload = {
      ...formData,
      jwt: auth.jwt || localStorage.getItem("jwt"),
    };

    dispatch(addComplaint(payload))
      .then(() => {
        setSnackbar({ open: true, message: "Complaint submitted successfully!" });
        setLoading(false);
        navigate("/Complains/complain-history");
      })
      .catch((error) => {
        setSnackbar({ open: true, message: "Error submitting complaint." });
        console.error("Error submitting complaint:", error);
        setLoading(false);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
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
          style={{
            marginTop: "20px",
            backgroundColor: "#979533",
            color: "#fff",
            position: "relative",
          }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} style={{ color: "#fff" }} />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
      />
    </Paper>
  );
};

export default ComplaintForm;
