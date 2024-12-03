import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import ComplaintForm from "./ComplaintForm";
import { useNavigate } from "react-router-dom";

export const ComplaintPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 1) {
      navigate("/admin/restaurant/complains/complain-history"); // Navigate to Complaint History route
    }
  };

  return (
    <Container maxWidth="md">
      <Paper
        style={{
          padding: "20px",
          marginTop: "20px",
          backgroundColor: "#1C1B1A",
          color: "#fff",
        }}
      >
        <Box mb={3}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              label="Complaint"
              style={{ fontWeight: "bold", textTransform: "none" }}
            />
            <Tab
              label="Complaint History"
              style={{ fontWeight: "bold", textTransform: "none" }}
            />
          </Tabs>
        </Box>

        {/* Render based on the active tab */}
        {activeTab === 0 && <ComplaintForm />}
      </Paper>
    </Container>
  );
};
 
