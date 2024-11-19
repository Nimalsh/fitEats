import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import ComplaintForm from "./ComplaintForm"; // Assuming you have a separate ComplaintForm component
import ComplaintHistory from "./ComplaintHistory"; // Assuming you have a separate ComplaintHistory component

const ComplaintPage = () => {
  const [activeTab, setActiveTab] = useState(0); // State to track active tab

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue); // Change the active tab based on the user's selection
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
        {/* Tabs to toggle between Complaint Form and Complaint History */}
        <Box mb={3}>
          <Tabs
            value={activeTab} // Bind active tab value to state
            onChange={handleTabChange} // Handle tab change
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

        {/* Conditionally render based on active tab */}
        {activeTab === 0 ? <ComplaintForm /> : <ComplaintHistory />}
      </Paper>
    </Container>
  );
};

export default ComplaintPage;
