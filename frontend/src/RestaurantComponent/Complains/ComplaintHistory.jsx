import { useDispatch, useSelector } from "react-redux";
import { addComplaintfet, fetchUserComplaints } from "../../component/State/complain/Action"; 
import React, { useEffect } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

export const ComplaintHistory = () => {
  const dispatch = useDispatch();
  const { complaints, loading, error } = useSelector((state) => state.complaint);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const userId = auth.user?.id; // Assuming `auth.user` contains logged-in user details
    const jwt = localStorage.getItem("jwt"); // Retrieve JWT from localStorage

    if (userId && jwt) {
      dispatch(fetchUserComplaints({ userId, jwt }));
    }
  }, [dispatch, auth]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper style={{ padding: "20px", marginTop: "20px", backgroundColor: "#1C1B1A", color: "#fff" }}>
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
              <TableCell style={{ color: "#fff" }}>
                {new Date(complaint.date).toLocaleDateString()}
              </TableCell>
              <TableCell style={{ color: "#fff" }}>{complaint.title}</TableCell>
              <TableCell style={{ color: "#fff" }}>{complaint.complaint}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
 
