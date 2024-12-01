import React, { useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllNutritionistRequests } from "../State/Nutritionist/Action";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom"; // For navigation
import { createRequest } from "../State/Requests/Action";

const NutritionistSelection = () => {
  const token = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve the previously stored requestData from localStorage
  const storedRequestData = JSON.parse(localStorage.getItem("requestData")) || {};
  console.log("Stored Request Data:", storedRequestData);

  useEffect(() => {
    dispatch(getAllNutritionistRequests(token));
  }, [dispatch]);

  const { allNutritionists, loading, error } = useSelector(
    (state) => state.nutritionist
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleArrowClick = (nutritionistId) => {
    console.log("Selected Nutritionist ID:", nutritionistId);
  
    if (!storedRequestData) {
      console.error("No request data found in localStorage.");
      alert("Something went wrong. Please start again.");
      return;
    }
  
    const updatedRequestData = {
      ...storedRequestData,
      nutritionistId,
    };
  
    // Save the updated requestData back to localStorage
    localStorage.setItem("requestData", JSON.stringify(updatedRequestData));
    console.log("Updated Request Data:", updatedRequestData);
  
    dispatch(createRequest(updatedRequestData, token))
      .then(() => {
        // Clear requestData from local storage
        localStorage.removeItem("requestData");
  
        // Navigate to the desired route
        navigate('/my-profile/personalized-plan'); // Adjust the path as needed
      })
      .catch((error) => {
        console.error("Error creating request", error);
        alert("Failed to create the request. Please try again.");
      });
  };
  
  // Redux action remains the same as you provided.
  
  return (
    <Box sx={{ marginTop: "32px" }}>
      <Typography variant="h5" gutterBottom align="center">
        Nutritionist Profiles
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {allNutritionists.map((nutritionist, index) => (
          <Grid item xs={12} key={index}>
            <Paper
              sx={{
                padding: "16px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Avatar
                sx={{ marginRight: "16px", width: 56, height: 56 }}
                src={nutritionist.image}
                alt={nutritionist.fullName}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{nutritionist.fullName}</Typography>
                <Typography variant="body2">{nutritionist.specializations}</Typography>
                <Typography variant="body2">{nutritionist.qualifications}</Typography>
                <Typography variant="body2">{nutritionist.experience}</Typography>
              </Box>

              {/* Right aligned Arrow Button */}
              <IconButton
                sx={{
                  position: "absolute",
                  right: "100px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={() => handleArrowClick(nutritionist.id)} // Pass the nutritionist ID
              >
                <ArrowForwardIcon />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NutritionistSelection;
