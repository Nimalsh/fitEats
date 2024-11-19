import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import axios from "axios"; // Assuming you're using axios to fetch complaints from the backend

const ComplaintHistory = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch complaints from the backend API
    axios.get("/api/complaints") // Replace with your API endpoint
      .then((response) => {
        setComplaints(response.data); // Assuming the response is an array of complaints
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
      });
  }, []);

  return (
    <Paper style={{ padding: "20px", backgroundColor: "#1C1B1A", color: "#fff" }}>
      <Typography variant="h5" style={{ marginBottom: "20px", color: "#979533" }}>
        Complaint History
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "#979533" }}>Complaint ID</TableCell>
            <TableCell style={{ color: "#979533" }}>Date</TableCell>
            <TableCell style={{ color: "#979533" }}>Complaint Title</TableCell>
            <TableCell style={{ color: "#979533" }}>Complaint</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {complaints.map((complaint) => (
            <TableRow key={complaint.id}>
              <TableCell style={{ color: "#fff" }}>{complaint.id}</TableCell>
              <TableCell style={{ color: "#fff" }}>{complaint.date}</TableCell>
              <TableCell style={{ color: "#fff" }}>{complaint.title}</TableCell>
              <TableCell style={{ color: "#fff" }}>{complaint.complaint}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ComplaintHistory;
