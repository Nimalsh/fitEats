import React, { useState } from 'react';
import { Container, Paper, Tabs, Tab, Typography, Box, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { addComplaint } from '../State/complain/Action';
import { useDispatch } from 'react-redux';

// Complaint Form Component
const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    complaint: ''
  });

  const dispatch = useDispatch(); // Initialize the Redux dispatch function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComplaint(formData)); // Dispatch the addComplaint action with form data
  };

  return (
    <Container maxWidth="xl">
      <Paper style={{ padding: '20px', backgroundColor: '#000000', color: '#fff' }}>
        <Typography variant="h5" style={{ marginBottom: '20px', color: '#979533' }}>
          Complaint Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            style={{ backgroundColor: '#2C2C2C' }}
            InputLabelProps={{ style: { color: '#979533' } }}
            InputProps={{ style: { color: '#fff' } }}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            style={{ backgroundColor: '#2C2C2C' }}
            InputLabelProps={{ style: { color: '#979533' } }}
            InputProps={{ style: { color: '#fff' } }}
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
            style={{ backgroundColor: '#2C2C2C' }}
            InputLabelProps={{ style: { color: '#979533' } }}
            InputProps={{ style: { color: '#fff' } }}
          />
          <Button type="submit" variant="contained" style={{ marginTop: '20px', backgroundColor: '#979533', color: '#fff' }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};


// Complaint History Component with Table
const ComplaintHistory = () => {
  // Sample data for complaint history; replace this with real data as needed
  const complaints = [
    { id: 1, date: '2023-07-28', title: 'Service Delay', complaint: 'The delivery was delayed by an hour.' },
    { id: 2, date: '2023-07-27', title: 'Wrong Item', complaint: 'Received a different item than what was ordered.' },
    { id: 3, date: '2023-07-26', title: 'Cold Food', complaint: 'The food was cold when it arrived.' },
  ];

  return (
    <Container maxWidth="md">
      <Paper style={{ padding: '20px', backgroundColor: '#1C1B1A', color: '#fff' }}>
        <Typography variant="h5" style={{ marginBottom: '20px', color: '#979533' }}>
          Complaint History
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: '#979533' }}>Complaint ID</TableCell>
              <TableCell style={{ color: '#979533' }}>Date</TableCell>
              <TableCell style={{ color: '#979533' }}>Title</TableCell>
              <TableCell style={{ color: '#979533' }}>Complaint</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell style={{ color: '#fff' }}>{complaint.id}</TableCell>
                <TableCell style={{ color: '#fff' }}>{complaint.date}</TableCell>
                <TableCell style={{ color: '#fff' }}>{complaint.title}</TableCell>
                <TableCell style={{ color: '#fff' }}>{complaint.complaint}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};


// Main Component with Tab Navigation
const ComplaintPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="md">
      <Paper style={{ padding: '20px', marginTop: '20px', backgroundColor: '#1C1B1A', color: '#fff' }}>
        
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Complaint Form" style={{ color: activeTab === 0 ? '#979533' : '#fff' }} />
          <Tab label="Complaint History" style={{ color: activeTab === 1 ? '#979533' : '#fff' }} />
        </Tabs>
        <Box mt={3}>
          {activeTab === 0 && <ComplaintForm />}
          {activeTab === 1 && <ComplaintHistory />}
        </Box>
      </Paper>
    </Container>
  );
};

export default ComplaintPage;
